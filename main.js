import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const SIZE = 4;
const TILE_PROB_FOUR = 0.1;
const CELL_SIZE = 1.40;
const BOARD_PADDING = 0.02;
const ANIM_DURATION = 200;
const SPAWN_SCALE_DURATION = 180;
const BEST_KEY = "bestScore3D2048";

const container = document.getElementById("canvas-container");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const restartBtn = document.getElementById("restart");
const toastEl = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalActions = document.getElementById("modal-actions");
const modalCancel = document.getElementById("modal-cancel");
const modalConfirm = document.getElementById("modal-confirm");
let modalConfirmAction = null;

let scene, camera, renderer, controls, frameId;
let tileMeshes = new Map();
let activeAnimations = [];
let isMoving = false;

const state = {
  size: SIZE,
  grid: createGrid(SIZE),
  score: 0,
  best: loadBest(),
  won: false,
  gameOver: false,
};

initThree();
resetGame();
bindEvents();
animate();

function initThree() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7f3e9);

  const aspect = container.clientWidth / Math.max(container.clientHeight, 1);
  camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
  const start = SIZE * CELL_SIZE * 0.9;
  camera.position.set(start, start, start);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = SIZE * 1.4;
  controls.maxDistance = SIZE * 3.3;
  controls.target.set(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xf2d9b1, 0.65);
  dir.position.set(3, 6, 4);
  scene.add(dir);

  addBoardFrame();
  addSubtleGrid();

  window.addEventListener("resize", onResize);
}

function addBoardFrame() {
  const size = SIZE * CELL_SIZE + BOARD_PADDING * 2;
  const geo = new THREE.BoxGeometry(size, size, size);
  const edges = new THREE.EdgesGeometry(geo);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: 0xc9a66b,
      transparent: true,
      opacity: 0.55,
      linewidth: 1.5,
    })
  );
  scene.add(line);
}

function addSubtleGrid() {
  const group = new THREE.Group();
  const mat = new THREE.LineBasicMaterial({
    color: 0xcbb79a,
    transparent: true,
    opacity: 0.35,
    linewidth: 1,
  });
  const half = (SIZE - 1) * CELL_SIZE * 0.5;
  for (let i = 0; i <= SIZE; i++) {
    const offset = i * CELL_SIZE - half - CELL_SIZE * 0.5;
    const planes = [
      [
        new THREE.Vector3(offset, -half, -half),
        new THREE.Vector3(offset, -half, half),
        new THREE.Vector3(offset, half, half),
        new THREE.Vector3(offset, half, -half),
      ],
      [
        new THREE.Vector3(-half, offset, -half),
        new THREE.Vector3(-half, offset, half),
        new THREE.Vector3(half, offset, half),
        new THREE.Vector3(half, offset, -half),
      ],
      [
        new THREE.Vector3(-half, -half, offset),
        new THREE.Vector3(-half, half, offset),
        new THREE.Vector3(half, half, offset),
        new THREE.Vector3(half, -half, offset),
      ],
    ];
    planes.forEach((points) => {
      const geo = new THREE.BufferGeometry().setFromPoints([...points, points[0]]);
      const line = new THREE.Line(geo, mat);
      group.add(line);
    });
  }
  scene.add(group);
}

function createGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Array.from({ length: size }, () => null))
  );
}

function resetGame() {
  state.grid = createGrid(state.size);
  state.score = 0;
  state.won = false;
  state.gameOver = false;
  tileMeshes.forEach((mesh) => scene.remove(mesh));
  tileMeshes.clear();
  addRandomTile(state);
  addRandomTile(state);
  updateUI();
  renderTilesImmediate();
  hideModal();
}

function bindEvents() {
  restartBtn.addEventListener("click", () => {
    resetGame();
    showToast("已重开");
  });
  window.addEventListener("keydown", onKeyDown);
  modalCancel.addEventListener("click", () => hideModal());
  modalConfirm.addEventListener("click", () => {
    if (modalConfirmAction) {
      modalConfirmAction();
    }
  });
}

function onKeyDown(e) {
  if (isMoving || state.gameOver) return;
  const dir = keyToDirection(e.key.toLowerCase());
  if (!dir) return;
  e.preventDefault();
  handleMove(dir);
}

function keyToDirection(key) {
  const axes = computeViewAlignedAxes();
  switch (key) {
    case "arrowleft":
    case "a":
      return negateAxis(axes.right);
    case "arrowright":
    case "d":
      return axes.right;
    case "arrowup":
    case "w":
      return axes.up;
    case "arrowdown":
    case "s":
      return negateAxis(axes.up);
    case "q":
      return axes.depth;
    case "e":
      return negateAxis(axes.depth);
    default:
      return null;
  }
}

function negateAxis(axis) {
  return { dx: -axis.dx, dy: -axis.dy, dz: -axis.dz };
}

function computeViewAlignedAxes() {
  const target = controls.target.clone();
  const viewDir = target.clone().sub(camera.position).normalize();
  const upWorld = new THREE.Vector3(0, 1, 0);
  let right = viewDir.clone().cross(upWorld);
  if (right.lengthSq() < 1e-6) {
    right = viewDir.clone().cross(new THREE.Vector3(1, 0, 0));
  }
  right.normalize();
  const camUp = right.clone().cross(viewDir).normalize();

  const rightAxis = axisForVector(right);
  const upAxis = axisForVector(camUp, rightAxis.axis);
  const remainingAxis = [0, 1, 2].find((i) => i !== rightAxis.axis && i !== upAxis.axis);
  const depthSign = Math.sign(viewDir.getComponent(remainingAxis)) || 1;

  return {
    right: axisToVector(rightAxis),
    up: axisToVector(upAxis),
    depth: axisToVector({ axis: remainingAxis, sign: depthSign }),
  };
}

function axisForVector(vec, excludeAxis = -1) {
  const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
  let best = { axis: 0, score: -Infinity, sign: 1 };
  axes.forEach((axis, idx) => {
    if (idx === excludeAxis) return;
    const dot = vec.dot(axis);
    const score = Math.abs(dot);
    if (score > best.score) {
      best = { axis: idx, score, sign: dot >= 0 ? 1 : -1 };
    }
  });
  return best;
}

function axisToVector(info) {
  return {
    dx: info.axis === 0 ? info.sign : 0,
    dy: info.axis === 1 ? info.sign : 0,
    dz: info.axis === 2 ? info.sign : 0,
  };
}

function handleMove(dir) {
  const result = moveGrid(state.grid, dir);
  if (!result.moved) {
    showToast("该方向无法移动");
    return;
  }
  isMoving = true;
  state.grid = result.grid;
  state.score += result.scoreDelta;
  if (state.score > state.best) {
    state.best = state.score;
    saveBest(state.best);
  }
  addRandomTile(state, result.transitions);
  updateUI();
  animateTransitions(result.transitions);
}

function moveGrid(grid, dir) {
  const size = grid.length;
  const newGrid = createGrid(size);
  const transitions = [];
  let moved = false;
  let scoreDelta = 0;

  const axis = dir.dx !== 0 ? 0 : dir.dy !== 0 ? 1 : 2;
  const forward = dir.dx + dir.dy + dir.dz > 0;

  for (let a = 0; a < size; a++) {
    for (let b = 0; b < size; b++) {
      const line = [];
      const indices = forward ? [...Array(size).keys()].reverse() : [...Array(size).keys()];
      for (const c of indices) {
        const pos = axisToPos(axis, c, a, b);
        const tile = grid[pos.x][pos.y][pos.z];
        if (tile) line.push({ tile, pos });
      }

      let writeIndex = forward ? size - 1 : 0;
      let i = 0;
      while (i < line.length) {
        const current = line[i];
        const next = line[i + 1];
        const targetPos = axisToPos(axis, writeIndex, a, b);

        if (next && next.tile.value === current.tile.value) {
          const mergedValue = current.tile.value * 2;
          const survivor = { id: current.tile.id, value: mergedValue };
          newGrid[targetPos.x][targetPos.y][targetPos.z] = survivor;
          transitions.push({
            id: current.tile.id,
            from: current.pos,
            to: targetPos,
            newValue: mergedValue,
          });
          transitions.push({
            id: next.tile.id,
            from: next.pos,
            to: targetPos,
            remove: true,
            mergeTarget: current.tile.id,
          });
          scoreDelta += mergedValue;
          moved =
            moved ||
            !positionsEqual(current.pos, targetPos) ||
            !positionsEqual(next.pos, targetPos);
          i += 2;
        } else {
          newGrid[targetPos.x][targetPos.y][targetPos.z] = current.tile;
          transitions.push({
            id: current.tile.id,
            from: current.pos,
            to: targetPos,
          });
          moved = moved || !positionsEqual(current.pos, targetPos);
          i += 1;
        }
        writeIndex += forward ? -1 : 1;
      }
    }
  }

  return { moved, grid: newGrid, transitions, scoreDelta };
}

function axisToPos(axis, c, a, b) {
  if (axis === 0) return { x: c, y: a, z: b };
  if (axis === 1) return { x: a, y: c, z: b };
  return { x: a, y: b, z: c };
}

function positionsEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

function addRandomTile(state, transitions = []) {
  const empties = [];
  for (let x = 0; x < state.size; x++) {
    for (let y = 0; y < state.size; y++) {
      for (let z = 0; z < state.size; z++) {
        if (!state.grid[x][y][z]) empties.push({ x, y, z });
      }
    }
  }
  if (!empties.length) return;
  const spot = empties[Math.floor(Math.random() * empties.length)];
  const value = Math.random() < TILE_PROB_FOUR ? 4 : 2;
  const tile = { id: uid(), value };
  state.grid[spot.x][spot.y][spot.z] = tile;
  transitions.push({
    id: tile.id,
    from: spot,
    to: spot,
    spawn: true,
    newValue: value,
  });
}

function animateTransitions(transitions) {
  const now = performance.now();
  activeAnimations = [];

  transitions.forEach((t) => {
    let mesh = tileMeshes.get(t.id);
    const targetValue = t.newValue ?? (tileMeshes.get(t.id)?.userData.value ?? 2);

    if (!mesh) {
      mesh = createTileMesh(targetValue, t.id);
      mesh.position.copy(toWorldPosition(t.from));
      mesh.scale.setScalar(t.spawn ? 0.001 : 1);
      scene.add(mesh);
      tileMeshes.set(t.id, mesh);
    }

    const duration = t.spawn ? SPAWN_SCALE_DURATION : ANIM_DURATION;
    const fromPos = toWorldPosition(t.from);
    const toPos = toWorldPosition(t.to);
    const anim = {
      mesh,
      from: fromPos,
      to: toPos,
      start: now,
      duration,
      remove: t.remove,
      newValue: t.newValue,
      spawn: t.spawn,
    };
    activeAnimations.push(anim);
  });

  const onDone = () => {
    isMoving = false;
    cleanupMeshes();
    checkGameState();
  };

  const longest = activeAnimations.length ? Math.max(...activeAnimations.map((a) => a.duration)) : 0;
  setTimeout(onDone, longest + 20);
}

function cleanupMeshes() {
  tileMeshes.forEach((mesh, id) => {
    const exists = findTileById(state.grid, id);
    if (!exists) {
      scene.remove(mesh);
      tileMeshes.delete(id);
    } else {
      const pos = findTilePos(state.grid, id);
      mesh.position.copy(toWorldPosition(pos));
      updateTileValue(mesh, exists.value);
    }
  });
}

function findTileById(grid, id) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const t = grid[x][y][z];
        if (t && t.id === id) return t;
      }
    }
  }
  return null;
}

function findTilePos(grid, id) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const t = grid[x][y][z];
        if (t && t.id === id) return { x, y, z };
      }
    }
  }
  return { x: 0, y: 0, z: 0 };
}

function renderTilesImmediate() {
  tileMeshes.forEach((mesh) => {
    scene.remove(mesh);
  });
  tileMeshes.clear();
  for (let x = 0; x < state.size; x++) {
    for (let y = 0; y < state.size; y++) {
      for (let z = 0; z < state.size; z++) {
        const tile = state.grid[x][y][z];
        if (!tile) continue;
        const mesh = createTileMesh(tile.value);
        mesh.position.copy(toWorldPosition({ x, y, z }));
        scene.add(mesh);
        tileMeshes.set(tile.id, mesh);
      }
    }
  }
}

function animate() {
  frameId = requestAnimationFrame(animate);
  const now = performance.now();
  activeAnimations = activeAnimations.filter((anim) => {
    const t = Math.min((now - anim.start) / anim.duration, 1);
    const eased = easeOutCubic(t);
    anim.mesh.position.lerpVectors(anim.from, anim.to, eased);
    if (anim.spawn) {
      const s = THREE.MathUtils.lerp(0.2, 1, eased);
      anim.mesh.scale.setScalar(s);
    }
    if (t >= 1) {
      if (anim.newValue) updateTileValue(anim.mesh, anim.newValue);
      if (anim.remove) {
        scene.remove(anim.mesh);
        tileMeshes.delete(anim.mesh.userData.id);
      } else {
        anim.mesh.scale.setScalar(1);
        anim.mesh.position.copy(anim.to);
      }
      return false;
    }
    return true;
  });
  controls.update();
  renderer.render(scene, camera);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function toWorldPosition(pos) {
  const offset = (SIZE - 1) * 0.5;
  return new THREE.Vector3(
    (pos.x - offset) * CELL_SIZE,
    (pos.y - offset) * CELL_SIZE,
    (pos.z - offset) * CELL_SIZE
  );
}

function createTileMesh(value, id) {
  const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95, 1, 1, 1);
  const materials = makeTileMaterials(value);
  const mesh = new THREE.Mesh(geometry, materials);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.userData.value = value;
  mesh.userData.id = id ?? uid();
  return mesh;
}

function updateTileValue(mesh, value) {
  mesh.userData.value = value;
  mesh.material = makeTileMaterials(value);
}

function tileColor(value) {
  const palette = {
    2: 0xf2ead7,
    4: 0xe8dcbe,
    8: 0xd8c3a2,
    16: 0xc9a66b,
    32: 0xbc9150,
    64: 0xb07d3b,
    128: 0x9a6c33,
    256: 0x84582b,
    512: 0x6f4724,
    1024: 0x5c3a1e,
    2048: 0x4a2f18,
  };
  return palette[value] ?? 0x3f2614;
}

function makeTileMaterials(value) {
  const texture = createNumberTexture(value);
  const baseColor = tileColor(value);
  const mat = new THREE.MeshPhongMaterial({
    map: texture,
    color: baseColor,
    shininess: 30,
    specular: 0x856640,
  });
  return [mat, mat, mat, mat, mat, mat];
}

function createNumberTexture(value) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const baseColor = tileColor(value);
  ctx.fillStyle = "#fff8ed";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = `rgba(${((baseColor >> 16) & 255)}, ${((baseColor >> 8) & 255)}, ${baseColor & 255}, 0.92)`;
  ctx.fillRect(8, 8, size - 16, size - 16);
  ctx.fillStyle = value <= 8 ? "#3b2e22" : "#fff8ed";
  ctx.font = "bold 120px 'Inter', 'Noto Sans SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value.toString(), size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
  texture.needsUpdate = true;
  return texture;
}

function uid() {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
  } catch (e) {
    // ignore
  }
  return `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function updateUI() {
  scoreEl.textContent = state.score;
  bestEl.textContent = state.best;
}

function saveBest(best) {
  try {
    localStorage.setItem(BEST_KEY, String(best));
  } catch (e) {
    console.warn("无法保存最高分", e);
  }
}

function loadBest() {
  try {
    const v = localStorage.getItem(BEST_KEY);
    return v ? Number(v) : 0;
  } catch (e) {
    return 0;
  }
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.remove("hidden");
  requestAnimationFrame(() => {
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.classList.add("hidden"), 250);
    }, 900);
  });
}

function checkGameState() {
  if (!state.won && getMaxTile(state.grid) >= 2048) {
    state.won = true;
    showWinModal();
  }
  if (!hasMoves(state.grid)) {
    state.gameOver = true;
    showGameOverModal();
  }
}

function showGameOverModal() {
  modalTitle.textContent = "游戏结束";
  modalBody.innerHTML = `你的分数：<strong>${state.score}</strong><br>你的最高分：<strong>${state.best}</strong>`;
  modalConfirm.textContent = "重新开始";
  modalCancel.style.display = "inline-flex";
  modal.classList.remove("hidden");
  modalConfirmAction = () => {
    resetGame();
    hideModal();
  };
}

function showWinModal() {
  modalTitle.textContent = "恭喜达到2048！";
  modalBody.textContent = "继续冲击更高数值，或重新开始一局。";
  modalConfirm.textContent = "继续";
  modalCancel.style.display = "none";
  modal.classList.remove("hidden");
  modalConfirmAction = () => hideModal();
}

function hideModal() {
  modal.classList.add("hidden");
  modalConfirmAction = null;
  modalCancel.style.display = "inline-flex";
}

function getMaxTile(grid) {
  let max = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const t = grid[x][y][z];
        if (t && t.value > max) max = t.value;
      }
    }
  }
  return max;
}

function hasMoves(grid) {
  const size = grid.length;
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      for (let z = 0; z < size; z++) {
        const t = grid[x][y][z];
        if (!t) return true;
        const neighbors = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 1, 0],
          [0, -1, 0],
          [0, 0, 1],
          [0, 0, -1],
        ];
        for (const [dx, dy, dz] of neighbors) {
          const nx = x + dx;
          const ny = y + dy;
          const nz = z + dz;
          if (nx < 0 || ny < 0 || nz < 0 || nx >= size || ny >= size || nz >= size) continue;
          const n = grid[nx][ny][nz];
          if (!n || n.value === t.value) return true;
        }
      }
    }
  }
  return false;
}

function onResize() {
  const w = container.clientWidth;
  const h = Math.max(container.clientHeight, 1);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
