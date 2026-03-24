import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const SIZE = 4;
const TILE_PROB_FOUR = 0.1;
const CELL_SIZE = 1.4;
const BOARD_PADDING = 0.02;
const ANIM_DURATION = 200;
const SPAWN_SCALE_DURATION = 180;
const BEST_KEY = "bestScore3D2048";
const SETTINGS_KEY = "settings3D2048";
const KEYBINDINGS_KEY = "keybindings3D2048";
const LANGUAGE_KEY = "language3D2048";
const GUIDE_KEY = "guideSeen3D2048";
const ANNOUNCEMENT_KEY = "announcementSeen3D2048V3.1.1";
const APP_VERSION = "V3.1.1";
const RELEASE_DATE = "2026-03-24";
const DEFAULT_SETTINGS = {
  showHints: true,
  reducedMotion: false,
  confirmRestart: true,
  showSplash: true,
  animationSpeed: 1,
  cameraSmoothness: 75,
  dragSensitivity: 5,
  tileEdgeHighlight: true,
  tileEdgeWidth: 2.4,
  helperLines: {
    outer: true,
    inner: false,
    trail: false,
  },
  themeName: "original",
  themeTone: "light",
};

const LANGUAGE_NATIVE_LABELS = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  en: "English",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ko: "한국어",
  pt: "Português",
  it: "Italiano",
  ru: "Русский",
  ar: "العربية",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  th: "ไทย",
};

const THEME_LIBRARY = {
  original: {
    light: {
      accent: "#b4823f",
      accentStrong: "#8e5f22",
      accentDeep: "#6d4314",
      pageGlowAccent: "rgba(196, 153, 98, 0.18)",
      canvasGlow: "rgba(198, 153, 90, 0.1)",
      sceneBg: "#f7f3e9",
      frameColor: "#c9a66b",
      gridColor: "#cbb79a",
    },
    dark: {
      accent: "#e1b56b",
      accentStrong: "#b87f30",
      accentDeep: "#f5d79d",
      pageGlowAccent: "rgba(225, 181, 107, 0.16)",
      canvasGlow: "rgba(225, 181, 107, 0.14)",
      sceneBg: "#17120d",
      frameColor: "#e6c181",
      gridColor: "#d5b172",
    },
  },
  crimson: {
    light: {
      accent: "#cb5a52",
      accentStrong: "#a43731",
      accentDeep: "#74211c",
      pageGlowAccent: "rgba(203, 90, 82, 0.18)",
      canvasGlow: "rgba(203, 90, 82, 0.12)",
      sceneBg: "#f8efec",
      frameColor: "#cc6d65",
      gridColor: "#d7a8a2",
    },
    dark: {
      accent: "#ff7f73",
      accentStrong: "#cb493f",
      accentDeep: "#ffd0c8",
      pageGlowAccent: "rgba(255, 127, 115, 0.18)",
      canvasGlow: "rgba(255, 127, 115, 0.16)",
      sceneBg: "#160e0d",
      frameColor: "#ff978d",
      gridColor: "#da7e78",
    },
  },
  orange: {
    light: {
      accent: "#d97b24",
      accentStrong: "#9a4f09",
      accentDeep: "#6d3402",
      pageGlowAccent: "rgba(217, 123, 36, 0.18)",
      canvasGlow: "rgba(217, 123, 36, 0.12)",
      sceneBg: "#f9f1e8",
      frameColor: "#d98d45",
      gridColor: "#dab68d",
    },
    dark: {
      accent: "#ffad52",
      accentStrong: "#c77211",
      accentDeep: "#ffdcb4",
      pageGlowAccent: "rgba(255, 173, 82, 0.18)",
      canvasGlow: "rgba(255, 173, 82, 0.16)",
      sceneBg: "#18110b",
      frameColor: "#ffbf79",
      gridColor: "#d49652",
    },
  },
  green: {
    light: {
      accent: "#4aa35e",
      accentStrong: "#24683a",
      accentDeep: "#123f21",
      pageGlowAccent: "rgba(74, 163, 94, 0.18)",
      canvasGlow: "rgba(74, 163, 94, 0.12)",
      sceneBg: "#eef7ef",
      frameColor: "#61b876",
      gridColor: "#a8d3b2",
    },
    dark: {
      accent: "#73d088",
      accentStrong: "#30914a",
      accentDeep: "#d0f4d8",
      pageGlowAccent: "rgba(115, 208, 136, 0.18)",
      canvasGlow: "rgba(115, 208, 136, 0.16)",
      sceneBg: "#0f1510",
      frameColor: "#8ae39d",
      gridColor: "#5cb172",
    },
  },
  cyan: {
    light: {
      accent: "#1fa5aa",
      accentStrong: "#0f6c73",
      accentDeep: "#093f44",
      pageGlowAccent: "rgba(31, 165, 170, 0.18)",
      canvasGlow: "rgba(31, 165, 170, 0.12)",
      sceneBg: "#edf7f7",
      frameColor: "#42bcc0",
      gridColor: "#9dd7d9",
    },
    dark: {
      accent: "#53d5db",
      accentStrong: "#15959c",
      accentDeep: "#caf8fa",
      pageGlowAccent: "rgba(83, 213, 219, 0.18)",
      canvasGlow: "rgba(83, 213, 219, 0.16)",
      sceneBg: "#0d1516",
      frameColor: "#79eaef",
      gridColor: "#4fb3b8",
    },
  },
  blue: {
    light: {
      accent: "#3b82d9",
      accentStrong: "#224f9a",
      accentDeep: "#14306c",
      pageGlowAccent: "rgba(59, 130, 217, 0.18)",
      canvasGlow: "rgba(59, 130, 217, 0.12)",
      sceneBg: "#edf3fb",
      frameColor: "#5f9deb",
      gridColor: "#a9c4ea",
    },
    dark: {
      accent: "#74adff",
      accentStrong: "#3d77ce",
      accentDeep: "#d1e4ff",
      pageGlowAccent: "rgba(116, 173, 255, 0.18)",
      canvasGlow: "rgba(116, 173, 255, 0.16)",
      sceneBg: "#0d1118",
      frameColor: "#98c3ff",
      gridColor: "#5f8fd7",
    },
  },
  violet: {
    light: {
      accent: "#8b63d9",
      accentStrong: "#5d329f",
      accentDeep: "#38196c",
      pageGlowAccent: "rgba(139, 99, 217, 0.18)",
      canvasGlow: "rgba(139, 99, 217, 0.12)",
      sceneBg: "#f3effb",
      frameColor: "#a483e8",
      gridColor: "#c4b0e7",
    },
    dark: {
      accent: "#bb93ff",
      accentStrong: "#7a4fd0",
      accentDeep: "#ecddff",
      pageGlowAccent: "rgba(187, 147, 255, 0.18)",
      canvasGlow: "rgba(187, 147, 255, 0.16)",
      sceneBg: "#120e18",
      frameColor: "#cfb0ff",
      gridColor: "#9165d5",
    },
  },
};

const THEME_KEYS = ["original", "crimson", "orange", "green", "cyan", "blue", "violet"];
const SETTINGS_CONFIG = [
  { key: "showHints", labelKey: "settingHints", copyKey: "settingHintsCopy", group: "general" },
  { key: "confirmRestart", labelKey: "settingRestart", copyKey: "settingRestartCopy", group: "general" },
  { key: "reducedMotion", labelKey: "settingMotion", copyKey: "settingMotionCopy", group: "animation" },
  { key: "showSplash", labelKey: "settingSplash", copyKey: "settingSplashCopy", group: "animation" },
];
const LIVE_SITE_URL = "https://hzagaming.github.io/3D-2048-webgame/";
const GITHUB_PROFILE_URL = "https://github.com/hzagaming";
const REPOSITORY_URL = "https://github.com/hzagaming/3D-2048-webgame";
const HELPER_LINE_MODES = ["outer", "inner", "trail"];
const DEFAULT_KEYBINDINGS = {
  moveLeft: "a",
  moveRight: "d",
  moveUp: "w",
  moveDown: "s",
  depthForward: "q",
  depthBack: "e",
  openMenu: "m",
  restart: "r",
  openRules: "h",
  openGameSettings: "g",
  openStyle: "t",
  openLanguage: "l",
  openShortcuts: "k",
  openAbout: "b",
};

const STRINGS = {
  "zh-CN": {
    htmlLang: "zh-CN",
    documentTitle: "Hanazar Games | 3D 2048",
    brandEyebrow: "Hanazar Games",
    brandTitle: "3D 2048",
    menuButton: "菜单",
    scoreLabel: "得分",
    bestLabel: "最高",
    restart: "重新开始",
    hint: "鼠标拖拽旋转视角 · 滚轮缩放 · WASD + QE 方向移动",
    menuKicker: "Hanazar Games",
    menuTitle: "游戏菜单",
    rulesTitle: "规则",
    rulesSummary: "在立体 4×4×4 棋盘中滑动数字方块，让相同数字在空间内碰撞合并。",
    announcementsTitle: "公告",
    announcementsSummary: `${APP_VERSION} · ${RELEASE_DATE}`,
    announcementsModalTitle: "更新公告",
    announcementsModalIntro: "这是 3D 2048 的 V3.1.1 更新公告。首次进入网站时会自动展示一次，之后只会在你主动打开时查看。",
    announcementsDateLabel: "发布日期",
    announcementsVersionLabel: "版本号",
    announcementsBody: `
      <div class="picker-layout">
        <div class="picker-card">
          <div class="picker-grid-title">Version</div>
          <div class="picker-card-title">3D 2048 ${APP_VERSION}</div>
          <p class="picker-card-copy">${RELEASE_DATE}</p>
          <p class="about-copy">这次更新主要把菜单、设置和可玩性都重新整理了一遍，整站已经不再只是一个基础可玩 demo。</p>
        </div>
        <div class="picker-card">
          <div class="picker-grid-title">本次更新内容</div>
          <ul class="modal-list">
            <li>新增完整菜单体系：规则、公告、预设、样式、语言、快捷键、关于全部独立弹窗。</li>
            <li>新增专业模式 / 娱乐模式预设，并支持辅助线、描边粗细、动画速度等细项调整。</li>
            <li>新增快捷键自定义，可改移动键和菜单、规则、重开、设置等功能键。</li>
            <li>新增多主题、多语言、首次引导、开场动画与 Professional 专业版标题切换。</li>
            <li>优化 3D 方块显示：数字缩放更稳，方块描边和辅助线可调，视觉层次更清楚。</li>
          </ul>
        </div>
        <div class="picker-card">
          <div class="picker-grid-title">说明</div>
          <p class="about-copy">当前版本重点是把这个项目从“单次试玩原型”推进到“可持续调设置、可持续扩展”的正式站点形态。后续版本会继续补更深的 UI 打磨、交互细节和玩法扩展。</p>
        </div>
      </div>
    `,
    announcementsConfirm: "我知道了",
    openRules: "查看完整规则",
    gameSettingsTitle: "游戏设置",
    presetTitle: "预设",
    presetModalTitle: "设置预设",
    presetModalIntro: "快速切换一组常用设置和默认快捷键。预设不会改主题颜色，只会按要求调整辅助线与方块描边。",
    presetProfessionalLabel: "专业模式",
    presetProfessionalCopy: "开启外框辅助线，方块描边调到 3x，关闭操作提示与无法移动提示，开启减弱动画，视角滑动流畅度设为 25%，保留开场动画并把标题切到 Professional 版，所有快捷键恢复默认。",
    presetEntertainmentLabel: "娱乐模式",
    presetEntertainmentCopy: "恢复默认玩法设置和默认快捷键，不改当前主题颜色。辅助线和方块描边会回到默认状态。",
    presetCustomLabel: "自定义",
    presetProfessionalMeta: "外框辅助线 · 3x 描边 · Professional",
    presetEntertainmentMeta: "默认设置 · 默认快捷键",
    presetCustomMeta: "当前配置已偏离预设",
    presetApply: "应用预设",
    presetCurrent: "当前",
    presetToastApplied: (label) => `${label} 已应用`,
    settingHints: "显示操作提示",
    settingHintsCopy: "在顶部保留鼠标旋转、滚轮缩放和键位提示，适合第一次玩或切换视角时快速确认操作。",
    settingMotion: "减弱动画",
    settingMotionCopy: "整体压缩移动和生成的动态幅度，减少晃动感，适合偏好更稳界面的玩家。",
    settingRestart: "重新开始前确认",
    settingRestartCopy: "点击重新开始时先弹出确认，避免误触直接清空当前棋盘。",
    settingSplash: "显示开场动画",
    settingSplashCopy: "进入网站时播放 Hanazar Games 与 3D 2048 的开场片头。",
    languageTitle: "语言",
    shortcutsTitle: "快捷键",
    shortcutsSummary: "移动与功能键自定义",
    shortcutsModalTitle: "快捷键设置",
    shortcutsModalIntro: "点击某个按键按钮后，按下键盘上的新按键进行绑定。按 Esc 取消，按 Backspace 或 Delete 清除。",
    shortcutMovementTitle: "移动",
    shortcutInterfaceTitle: "界面与功能",
    captureReady: "点击录制",
    captureWaiting: "按下新按键…",
    shortcutMoveLeft: "向左移动",
    shortcutMoveRight: "向右移动",
    shortcutMoveUp: "向上移动",
    shortcutMoveDown: "向下移动",
    shortcutDepthForward: "向前纵深",
    shortcutDepthBack: "向后纵深",
    shortcutOpenMenu: "打开菜单",
    shortcutRestart: "重新开始",
    shortcutOpenRules: "打开规则",
    shortcutOpenShortcuts: "打开快捷键设置",
    shortcutOpenSettings: "打开游戏设置",
    shortcutOpenStyle: "打开样式设置",
    shortcutOpenLanguage: "打开语言设置",
    shortcutOpenAbout: "打开关于信息",
    toastShortcutSaved: "快捷键已更新",
    toastShortcutCleared: "快捷键已清除",
    shortcutUnassigned: "未设置",
    langZh: "简体中文",
    langEn: "English",
    langJa: "日本語",
    langEs: "Español",
    langFr: "Français",
    langDe: "Deutsch",
    styleTitle: "样式",
    toneLight: "浅色",
    toneDark: "深色",
    themeOriginal: "原色（默认）",
    themeCrimson: "赤曜",
    themeOrange: "橙辉",
    themeGreen: "青禾",
    themeCyan: "澄青",
    themeBlue: "苍蓝",
    themeViolet: "紫曜",
    modalBackMenu: "返回菜单",
    modalClose: "关闭",
    optionOn: "开启",
    optionOff: "关闭",
    settingsSummary: (enabled, total) => `已开启 ${enabled}/${total}`,
    settingsModalTitle: "游戏设置",
    settingsModalIntro: "把常用功能拆开整理。开关即时生效，动画速度支持拖动和直接输入。",
    settingsGeneralTitle: "基础",
    settingsSessionTitle: "流程",
    settingsAnimationTitle: "动画",
    settingsAnimationIntro: "控制移动区域的节奏和过渡表现，下面的速度调节会同时影响滑动与生成动画。",
    animationSpeedLabel: "移动区域动画速度",
    animationSpeedCopy: "1.00x 为标准速度。数值越高越快，越低越慢；支持拖动滑条或直接输入。",
    animationSpeedShort: (speed) => `动画 ${speed}`,
    cameraSmoothnessLabel: "视角滑动流畅度",
    cameraSmoothnessCopy: "0% 表示鼠标移动到哪里，视角就即时跟到哪里；100% 表示极致顺滑。支持拖动滑条或直接输入百分比。",
    cameraSmoothnessShort: (value) => `流畅 ${value}`,
    dragSensitivityLabel: "鼠标拖拽灵敏度",
    dragSensitivityCopy: "调节鼠标拖拽旋转视角时的灵敏度。1 最稳，10 最灵敏。",
    resetDefaultsTitle: "恢复全部默认",
    resetDefaultsCopy: "把游戏设置、样式设置、预设相关选项和快捷键恢复到默认值，但不改当前语言。",
    resetDefaultsAction: "恢复默认",
    resetDefaultsConfirmTitle: "恢复全部默认设置？",
    resetDefaultsConfirmBody: "<p>这会把设置、样式、辅助线、描边和全部快捷键恢复到默认状态。当前语言不会被修改。</p>",
    resetDefaultsConfirmConfirm: "确认恢复",
    resetDefaultsConfirmCancel: "取消",
    toastDefaultsRestored: "已恢复默认设置",
    styleModalTitle: "样式设置",
    styleModalIntro: "切换界面与方块的主题配色，并调整浅色 / 深色表现。",
    styleAssistTitle: "视觉辅助",
    settingTileEdges: "方块边框高亮",
    settingTileEdgesCopy: "给每个方块的边缘加上描边。深色模式下使用高亮描边，浅色模式下使用深色描边。",
    tileEdgeWidthLabel: "方块描边粗细",
    tileEdgeWidthCopy: "拖动或输入描边粗细，数值越大，边缘线越明显。",
    helperLinesTitle: "辅助线组合",
    helperLinesCopy: "外框、内框和轨迹辅助线都可以分别开关，可以全开，也可以全关。",
    helperOuter: "外框辅助线",
    helperInner: "内框辅助线",
    helperTrail: "轨迹辅助线",
    helperOff: "关闭",
    languageModalTitle: "语言设置",
    languageModalIntro: "选择你要显示的界面语言，切换后会立即更新整个页面。",
    styleToneHeading: "明暗模式",
    styleThemeHeading: "主题颜色",
    languageGridHeading: "界面语言",
    aboutTitle: "关于",
    aboutSummary: "Hanazar Software · 开源与版权信息",
    aboutModalTitle: "关于 Hanazar Games",
    aboutModalIntro: "项目与品牌信息、版权说明，以及作者与仓库链接都集中在这里。",
    aboutBrandTitle: "Hanazar Software / Hanazar Games",
    aboutBrandCopy: "Hanazar Games 是 Hanazar Software 旗下的游戏与交互实验品牌。这个项目是一个可直接在浏览器运行的 3D 2048 Web Game 原型。",
    aboutVersionTitle: "版本信息",
    aboutVersionCopy: `当前版本：${APP_VERSION} · 发布日期：${RELEASE_DATE}`,
    aboutRightsTitle: "版权与许可",
    aboutRightsCopy: "Copyright © 2026 Hanazar Software / Hanazar Games. All rights reserved.",
    aboutLinksTitle: "链接",
    aboutProfileLink: "GitHub 作者主页",
    aboutRepoLink: "项目开源仓库",
    aboutLiveLink: "在线网站地址",
    splashBrand: "Hanazar Games",
    splashTitle: "3D 2048",
    splashProfessionalSuffix: "Professional",
    splashTagline: "Rotate. Merge. Think in volume.",
    splashLoading: "正在载入立方棋盘",
    splashReady: "准备完成，进入游戏",
    enterGame: "进入游戏",
    toastRestarted: "已重新开始",
    toastBlocked: "该方向无法移动",
    toastLanguage: "语言已切换",
    rulesModalTitle: "3D 2048 规则",
    rulesModalBody: `
      <div class="rules-layout">
        <div class="rules-hero">
          <p>这是一个 <strong>4×4×4</strong> 的立体 2048。目标很直接：不断合并数字块，做出 <strong>2048</strong>，再继续冲更高分。</p>
        </div>
        <div class="rules-grid">
          <div class="rule-card">
            <div class="rule-card-title">操作</div>
            <div class="key-row">
              <span class="keycap">W</span>
              <span class="keycap">A</span>
              <span class="keycap">S</span>
              <span class="keycap">D</span>
              <span class="keycap">Q</span>
              <span class="keycap">E</span>
            </div>
            <p>WASD 控制当前视角下的上下左右，Q / E 控制纵深方向。</p>
          </div>
          <div class="rule-card">
            <div class="rule-card-title">观察</div>
            <p>拖拽鼠标旋转立方体，滚轮缩放，先看清层级，再决定推动方向。</p>
          </div>
        </div>
        <ol class="rule-flow">
          <li>每次有效移动后，所有方块会朝同一方向滑动。</li>
          <li>两个相同数字相遇时会合并成一个更大的数字块。</li>
          <li>每次有效移动结束后，棋盘会随机生成一个新的 2 或 4。</li>
          <li>棋盘已满且所有方向都不能再合并时，游戏结束。</li>
        </ol>
        <div class="rule-callout">这不是平面思维游戏。你需要一边旋转视角，一边规划体积里的空位和连锁合并路线。</div>
      </div>
    `,
    rulesModalConfirm: "开始挑战",
    rulesModalCancel: "返回菜单",
    guideTitle: "欢迎来到 Hanazar Games",
    guideBody: `
      <p>这是你的第一次进入。先快速熟悉一下这局 3D 2048：</p>
      <ul class="modal-list">
        <li>棋盘不是平面，而是一个 <strong>4×4×4</strong> 立方体。</li>
        <li>拖动鼠标旋转视角，再用 <strong>WASD + QE</strong> 从当前视角推动方块。</li>
        <li>菜单里可以查看规则、切换语言、调整动画和提示显示。</li>
      </ul>
      <p>准备好后，直接开始游戏。</p>
    `,
    guideConfirm: "开始游戏",
    restartConfirmTitle: "重新开始这一局？",
    restartConfirmBody: (score) =>
      `<p>当前分数是 <strong>${score}</strong>。确认后会立刻清空棋盘并开始新的一局。</p>`,
    restartConfirmConfirm: "确认重开",
    restartConfirmCancel: "继续这局",
    winTitle: "你达到 2048 了",
    winBody: `<p>基础目标已经完成。你可以继续向更高的数字推进，或者重新开始挑战更高效率的开局。</p>`,
    winConfirm: "继续",
    winCancel: "重新开始",
    gameOverTitle: "游戏结束",
    gameOverBody: (score, best) =>
      `<p>你的分数：<strong>${score}</strong></p><p>当前最高分：<strong>${best}</strong></p><p>现在没有任何可用移动了。</p>`,
    gameOverConfirm: "重新开始",
    gameOverCancel: "关闭",
  },
  en: {
    htmlLang: "en",
    documentTitle: "Hanazar Games | 3D 2048",
    brandEyebrow: "Hanazar Games",
    brandTitle: "3D 2048",
    menuButton: "Menu",
    scoreLabel: "Score",
    bestLabel: "Best",
    restart: "Restart",
    hint: "Drag to rotate · Scroll to zoom · Move with WASD + QE",
    menuKicker: "Hanazar Games",
    menuTitle: "Game Menu",
    rulesTitle: "Rules",
    rulesSummary: "Slide number tiles through a 4×4×4 cube and collide matching values to merge them.",
    announcementsTitle: "Announcements",
    announcementsSummary: `${APP_VERSION} · ${RELEASE_DATE}`,
    announcementsModalTitle: "Update Announcements",
    announcementsModalIntro: "This is the one-time update notice for 3D 2048 V3.1.1. It appears automatically on the first visit, then only when opened manually.",
    announcementsDateLabel: "Release Date",
    announcementsVersionLabel: "Version",
    announcementsBody: `
      <div class="picker-layout">
        <div class="picker-card">
          <div class="picker-grid-title">Version</div>
          <div class="picker-card-title">3D 2048 ${APP_VERSION}</div>
          <p class="picker-card-copy">${RELEASE_DATE}</p>
          <p class="about-copy">This update turns the project from a simple playable prototype into a more fully configurable game site.</p>
        </div>
        <div class="picker-card">
          <div class="picker-grid-title">What changed</div>
          <ul class="modal-list">
            <li>A full menu system now exists for rules, announcements, presets, style, language, shortcuts, and about.</li>
            <li>Professional and entertainment presets were added, along with controls for guide lines, edge thickness, and animation speed.</li>
            <li>Shortcut customization now covers both movement keys and utility actions such as menu, restart, rules, and settings.</li>
            <li>The site now includes more themes, more languages, a first-time guide, an intro sequence, and a Professional splash title variant.</li>
            <li>Tile rendering was refined with better number fitting, adjustable outlines, and clearer visual guidance.</li>
          </ul>
        </div>
        <div class="picker-card">
          <div class="picker-grid-title">Notes</div>
          <p class="about-copy">V3.1.1 focuses on making the project easier to configure, easier to understand, and better prepared for future UI and gameplay updates.</p>
        </div>
      </div>
    `,
    announcementsConfirm: "Got It",
    openRules: "Read Full Rules",
    gameSettingsTitle: "Game Settings",
    presetTitle: "Presets",
    presetModalTitle: "Preset Setup",
    presetModalIntro: "Switch between ready-made setup bundles and default keybindings. Presets do not change the current theme colors; only guide lines and tile edges are adjusted when required.",
    presetProfessionalLabel: "Professional Mode",
    presetProfessionalCopy: "Outer frame guides on, tile edge thickness set to 3x, controls hint and blocked-move notice off, reduced motion on, camera smoothness set to 25%, intro animation kept with a Professional title, and all shortcuts reset to default.",
    presetEntertainmentLabel: "Entertainment Mode",
    presetEntertainmentCopy: "Restore the default gameplay setup and default shortcuts without changing the current theme colors. Guide lines and tile edge settings return to their default values.",
    presetCustomLabel: "Custom",
    presetProfessionalMeta: "Outer frame · 3x edges · Professional",
    presetEntertainmentMeta: "Default setup · Default shortcuts",
    presetCustomMeta: "Current setup differs from presets",
    presetApply: "Apply Preset",
    presetCurrent: "Current",
    settingHints: "Show controls hint",
    settingHintsCopy: "Keep the mouse, zoom, and keybind reminder visible in the top bar for quick reference.",
    settingMotion: "Reduce motion",
    settingMotionCopy: "Reduce the perceived motion and make movement feel steadier during play.",
    settingRestart: "Confirm before restart",
    settingRestartCopy: "Ask for confirmation before a restart clears the current run.",
    settingSplash: "Show intro animation",
    settingSplashCopy: "Play the Hanazar Games intro sequence before entering the game.",
    languageTitle: "Language",
    shortcutsTitle: "Shortcuts",
    shortcutsSummary: "Custom movement and utility keys",
    shortcutsModalTitle: "Shortcut Settings",
    shortcutsModalIntro: "Click a key button, then press a new keyboard key to bind it. Press Esc to cancel, or Backspace / Delete to clear.",
    shortcutMovementTitle: "Movement",
    shortcutInterfaceTitle: "Interface & Utility",
    captureReady: "Click to record",
    captureWaiting: "Press a new key…",
    shortcutMoveLeft: "Move Left",
    shortcutMoveRight: "Move Right",
    shortcutMoveUp: "Move Up",
    shortcutMoveDown: "Move Down",
    shortcutDepthForward: "Depth Forward",
    shortcutDepthBack: "Depth Back",
    shortcutOpenMenu: "Open Menu",
    shortcutRestart: "Restart",
    shortcutOpenRules: "Open Rules",
    shortcutOpenShortcuts: "Open Shortcuts",
    shortcutOpenSettings: "Open Game Settings",
    shortcutOpenStyle: "Open Style Settings",
    shortcutOpenLanguage: "Open Language Settings",
    shortcutOpenAbout: "Open About",
    toastShortcutSaved: "Shortcut updated",
    toastShortcutCleared: "Shortcut cleared",
    shortcutUnassigned: "Unassigned",
    langZh: "简体中文",
    langEn: "English",
    langJa: "日本語",
    langEs: "Español",
    langFr: "Français",
    langDe: "Deutsch",
    styleTitle: "Style",
    toneLight: "Light",
    toneDark: "Dark",
    themeOriginal: "Original (Default)",
    themeCrimson: "Crimson",
    themeOrange: "Orange",
    themeGreen: "Green",
    themeCyan: "Cyan",
    themeBlue: "Blue",
    themeViolet: "Violet",
    modalBackMenu: "Back to Menu",
    modalClose: "Close",
    optionOn: "On",
    optionOff: "Off",
    settingsSummary: (enabled, total) => `${enabled}/${total} enabled`,
    settingsModalTitle: "Game Settings",
    settingsModalIntro: "Core controls are grouped here. Toggles apply immediately, and animation speed supports both drag and direct input.",
    settingsGeneralTitle: "General",
    settingsSessionTitle: "Session",
    settingsAnimationTitle: "Animation",
    settingsAnimationIntro: "Tune how quickly tiles move through space. The speed control affects both slide and spawn transitions.",
    animationSpeedLabel: "Move Animation Speed",
    animationSpeedCopy: "1.00x is the default pace. Higher is faster, lower is slower. Drag or type a value directly.",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Camera Smoothness",
    cameraSmoothnessCopy: "0% means the view follows the cursor immediately. 100% means maximum smoothing. Drag the slider or type a percentage directly.",
    cameraSmoothnessShort: (value) => `Smooth ${value}`,
    dragSensitivityLabel: "Mouse Drag Sensitivity",
    dragSensitivityCopy: "Adjust how sensitive mouse dragging feels while rotating the camera. 1 is calmer, 10 is the most responsive.",
    resetDefaultsTitle: "Restore All Defaults",
    resetDefaultsCopy: "Restore game settings, style settings, preset-related options, and shortcuts to their default values without changing the current language.",
    resetDefaultsAction: "Restore Defaults",
    resetDefaultsConfirmTitle: "Restore all defaults?",
    resetDefaultsConfirmBody: "<p>This will reset settings, style options, guide lines, tile outlines, and all shortcuts back to default. Your current language will stay unchanged.</p>",
    resetDefaultsConfirmConfirm: "Confirm Reset",
    resetDefaultsConfirmCancel: "Cancel",
    toastDefaultsRestored: "Defaults restored",
    styleModalTitle: "Style Settings",
    styleModalIntro: "Switch the interface and tile palette, then choose light or dark tone.",
    styleAssistTitle: "Visual Assist",
    settingTileEdges: "Tile Edge Highlight",
    settingTileEdgesCopy: "Draw an outline around every tile. Dark mode uses a bright edge, light mode uses a dark edge.",
    tileEdgeWidthLabel: "Tile Edge Thickness",
    tileEdgeWidthCopy: "Drag or type the outline thickness. Higher values make tile edges more visible.",
    helperLinesTitle: "Guide Line Layers",
    helperLinesCopy: "Outer frame, inner grid, and trail guides can be toggled independently. Turn on any combination, or turn all of them off.",
    helperOuter: "Outer Frame",
    helperInner: "Inner Grid",
    helperTrail: "Trail Guides",
    helperOff: "Off",
    languageModalTitle: "Language Settings",
    languageModalIntro: "Pick the interface language. The whole UI updates immediately.",
    styleToneHeading: "Tone",
    styleThemeHeading: "Theme",
    languageGridHeading: "Languages",
    aboutTitle: "About",
    aboutSummary: "Hanazar Software · Rights and source links",
    aboutModalTitle: "About Hanazar Games",
    aboutModalIntro: "Brand details, rights notice, and the main author / project links live here.",
    aboutBrandTitle: "Hanazar Software / Hanazar Games",
    aboutBrandCopy: "Hanazar Games is a game and interaction label under Hanazar Software. This project is a browser-playable 3D 2048 web prototype.",
    aboutVersionTitle: "Version",
    aboutVersionCopy: `Current version: ${APP_VERSION} · Released: ${RELEASE_DATE}`,
    aboutRightsTitle: "Rights",
    aboutRightsCopy: "Copyright © 2026 Hanazar Software / Hanazar Games. All rights reserved.",
    aboutLinksTitle: "Links",
    aboutProfileLink: "GitHub Profile",
    aboutRepoLink: "Open-source Repository",
    aboutLiveLink: "Live Website",
    splashBrand: "Hanazar Games",
    splashTitle: "3D 2048",
    splashProfessionalSuffix: "Professional",
    splashTagline: "Rotate. Merge. Think in volume.",
    splashLoading: "Loading cube board",
    splashReady: "Ready. Enter the game",
    enterGame: "Enter Game",
    toastRestarted: "New run started",
    toastBlocked: "No move in that direction",
    toastLanguage: "Language switched",
    rulesModalTitle: "How 3D 2048 Works",
    rulesModalBody: `
      <div class="rules-layout">
        <div class="rules-hero">
          <p>This is a <strong>4×4×4</strong> cube version of 2048. Keep merging tiles until you build <strong>2048</strong>, then push for a bigger run.</p>
        </div>
        <div class="rules-grid">
          <div class="rule-card">
            <div class="rule-card-title">Controls</div>
            <div class="key-row">
              <span class="keycap">W</span>
              <span class="keycap">A</span>
              <span class="keycap">S</span>
              <span class="keycap">D</span>
              <span class="keycap">Q</span>
              <span class="keycap">E</span>
            </div>
            <p>WASD follows the current camera view. Q and E push along the depth axis.</p>
          </div>
          <div class="rule-card">
            <div class="rule-card-title">Read Space</div>
            <p>Rotate the cube and zoom before moving. Spatial awareness matters more than in flat 2048.</p>
          </div>
        </div>
        <ol class="rule-flow">
          <li>Every valid move slides all reachable tiles in one direction.</li>
          <li>Two matching tiles merge into a larger value when they meet.</li>
          <li>After each valid move, a fresh 2 or 4 appears somewhere in the cube.</li>
          <li>The run ends when the cube is full and no merge remains possible.</li>
        </ol>
        <div class="rule-callout">This is a volume-planning puzzle. Good runs come from managing depth, not just rows and columns.</div>
      </div>
    `,
    rulesModalConfirm: "Start Run",
    rulesModalCancel: "Back to Menu",
    guideTitle: "Welcome to Hanazar Games",
    guideBody: `
      <p>This is your first visit. Here is the quick orientation:</p>
      <ul class="modal-list">
        <li>The board is a <strong>4×4×4</strong> cube rather than a flat grid.</li>
        <li>Rotate the camera, then use <strong>WASD + QE</strong> to push tiles from your current view.</li>
        <li>The menu lets you open the rules, change language, and tune motion and hints.</li>
      </ul>
      <p>Once you are ready, begin the game.</p>
    `,
    guideConfirm: "Start Playing",
    restartConfirmTitle: "Restart this run?",
    restartConfirmBody: (score) =>
      `<p>Your current score is <strong>${score}</strong>. Restarting will clear the cube immediately.</p>`,
    restartConfirmConfirm: "Restart",
    restartConfirmCancel: "Keep Playing",
    winTitle: "You Reached 2048",
    winBody: `<p>The core target is done. You can keep chasing a larger tile, or restart and try for a cleaner run.</p>`,
    winConfirm: "Keep Going",
    winCancel: "Restart",
    gameOverTitle: "Game Over",
    gameOverBody: (score, best) =>
      `<p>Your score: <strong>${score}</strong></p><p>Best score: <strong>${best}</strong></p><p>No valid move remains.</p>`,
    gameOverConfirm: "Restart",
    gameOverCancel: "Close",
  },
  ja: {
    htmlLang: "ja",
    documentTitle: "Hanazar Games | 3D 2048",
    brandEyebrow: "Hanazar Games",
    brandTitle: "3D 2048",
    menuButton: "メニュー",
    scoreLabel: "スコア",
    bestLabel: "最高",
    restart: "リスタート",
    hint: "ドラッグで回転 · ホイールでズーム · WASD + QE で移動",
    menuKicker: "Hanazar Games",
    menuTitle: "ゲームメニュー",
    rulesTitle: "ルール",
    rulesSummary: "4×4×4 の立体キューブ内で数字タイルを滑らせ、同じ数字をぶつけて合体させます。",
    openRules: "ルールを見る",
    gameSettingsTitle: "ゲーム設定",
    settingHints: "操作ヒントを表示",
    settingHintsCopy: "マウス操作、ズーム、キー操作のヒントを上部に表示し続けます。",
    settingMotion: "アニメーションを軽くする",
    settingMotionCopy: "移動や出現の見た目を少し抑え、落ち着いた表示にします。",
    settingRestart: "リスタート前に確認",
    settingRestartCopy: "リスタート時に確認を出し、誤操作で盤面を消さないようにします。",
    settingSplash: "オープニング演出を表示",
    settingSplashCopy: "ゲーム開始前に Hanazar Games のイントロ演出を表示します。",
    languageTitle: "言語",
    langZh: "简体中文",
    langEn: "English",
    langJa: "日本語",
    langEs: "Español",
    langFr: "Français",
    langDe: "Deutsch",
    styleTitle: "スタイル",
    toneLight: "ライト",
    toneDark: "ダーク",
    themeOriginal: "原色（標準）",
    themeCrimson: "紅曜",
    themeOrange: "橙光",
    themeGreen: "翠影",
    themeCyan: "青緑",
    themeBlue: "蒼藍",
    themeViolet: "紫曜",
    modalBackMenu: "メニューへ戻る",
    modalClose: "閉じる",
    optionOn: "オン",
    optionOff: "オフ",
    settingsSummary: (enabled, total) => `${enabled}/${total} 項目が有効`,
    settingsModalTitle: "ゲーム設定",
    settingsModalIntro: "よく使う項目を分けて整理しています。変更はすぐ反映され、速度はドラッグでも直接入力でも調整できます。",
    settingsGeneralTitle: "基本",
    settingsSessionTitle: "進行",
    settingsAnimationTitle: "アニメーション",
    settingsAnimationIntro: "タイルの移動と出現のテンポを調整します。下の速度設定は両方に反映されます。",
    animationSpeedLabel: "移動アニメーション速度",
    animationSpeedCopy: "1.00x が標準です。大きいほど速く、小さいほどゆっくりになります。",
    animationSpeedShort: (speed) => `速度 ${speed}`,
    dragSensitivityLabel: "マウスドラッグ感度",
    dragSensitivityCopy: "視点を回転するときのマウスドラッグ感度を調整します。1 は穏やか、10 は最も敏感です。",
    styleModalTitle: "スタイル設定",
    styleModalIntro: "UI とタイルの配色を切り替え、ライト / ダークを選べます。",
    styleAssistTitle: "視覚補助",
    settingTileEdges: "タイル外枠ハイライト",
    settingTileEdgesCopy: "各タイルの縁を表示します。ダークでは明るく、ライトでは濃い線で表示します。",
    tileEdgeWidthLabel: "タイル外枠の太さ",
    tileEdgeWidthCopy: "ドラッグまたは直接入力で外枠の太さを調整できます。",
    helperLinesTitle: "補助線レイヤー",
    helperLinesCopy: "外枠、内枠、軌跡補助線を個別に切り替えられます。全部オンにも全部オフにもできます。",
    helperOuter: "外枠補助線",
    helperInner: "内枠補助線",
    helperTrail: "軌跡補助線",
    helperOff: "オフ",
    languageModalTitle: "言語設定",
    languageModalIntro: "表示言語を選択します。切り替えは即時反映されます。",
    styleToneHeading: "明暗",
    styleThemeHeading: "テーマカラー",
    languageGridHeading: "表示言語",
    aboutTitle: "概要",
    aboutSummary: "Hanazar Software · 権利情報とリンク",
    aboutModalTitle: "Hanazar Games について",
    aboutModalIntro: "ブランド情報、権利表記、作者とプロジェクトの主要リンクをまとめています。",
    aboutBrandTitle: "Hanazar Software / Hanazar Games",
    aboutBrandCopy: "Hanazar Games は Hanazar Software のゲーム / インタラクション実験レーベルです。この作品はブラウザで遊べる 3D 2048 Web プロトタイプです。",
    aboutRightsTitle: "権利表記",
    aboutRightsCopy: "Copyright © 2026 Hanazar Software / Hanazar Games. All rights reserved.",
    aboutLinksTitle: "リンク",
    aboutProfileLink: "GitHub プロフィール",
    aboutRepoLink: "オープンソースのリポジトリ",
    aboutLiveLink: "公開サイト",
    splashBrand: "Hanazar Games",
    splashTitle: "3D 2048",
    splashTagline: "Rotate. Merge. Think in volume.",
    splashLoading: "キューブ盤面を読み込み中",
    splashReady: "準備完了。ゲームへ",
    enterGame: "ゲーム開始",
    toastRestarted: "新しいゲームを開始しました",
    toastBlocked: "その方向には動けません",
    toastLanguage: "言語を切り替えました",
    rulesModalTitle: "3D 2048 のルール",
    rulesModalBody: `
      <div class="rules-layout">
        <div class="rules-hero">
          <p>これは <strong>4×4×4</strong> の立体 2048 です。目標は数字タイルを合体させ、<strong>2048</strong> に到達することです。</p>
        </div>
        <div class="rules-grid">
          <div class="rule-card">
            <div class="rule-card-title">操作</div>
            <div class="key-row">
              <span class="keycap">W</span>
              <span class="keycap">A</span>
              <span class="keycap">S</span>
              <span class="keycap">D</span>
              <span class="keycap">Q</span>
              <span class="keycap">E</span>
            </div>
            <p>WASD は現在の視点基準の上下左右、Q / E は奥行き方向の操作です。</p>
          </div>
          <div class="rule-card">
            <div class="rule-card-title">視点</div>
            <p>キューブを回転して層の重なりを確認してから動かすと、連鎖合体を作りやすくなります。</p>
          </div>
        </div>
        <ol class="rule-flow">
          <li>有効な移動ごとに、到達できるタイルは同じ方向へ滑ります。</li>
          <li>同じ数字がぶつかると、1 つ上の大きな数字へ合体します。</li>
          <li>移動成功後には、新しい 2 または 4 が 1 つ出現します。</li>
          <li>空きマスがなく、どの方向にも合体できなければ終了です。</li>
        </ol>
        <div class="rule-callout">平面 2048 よりも奥行き管理が重要です。空間の余白を残しながら進めるのが鍵です。</div>
      </div>
    `,
    rulesModalConfirm: "スタート",
    rulesModalCancel: "メニューへ戻る",
    guideTitle: "Hanazar Games へようこそ",
    guideBody: `
      <p>初回プレイなので、最初に要点だけ確認します。</p>
      <ul class="modal-list">
        <li>盤面は平面ではなく <strong>4×4×4</strong> のキューブです。</li>
        <li>視点を回してから <strong>WASD + QE</strong> で、その視点基準でタイルを押します。</li>
        <li>メニューからルール確認、言語変更、演出やヒントの調整ができます。</li>
      </ul>
      <p>準備ができたら、そのまま始めてください。</p>
    `,
    guideConfirm: "プレイ開始",
    restartConfirmTitle: "このゲームをリスタートしますか？",
    restartConfirmBody: (score) =>
      `<p>現在のスコアは <strong>${score}</strong> です。リスタートすると盤面はすぐに初期化されます。</p>`,
    restartConfirmConfirm: "リスタート",
    restartConfirmCancel: "続ける",
    winTitle: "2048 に到達しました",
    winBody: `<p>基本目標は達成です。このまま高い数字を目指すか、新しくやり直すことができます。</p>`,
    winConfirm: "続ける",
    winCancel: "リスタート",
    gameOverTitle: "ゲーム終了",
    gameOverBody: (score, best) =>
      `<p>今回のスコア: <strong>${score}</strong></p><p>最高スコア: <strong>${best}</strong></p><p>これ以上有効な移動はありません。</p>`,
    gameOverConfirm: "リスタート",
    gameOverCancel: "閉じる",
  },
  es: {
    htmlLang: "es",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menú",
    scoreLabel: "Puntos",
    bestLabel: "Récord",
    restart: "Reiniciar",
    hint: "Arrastra para rotar · Rueda para acercar · Mueve con WASD + QE",
    menuTitle: "Menú del Juego",
    rulesTitle: "Reglas",
    rulesSummary: "Desliza fichas dentro de un cubo 4×4×4 y fusiona valores iguales en el espacio.",
    openRules: "Ver Reglas",
    gameSettingsTitle: "Ajustes",
    settingHints: "Mostrar guía de controles",
    settingMotion: "Reducir animación",
    settingRestart: "Confirmar antes de reiniciar",
    settingSplash: "Mostrar intro",
    languageTitle: "Idioma",
    styleTitle: "Estilo",
    toneLight: "Claro",
    toneDark: "Oscuro",
    themeOriginal: "Original (Predeterminado)",
    themeCrimson: "Carmesí",
    themeOrange: "Naranja",
    themeGreen: "Verde",
    themeCyan: "Cian",
    themeBlue: "Azul",
    themeViolet: "Violeta",
    splashLoading: "Cargando el tablero cúbico",
    splashReady: "Listo. Entrar al juego",
    enterGame: "Entrar",
    toastRestarted: "Partida reiniciada",
    toastBlocked: "No se puede mover en esa dirección",
    toastLanguage: "Idioma cambiado",
    rulesModalTitle: "Cómo Funciona 3D 2048",
    rulesModalConfirm: "Empezar",
    rulesModalCancel: "Volver al menú",
    guideTitle: "Bienvenido a Hanazar Games",
    guideConfirm: "Empezar a jugar",
    restartConfirmTitle: "¿Reiniciar esta partida?",
    restartConfirmConfirm: "Reiniciar",
    restartConfirmCancel: "Seguir jugando",
    winTitle: "Has llegado a 2048",
    winConfirm: "Continuar",
    winCancel: "Reiniciar",
    gameOverTitle: "Fin de la partida",
    gameOverConfirm: "Reiniciar",
    gameOverCancel: "Cerrar",
  },
  fr: {
    htmlLang: "fr",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menu",
    scoreLabel: "Score",
    bestLabel: "Record",
    restart: "Recommencer",
    hint: "Faites glisser pour tourner · Molette pour zoomer · Déplacez avec WASD + QE",
    menuTitle: "Menu du Jeu",
    rulesTitle: "Règles",
    rulesSummary: "Faites glisser des tuiles dans un cube 4×4×4 et fusionnez les valeurs identiques.",
    openRules: "Voir les Règles",
    gameSettingsTitle: "Réglages",
    settingHints: "Afficher l'aide",
    settingMotion: "Réduire les animations",
    settingRestart: "Confirmer avant de recommencer",
    settingSplash: "Afficher l'intro",
    languageTitle: "Langue",
    styleTitle: "Style",
    toneLight: "Clair",
    toneDark: "Sombre",
    themeOriginal: "Original (Par défaut)",
    themeCrimson: "Cramoisi",
    themeOrange: "Orange",
    themeGreen: "Vert",
    themeCyan: "Cyan",
    themeBlue: "Bleu",
    themeViolet: "Violet",
    splashLoading: "Chargement du plateau cubique",
    splashReady: "Prêt. Entrer dans le jeu",
    enterGame: "Entrer",
    toastRestarted: "Nouvelle partie lancée",
    toastBlocked: "Aucun mouvement dans cette direction",
    toastLanguage: "Langue changée",
    rulesModalTitle: "Règles de 3D 2048",
    rulesModalConfirm: "Commencer",
    rulesModalCancel: "Retour au menu",
    guideTitle: "Bienvenue sur Hanazar Games",
    guideConfirm: "Commencer",
    restartConfirmTitle: "Recommencer cette partie ?",
    restartConfirmConfirm: "Recommencer",
    restartConfirmCancel: "Continuer",
    winTitle: "Vous avez atteint 2048",
    winConfirm: "Continuer",
    winCancel: "Recommencer",
    gameOverTitle: "Partie terminée",
    gameOverConfirm: "Recommencer",
    gameOverCancel: "Fermer",
  },
  de: {
    htmlLang: "de",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menü",
    scoreLabel: "Punkte",
    bestLabel: "Bestwert",
    restart: "Neustart",
    hint: "Ziehen zum Drehen · Scrollen zum Zoomen · Bewegen mit WASD + QE",
    menuTitle: "Spielmenü",
    rulesTitle: "Regeln",
    rulesSummary: "Bewege Zahlensteine in einem 4×4×4-Würfel und verschmelze gleiche Werte.",
    openRules: "Regeln ansehen",
    gameSettingsTitle: "Einstellungen",
    settingHints: "Steuerungshinweis anzeigen",
    settingMotion: "Animationen reduzieren",
    settingRestart: "Vor Neustart bestätigen",
    settingSplash: "Intro anzeigen",
    languageTitle: "Sprache",
    styleTitle: "Stil",
    toneLight: "Hell",
    toneDark: "Dunkel",
    themeOriginal: "Original (Standard)",
    themeCrimson: "Karmin",
    themeOrange: "Orange",
    themeGreen: "Grün",
    themeCyan: "Cyan",
    themeBlue: "Blau",
    themeViolet: "Violett",
    splashLoading: "Lade das Würfelbrett",
    splashReady: "Bereit. Spiel betreten",
    enterGame: "Spiel starten",
    toastRestarted: "Neue Runde gestartet",
    toastBlocked: "Keine Bewegung in diese Richtung",
    toastLanguage: "Sprache gewechselt",
    rulesModalTitle: "So funktioniert 3D 2048",
    rulesModalConfirm: "Starten",
    rulesModalCancel: "Zurück zum Menü",
    guideTitle: "Willkommen bei Hanazar Games",
    guideConfirm: "Spiel starten",
    restartConfirmTitle: "Diese Runde neu starten?",
    restartConfirmConfirm: "Neu starten",
    restartConfirmCancel: "Weiter spielen",
    winTitle: "Du hast 2048 erreicht",
    winConfirm: "Weiter",
    winCancel: "Neu starten",
    gameOverTitle: "Spiel vorbei",
    gameOverConfirm: "Neu starten",
    gameOverCancel: "Schließen",
  },
  "zh-TW": {
    htmlLang: "zh-TW",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "選單",
    scoreLabel: "分數",
    bestLabel: "最高",
    restart: "重新開始",
    hint: "滑鼠拖曳旋轉視角 · 滾輪縮放 · WASD + QE 方向移動",
    menuTitle: "遊戲選單",
    rulesTitle: "規則",
    rulesSummary: "在立體 4×4×4 棋盤中滑動數字方塊，讓相同數字在空間中碰撞合併。",
    announcementsTitle: "公告",
    announcementsSummary: `${APP_VERSION} · ${RELEASE_DATE}`,
    announcementsModalTitle: "更新公告",
    announcementsModalIntro: "這是 3D 2048 的 V3.1.1 一次性更新公告。首次進站會自動展示一次，之後只會在你主動打開時查看。",
    announcementsDateLabel: "發布日期",
    announcementsVersionLabel: "版本號",
    announcementsBody: `
      <div class="picker-layout">
        <div class="picker-card">
          <div class="picker-grid-title">Version</div>
          <div class="picker-card-title">3D 2048 ${APP_VERSION}</div>
          <p class="picker-card-copy">${RELEASE_DATE}</p>
          <p class="about-copy">這次更新把專案從單純可玩的原型，推進成更完整、可調整、可持續擴展的遊戲站點。</p>
        </div>
        <div class="picker-card">
          <div class="picker-grid-title">本次更新內容</div>
          <ul class="modal-list">
            <li>新增完整選單結構：規則、公告、預設、樣式、語言、快捷鍵、關於皆為獨立彈窗。</li>
            <li>新增專業模式 / 娛樂模式預設，並可調整輔助線、描邊粗細、動畫速度等細項。</li>
            <li>新增快捷鍵自訂，可修改移動鍵與選單、規則、重開、設定等功能鍵。</li>
            <li>新增多主題、多語言、首次引導、開場動畫，以及 Professional 專業版標題切換。</li>
            <li>優化 3D 方塊顯示：數字縮放更穩，方塊描邊與輔助線可調，畫面辨識度更高。</li>
          </ul>
        </div>
      </div>
    `,
    announcementsConfirm: "我知道了",
    openRules: "查看完整規則",
    gameSettingsTitle: "遊戲設定",
    presetTitle: "預設",
    presetModalTitle: "預設設定",
    presetModalIntro: "快速切換常用設定組合與預設快捷鍵。預設不會更改目前主題顏色，只會依需求調整輔助線與方塊描邊。",
    presetProfessionalLabel: "專業模式",
    presetProfessionalCopy: "開啟外框輔助線，方塊描邊調到 3x，關閉操作提示與無法移動提示，啟用減弱動畫，視角滑動流暢度設為 25%，保留開場動畫並把標題切成 Professional 版，所有快捷鍵恢復預設。",
    presetEntertainmentLabel: "娛樂模式",
    presetEntertainmentCopy: "恢復預設玩法設定與預設快捷鍵，不改目前主題顏色。輔助線與方塊描邊會回到預設狀態。",
    presetCustomLabel: "自訂",
    presetProfessionalMeta: "外框輔助線 · 3x 描邊 · Professional",
    presetEntertainmentMeta: "預設設定 · 預設快捷鍵",
    presetCustomMeta: "目前配置已偏離預設",
    presetApply: "套用預設",
    presetCurrent: "目前",
    settingHints: "顯示操作提示",
    settingHintsCopy: "在頂部保留滑鼠旋轉、滾輪縮放與鍵位提示，方便快速確認操作。",
    settingMotion: "降低動畫",
    settingMotionCopy: "整體降低移動與生成時的動態感，適合偏好更穩定畫面的玩家。",
    settingRestart: "重新開始前確認",
    settingRestartCopy: "重新開始前先跳出確認，避免誤觸直接清空當前棋盤。",
    settingSplash: "顯示開場動畫",
    settingSplashCopy: "進站時播放 Hanazar Games 與 3D 2048 的開場片頭。",
shortcutsTitle: "快捷鍵",
shortcutsSummary: "移動與功能鍵自訂",
shortcutsModalTitle: "快捷鍵設定",
shortcutsModalIntro: "點一下按鍵按鈕後，再按鍵盤上的新按鍵完成綁定。按 Esc 取消，按 Backspace 或 Delete 清除。",
shortcutMovementTitle: "移動",
shortcutInterfaceTitle: "介面與功能",
captureReady: "點擊錄製",
captureWaiting: "按下新按鍵…",
shortcutMoveLeft: "向左移動",
shortcutMoveRight: "向右移動",
shortcutMoveUp: "向上移動",
shortcutMoveDown: "向下移動",
shortcutDepthForward: "向前縱深",
shortcutDepthBack: "向後縱深",
shortcutOpenMenu: "打開選單",
shortcutRestart: "重新開始",
shortcutOpenRules: "打開規則",
shortcutOpenSettings: "打開遊戲設定",
shortcutOpenStyle: "打開樣式設定",
shortcutOpenLanguage: "打開語言設定",
shortcutOpenShortcuts: "打開快捷鍵設定",
shortcutOpenAbout: "打開關於資訊",
toastShortcutSaved: "快捷鍵已更新",
toastShortcutCleared: "快捷鍵已清除",
shortcutUnassigned: "未設定",
    languageTitle: "語言",
    styleTitle: "樣式",
    toneLight: "淺色",
    toneDark: "深色",
    themeOriginal: "原色（預設）",
    themeCrimson: "赤曜",
    themeOrange: "橙輝",
    themeGreen: "青禾",
    themeCyan: "澄青",
    themeBlue: "蒼藍",
    themeViolet: "紫曜",
    settingsSummary: (enabled, total) => `已開啟 ${enabled}/${total}`,
    splashLoading: "正在載入立方棋盤",
    splashReady: "準備完成，進入遊戲",
    enterGame: "進入遊戲",
    toastRestarted: "已重新開始",
    toastBlocked: "該方向無法移動",
    toastLanguage: "語言已切換",
    settingsModalTitle: "遊戲設定",
    settingsModalIntro: "把常用功能分區整理。開關即時生效，動畫速度支援拖動與直接輸入。",
    styleModalTitle: "樣式設定",
    styleModalIntro: "切換介面與方塊的主題配色，並調整淺色 / 深色表現。",
    styleAssistTitle: "視覺輔助",
    settingTileEdges: "方塊邊框高亮",
    settingTileEdgesCopy: "為每個方塊邊緣加上描邊。深色模式下較亮，淺色模式下較深。",
    tileEdgeWidthLabel: "方塊描邊粗細",
    tileEdgeWidthCopy: "拖動或直接輸入描邊粗細，數值越大邊緣越明顯。",
    helperLinesTitle: "輔助線組合",
    helperLinesCopy: "外框、內框與軌跡輔助線都可分別開關，可全開也可全關。",
    helperOuter: "外框輔助線",
    helperInner: "內框輔助線",
    helperTrail: "軌跡輔助線",
    helperOff: "關閉",
    languageModalTitle: "語言設定",
    languageModalIntro: "選擇你要顯示的介面語言，切換後會立即更新整個頁面。",
    settingsAnimationTitle: "動畫",
    settingsGeneralTitle: "基礎",
    settingsSessionTitle: "流程",
    settingsAnimationIntro: "控制移動區域的節奏與過渡表現，下面的速度設定會同時影響滑動與生成動畫。",
    animationSpeedLabel: "移動區域動畫速度",
    animationSpeedCopy: "1.00x 為標準速度。數值越高越快，越低越慢。",
    animationSpeedShort: (speed) => `動畫 ${speed}`,
    cameraSmoothnessLabel: "視角滑動流暢度",
    cameraSmoothnessCopy: "0% 表示滑鼠移到哪裡，視角就立即跟到哪裡；100% 表示極致順滑。支援拖動滑桿或直接輸入百分比。",
    cameraSmoothnessShort: (value) => `流暢 ${value}`,
    dragSensitivityLabel: "滑鼠拖曳靈敏度",
    dragSensitivityCopy: "調整滑鼠拖曳旋轉視角時的靈敏度。1 最穩，10 最靈敏。",
    resetDefaultsTitle: "恢復全部預設",
    resetDefaultsCopy: "把遊戲設定、樣式設定、預設相關選項與快捷鍵恢復成預設值，但不變更目前語言。",
    resetDefaultsAction: "恢復預設",
    resetDefaultsConfirmTitle: "要恢復全部預設嗎？",
    resetDefaultsConfirmBody: "<p>這會把設定、樣式、輔助線、描邊與全部快捷鍵恢復成預設狀態，目前語言不會被修改。</p>",
    resetDefaultsConfirmConfirm: "確認恢復",
    resetDefaultsConfirmCancel: "取消",
    toastDefaultsRestored: "已恢復預設設定",
    aboutTitle: "關於",
    aboutSummary: "Hanazar Software · 開源與版權資訊",
    aboutVersionTitle: "版本資訊",
    aboutVersionCopy: `目前版本：${APP_VERSION} · 發布日期：${RELEASE_DATE}`,
    splashProfessionalSuffix: "Professional",
  },
  ko: {
    htmlLang: "ko",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "메뉴",
    scoreLabel: "점수",
    bestLabel: "최고",
    restart: "다시 시작",
    hint: "드래그로 회전 · 휠로 확대/축소 · WASD + QE 로 이동",
    menuTitle: "게임 메뉴",
    rulesTitle: "규칙",
    openRules: "규칙 보기",
    gameSettingsTitle: "게임 설정",
    languageTitle: "언어",
    styleTitle: "스타일",
    toneLight: "라이트",
    toneDark: "다크",
    themeOriginal: "원색 (기본)",
    toastLanguage: "언어가 변경되었습니다",
  },
  pt: {
    htmlLang: "pt",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menu",
    scoreLabel: "Pontos",
    bestLabel: "Recorde",
    restart: "Reiniciar",
    hint: "Arraste para girar · Role para aproximar · Mova com WASD + QE",
    menuTitle: "Menu do Jogo",
    rulesTitle: "Regras",
    openRules: "Ver Regras",
    gameSettingsTitle: "Configurações",
    languageTitle: "Idioma",
    styleTitle: "Estilo",
    toneLight: "Claro",
    toneDark: "Escuro",
    themeOriginal: "Original (Padrão)",
    toastLanguage: "Idioma alterado",
  },
  it: {
    htmlLang: "it",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menu",
    scoreLabel: "Punteggio",
    bestLabel: "Record",
    restart: "Ricomincia",
    hint: "Trascina per ruotare · Rotella per zoomare · Muovi con WASD + QE",
    menuTitle: "Menu di Gioco",
    rulesTitle: "Regole",
    openRules: "Apri Regole",
    gameSettingsTitle: "Impostazioni",
    languageTitle: "Lingua",
    styleTitle: "Stile",
    toneLight: "Chiaro",
    toneDark: "Scuro",
    themeOriginal: "Originale (Predefinito)",
    toastLanguage: "Lingua cambiata",
  },
  ru: {
    htmlLang: "ru",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Меню",
    scoreLabel: "Счёт",
    bestLabel: "Рекорд",
    restart: "Заново",
    hint: "Потяните для поворота · Колесо для зума · Движение WASD + QE",
    menuTitle: "Меню Игры",
    rulesTitle: "Правила",
    openRules: "Открыть Правила",
    gameSettingsTitle: "Настройки",
    languageTitle: "Язык",
    styleTitle: "Стиль",
    toneLight: "Светлый",
    toneDark: "Тёмный",
    themeOriginal: "Оригинал (По умолчанию)",
    toastLanguage: "Язык переключён",
  },
  ar: {
    htmlLang: "ar",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "القائمة",
    scoreLabel: "النتيجة",
    bestLabel: "الأعلى",
    restart: "إعادة",
    hint: "اسحب للدوران · استخدم العجلة للتكبير · حرّك بـ WASD + QE",
    menuTitle: "قائمة اللعبة",
    rulesTitle: "القواعد",
    openRules: "عرض القواعد",
    gameSettingsTitle: "الإعدادات",
    languageTitle: "اللغة",
    styleTitle: "النمط",
    toneLight: "فاتح",
    toneDark: "داكن",
    themeOriginal: "الأصلي (الافتراضي)",
    toastLanguage: "تم تغيير اللغة",
  },
  hi: {
    htmlLang: "hi",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "मेन्यू",
    scoreLabel: "स्कोर",
    bestLabel: "सर्वश्रेष्ठ",
    restart: "फिर से शुरू",
    hint: "घुमाने के लिए ड्रैग करें · ज़ूम के लिए स्क्रोल करें · WASD + QE से चलें",
    menuTitle: "गेम मेन्यू",
    rulesTitle: "नियम",
    openRules: "नियम देखें",
    gameSettingsTitle: "सेटिंग्स",
    languageTitle: "भाषा",
    styleTitle: "स्टाइल",
    toneLight: "हल्का",
    toneDark: "गहरा",
    themeOriginal: "मूल (डिफ़ॉल्ट)",
    toastLanguage: "भाषा बदली गई",
  },
  id: {
    htmlLang: "id",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menu",
    scoreLabel: "Skor",
    bestLabel: "Tertinggi",
    restart: "Mulai Ulang",
    hint: "Seret untuk memutar · Gulir untuk zoom · Gerak dengan WASD + QE",
    menuTitle: "Menu Game",
    rulesTitle: "Aturan",
    openRules: "Lihat Aturan",
    gameSettingsTitle: "Pengaturan",
    languageTitle: "Bahasa",
    styleTitle: "Gaya",
    toneLight: "Terang",
    toneDark: "Gelap",
    themeOriginal: "Asli (Default)",
    toastLanguage: "Bahasa diganti",
  },
  tr: {
    htmlLang: "tr",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menü",
    scoreLabel: "Skor",
    bestLabel: "En İyi",
    restart: "Yeniden Başlat",
    hint: "Döndürmek için sürükle · Yakınlaştırmak için kaydır · WASD + QE ile hareket et",
    menuTitle: "Oyun Menüsü",
    rulesTitle: "Kurallar",
    openRules: "Kuralları Aç",
    gameSettingsTitle: "Ayarlar",
    languageTitle: "Dil",
    styleTitle: "Stil",
    toneLight: "Açık",
    toneDark: "Koyu",
    themeOriginal: "Orijinal (Varsayılan)",
    toastLanguage: "Dil değiştirildi",
  },
  vi: {
    htmlLang: "vi",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "Menu",
    scoreLabel: "Điểm",
    bestLabel: "Cao nhất",
    restart: "Chơi lại",
    hint: "Kéo để xoay · Lăn chuột để zoom · Di chuyển bằng WASD + QE",
    menuTitle: "Menu Trò Chơi",
    rulesTitle: "Luật chơi",
    openRules: "Xem Luật",
    gameSettingsTitle: "Cài đặt",
    languageTitle: "Ngôn ngữ",
    styleTitle: "Kiểu",
    toneLight: "Sáng",
    toneDark: "Tối",
    themeOriginal: "Nguyên bản (Mặc định)",
    toastLanguage: "Đã đổi ngôn ngữ",
  },
  th: {
    htmlLang: "th",
    documentTitle: "Hanazar Games | 3D 2048",
    menuButton: "เมนู",
    scoreLabel: "คะแนน",
    bestLabel: "สูงสุด",
    restart: "เริ่มใหม่",
    hint: "ลากเพื่อหมุน · เลื่อนเพื่อซูม · ใช้ WASD + QE เพื่อขยับ",
    menuTitle: "เมนูเกม",
    rulesTitle: "กติกา",
    openRules: "ดูกติกา",
    gameSettingsTitle: "การตั้งค่า",
    languageTitle: "ภาษา",
    styleTitle: "สไตล์",
    toneLight: "สว่าง",
    toneDark: "มืด",
    themeOriginal: "ดั้งเดิม (ค่าเริ่มต้น)",
    toastLanguage: "เปลี่ยนภาษาแล้ว",
  },
};

const LANGUAGE_ENHANCEMENTS = {
  ja: {
    announcementsTitle: "お知らせ",
    announcementsModalTitle: "更新のお知らせ",
    presetTitle: "プリセット",
    presetModalTitle: "プリセット設定",
    presetProfessionalLabel: "プロフェッショナルモード",
    presetEntertainmentLabel: "エンタメモード",
    presetCustomLabel: "カスタム",
    presetProfessionalMeta: "外枠ガイド · 3x エッジ · Professional",
    presetEntertainmentMeta: "標準設定 · 標準キー",
    presetCustomMeta: "現在の設定はプリセット外です",
    shortcutsTitle: "ショートカット",
    shortcutsModalTitle: "ショートカット設定",
    aboutTitle: "情報",
    aboutModalTitle: "Hanazar Games について",
    aboutVersionTitle: "バージョン情報",
    aboutSummary: "Hanazar Software · 権利とオープンソース",
    cameraSmoothnessLabel: "カメラの滑らかさ",
    cameraSmoothnessCopy: "0% ではマウス位置へ即座に追従し、100% では最大限になめらかに追従します。",
    cameraSmoothnessShort: (value) => `滑らかさ ${value}`,
    dragSensitivityLabel: "マウスドラッグ感度",
    dragSensitivityCopy: "視点を回転するときのマウスドラッグ感度を調整します。1 は穏やか、10 は最も敏感です。",
    resetDefaultsTitle: "すべて初期化",
    resetDefaultsAction: "初期化する",
  },
  es: {
    announcementsTitle: "Anuncios",
    announcementsModalTitle: "Anuncios de Actualización",
    presetTitle: "Preajustes",
    presetModalTitle: "Preajustes",
    presetProfessionalLabel: "Modo Profesional",
    presetEntertainmentLabel: "Modo Entretenimiento",
    presetCustomLabel: "Personalizado",
    presetProfessionalMeta: "Marco exterior · borde 3x · Professional",
    presetEntertainmentMeta: "Predeterminado · atajos por defecto",
    presetCustomMeta: "Configuración actual personalizada",
    shortcutsTitle: "Atajos",
    shortcutsModalTitle: "Atajos",
    aboutTitle: "Acerca de",
    aboutModalTitle: "Acerca de Hanazar Games",
    aboutVersionTitle: "Versión",
    aboutSummary: "Hanazar Software · Derechos y código abierto",
    settingsModalTitle: "Configuración",
    settingsGeneralTitle: "Básico",
    settingsAnimationTitle: "Animación",
    settingsSummary: (enabled, total) => `${enabled}/${total} activos`,
    animationSpeedLabel: "Velocidad de Animación",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Suavidad de Cámara",
    cameraSmoothnessCopy: "0% hace que la vista siga el cursor al instante. 100% aplica la máxima suavidad.",
    cameraSmoothnessShort: (value) => `Suave ${value}`,
    dragSensitivityLabel: "Sensibilidad de Arrastre",
    dragSensitivityCopy: "Ajusta la sensibilidad del arrastre del ratón al rotar la cámara. 1 es más estable y 10 es el más sensible.",
    resetDefaultsTitle: "Restaurar Todo",
    resetDefaultsAction: "Restaurar",
    optionOn: "Activado",
    optionOff: "Desactivado",
  },
  fr: {
    announcementsTitle: "Annonces",
    announcementsModalTitle: "Annonce de Mise à Jour",
    presetTitle: "Préréglages",
    presetModalTitle: "Préréglages",
    presetProfessionalLabel: "Mode Professionnel",
    presetEntertainmentLabel: "Mode Divertissement",
    presetCustomLabel: "Personnalisé",
    presetProfessionalMeta: "Cadre extérieur · contour 3x · Professional",
    presetEntertainmentMeta: "Par défaut · raccourcis par défaut",
    presetCustomMeta: "Configuration personnalisée",
    shortcutsTitle: "Raccourcis",
    shortcutsModalTitle: "Raccourcis",
    aboutTitle: "À propos",
    aboutModalTitle: "À propos de Hanazar Games",
    aboutVersionTitle: "Version",
    aboutSummary: "Hanazar Software · Droits et source ouverte",
    settingsModalTitle: "Paramètres du Jeu",
    settingsGeneralTitle: "Base",
    settingsAnimationTitle: "Animation",
    settingsSummary: (enabled, total) => `${enabled}/${total} activés`,
    animationSpeedLabel: "Vitesse d'Animation",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Fluidité de Caméra",
    cameraSmoothnessCopy: "0% suit immédiatement la souris. 100% applique le lissage maximal.",
    cameraSmoothnessShort: (value) => `Fluide ${value}`,
    dragSensitivityLabel: "Sensibilité du Glisser",
    dragSensitivityCopy: "Ajuste la sensibilité du glisser de la souris lors de la rotation de la caméra. 1 est plus stable, 10 est le plus réactif.",
    resetDefaultsTitle: "Tout Réinitialiser",
    resetDefaultsAction: "Réinitialiser",
    optionOn: "Activé",
    optionOff: "Désactivé",
  },
  de: {
    announcementsTitle: "Ankündigungen",
    announcementsModalTitle: "Update-Ankündigung",
    presetTitle: "Voreinstellungen",
    presetModalTitle: "Voreinstellungen",
    presetProfessionalLabel: "Profi-Modus",
    presetEntertainmentLabel: "Unterhaltungsmodus",
    presetCustomLabel: "Benutzerdefiniert",
    presetProfessionalMeta: "Außenrahmen · 3x Kanten · Professional",
    presetEntertainmentMeta: "Standard · Standard-Tasten",
    presetCustomMeta: "Aktuelle Konfiguration",
    shortcutsTitle: "Tastenkürzel",
    shortcutsModalTitle: "Tastenkürzel",
    aboutTitle: "Info",
    aboutModalTitle: "Über Hanazar Games",
    aboutVersionTitle: "Version",
    aboutSummary: "Hanazar Software · Rechte und Open Source",
    settingsModalTitle: "Spieleinstellungen",
    settingsGeneralTitle: "Grundlagen",
    settingsAnimationTitle: "Animation",
    settingsSummary: (enabled, total) => `${enabled}/${total} aktiv`,
    animationSpeedLabel: "Animationsgeschwindigkeit",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Kameraglättung",
    cameraSmoothnessCopy: "0% folgt der Ansicht sofort der Maus. 100% bedeutet maximale Glättung.",
    cameraSmoothnessShort: (value) => `Glatt ${value}`,
    dragSensitivityLabel: "Maus-Ziehempfindlichkeit",
    dragSensitivityCopy: "Passt die Empfindlichkeit beim Ziehen mit der Maus zur Kameradrehung an. 1 ist ruhiger, 10 am empfindlichsten.",
    resetDefaultsTitle: "Alles Zurücksetzen",
    resetDefaultsAction: "Zurücksetzen",
    optionOn: "Ein",
    optionOff: "Aus",
  },
  ko: {
    announcementsTitle: "공지",
    announcementsModalTitle: "업데이트 공지",
    presetTitle: "프리셋",
    presetModalTitle: "프리셋",
    presetProfessionalLabel: "프로 모드",
    presetEntertainmentLabel: "엔터테인먼트 모드",
    presetCustomLabel: "사용자 지정",
    presetProfessionalMeta: "외곽선 · 3x 테두리 · Professional",
    presetEntertainmentMeta: "기본 설정 · 기본 단축키",
    presetCustomMeta: "현재 사용자 설정",
    shortcutsTitle: "단축키",
    shortcutsModalTitle: "단축키 설정",
    aboutTitle: "정보",
    aboutModalTitle: "Hanazar Games 정보",
    aboutVersionTitle: "버전",
    aboutSummary: "Hanazar Software · 권리 및 오픈소스",
    settingsModalTitle: "게임 설정",
    settingsGeneralTitle: "기본",
    settingsAnimationTitle: "애니메이션",
    settingsSummary: (enabled, total) => `${enabled}/${total} 활성화`,
    animationSpeedLabel: "이동 애니메이션 속도",
    animationSpeedShort: (speed) => `애니 ${speed}`,
    cameraSmoothnessLabel: "카메라 부드러움",
    cameraSmoothnessCopy: "0%는 마우스를 즉시 따라가고, 100%는 가장 부드럽게 움직입니다.",
    cameraSmoothnessShort: (value) => `부드러움 ${value}`,
    dragSensitivityLabel: "마우스 드래그 감도",
    dragSensitivityCopy: "시점을 회전할 때 마우스 드래그 감도를 조절합니다. 1은 안정적이고 10은 가장 민감합니다.",
    resetDefaultsTitle: "전체 기본값 복원",
    resetDefaultsAction: "기본값 복원",
    optionOn: "켜기",
    optionOff: "끄기",
  },
  pt: {
    announcementsTitle: "Avisos",
    announcementsModalTitle: "Aviso de Atualização",
    presetTitle: "Predefinições",
    presetModalTitle: "Predefinições",
    presetProfessionalLabel: "Modo Profissional",
    presetEntertainmentLabel: "Modo Entretenimento",
    presetCustomLabel: "Personalizado",
    presetProfessionalMeta: "Moldura externa · borda 3x · Professional",
    presetEntertainmentMeta: "Padrão · atalhos padrão",
    presetCustomMeta: "Configuração atual personalizada",
    shortcutsTitle: "Atalhos",
    shortcutsModalTitle: "Atalhos",
    aboutTitle: "Sobre",
    aboutModalTitle: "Sobre Hanazar Games",
    aboutVersionTitle: "Versão",
    aboutSummary: "Hanazar Software · Direitos e código aberto",
    settingsModalTitle: "Configurações do Jogo",
    settingsGeneralTitle: "Básico",
    settingsAnimationTitle: "Animação",
    settingsSummary: (enabled, total) => `${enabled}/${total} ativos`,
    animationSpeedLabel: "Velocidade da Animação",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Suavidade da Câmera",
    cameraSmoothnessCopy: "0% faz a visão seguir o cursor imediatamente. 100% aplica a suavidade máxima.",
    cameraSmoothnessShort: (value) => `Suave ${value}`,
    dragSensitivityLabel: "Sensibilidade de Arrasto",
    dragSensitivityCopy: "Ajusta a sensibilidade do arrasto do mouse ao girar a câmera. 1 é mais estável e 10 é o mais sensível.",
    resetDefaultsTitle: "Restaurar Tudo",
    resetDefaultsAction: "Restaurar",
    optionOn: "Ligado",
    optionOff: "Desligado",
  },
  it: {
    announcementsTitle: "Annunci",
    announcementsModalTitle: "Annuncio di Aggiornamento",
    presetTitle: "Preset",
    presetModalTitle: "Preset",
    presetProfessionalLabel: "Modalità Professionale",
    presetEntertainmentLabel: "Modalità Intrattenimento",
    presetCustomLabel: "Personalizzato",
    presetProfessionalMeta: "Cornice esterna · bordo 3x · Professional",
    presetEntertainmentMeta: "Predefinito · scorciatoie standard",
    presetCustomMeta: "Configurazione personalizzata",
    shortcutsTitle: "Scorciatoie",
    shortcutsModalTitle: "Scorciatoie",
    aboutTitle: "Informazioni",
    aboutModalTitle: "Informazioni su Hanazar Games",
    aboutVersionTitle: "Versione",
    aboutSummary: "Hanazar Software · Diritti e open source",
    settingsModalTitle: "Impostazioni di Gioco",
    settingsGeneralTitle: "Base",
    settingsAnimationTitle: "Animazione",
    settingsSummary: (enabled, total) => `${enabled}/${total} attive`,
    animationSpeedLabel: "Velocità Animazione",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Fluidità Camera",
    cameraSmoothnessCopy: "0% segue subito il mouse. 100% applica la massima fluidità.",
    cameraSmoothnessShort: (value) => `Fluida ${value}`,
    dragSensitivityLabel: "Sensibilità del Trascinamento",
    dragSensitivityCopy: "Regola la sensibilità del trascinamento del mouse mentre ruoti la telecamera. 1 è più stabile, 10 è il più sensibile.",
    resetDefaultsTitle: "Ripristina Tutto",
    resetDefaultsAction: "Ripristina",
    optionOn: "Attivo",
    optionOff: "Disattivo",
  },
  ru: {
    announcementsTitle: "Объявления",
    announcementsModalTitle: "Объявление об Обновлении",
    presetTitle: "Профили",
    presetModalTitle: "Профили",
    presetProfessionalLabel: "Профессиональный режим",
    presetEntertainmentLabel: "Развлекательный режим",
    presetCustomLabel: "Пользовательский",
    presetProfessionalMeta: "Внешняя рамка · контур 3x · Professional",
    presetEntertainmentMeta: "По умолчанию · стандартные клавиши",
    presetCustomMeta: "Текущая конфигурация",
    shortcutsTitle: "Горячие клавиши",
    shortcutsModalTitle: "Горячие клавиши",
    aboutTitle: "О проекте",
    aboutModalTitle: "О Hanazar Games",
    aboutVersionTitle: "Версия",
    aboutSummary: "Hanazar Software · Права и исходный код",
    settingsModalTitle: "Настройки Игры",
    settingsGeneralTitle: "Основное",
    settingsAnimationTitle: "Анимация",
    settingsSummary: (enabled, total) => `${enabled}/${total} включено`,
    animationSpeedLabel: "Скорость Анимации",
    animationSpeedShort: (speed) => `Аним ${speed}`,
    cameraSmoothnessLabel: "Плавность Камеры",
    cameraSmoothnessCopy: "0% означает мгновенное следование за мышью. 100% даёт максимальное сглаживание.",
    cameraSmoothnessShort: (value) => `Плавн. ${value}`,
    dragSensitivityLabel: "Чувствительность Перетаскивания",
    dragSensitivityCopy: "Настраивает чувствительность перетаскивания мышью при вращении камеры. 1 спокойнее, 10 наиболее чувствительно.",
    resetDefaultsTitle: "Сбросить Всё",
    resetDefaultsAction: "Сбросить",
    optionOn: "Вкл",
    optionOff: "Выкл",
  },
  ar: {
    announcementsTitle: "الإعلانات",
    announcementsModalTitle: "إعلان التحديث",
    presetTitle: "الإعدادات الجاهزة",
    presetModalTitle: "الإعدادات الجاهزة",
    presetProfessionalLabel: "الوضع الاحترافي",
    presetEntertainmentLabel: "وضع الترفيه",
    presetCustomLabel: "مخصص",
    presetProfessionalMeta: "الإطار الخارجي · حافة 3x · Professional",
    presetEntertainmentMeta: "الافتراضي · الاختصارات الافتراضية",
    presetCustomMeta: "الإعداد الحالي",
    shortcutsTitle: "الاختصارات",
    shortcutsModalTitle: "إعدادات الاختصارات",
    aboutTitle: "حول",
    aboutModalTitle: "حول Hanazar Games",
    aboutVersionTitle: "الإصدار",
    aboutSummary: "Hanazar Software · الحقوق والمصدر المفتوح",
    settingsModalTitle: "إعدادات اللعبة",
    settingsGeneralTitle: "أساسي",
    settingsAnimationTitle: "الرسوم",
    settingsSummary: (enabled, total) => `${enabled}/${total} مفعّل`,
    animationSpeedLabel: "سرعة الحركة",
    animationSpeedShort: (speed) => `حركة ${speed}`,
    cameraSmoothnessLabel: "سلاسة الكاميرا",
    cameraSmoothnessCopy: "0% يعني أن المشهد يتبع المؤشر فوراً، و100% يعني أقصى سلاسة ممكنة.",
    cameraSmoothnessShort: (value) => `سلاسة ${value}`,
    dragSensitivityLabel: "حساسية السحب",
    dragSensitivityCopy: "يضبط حساسية سحب الفأرة عند تدوير الكاميرا. 1 أكثر ثباتاً و10 الأعلى حساسية.",
    resetDefaultsTitle: "استعادة الافتراضي",
    resetDefaultsAction: "استعادة",
    optionOn: "تشغيل",
    optionOff: "إيقاف",
  },
  hi: {
    announcementsTitle: "घोषणाएँ",
    announcementsModalTitle: "अपडेट घोषणा",
    presetTitle: "प्रीसेट",
    presetModalTitle: "प्रीसेट",
    presetProfessionalLabel: "प्रोफेशनल मोड",
    presetEntertainmentLabel: "मनोरंजन मोड",
    presetCustomLabel: "कस्टम",
    presetProfessionalMeta: "बाहरी फ्रेम · 3x किनारा · Professional",
    presetEntertainmentMeta: "डिफ़ॉल्ट सेटअप · डिफ़ॉल्ट कुंजियाँ",
    presetCustomMeta: "वर्तमान कस्टम सेटअप",
    shortcutsTitle: "शॉर्टकट",
    shortcutsModalTitle: "शॉर्टकट सेटिंग्स",
    aboutTitle: "परिचय",
    aboutModalTitle: "Hanazar Games के बारे में",
    aboutVersionTitle: "संस्करण",
    aboutSummary: "Hanazar Software · अधिकार और ओपन सोर्स",
    settingsModalTitle: "गेम सेटिंग्स",
    settingsGeneralTitle: "बेसिक",
    settingsAnimationTitle: "एनीमेशन",
    settingsSummary: (enabled, total) => `${enabled}/${total} चालू`,
    animationSpeedLabel: "एनीमेशन गति",
    animationSpeedShort: (speed) => `एनीम ${speed}`,
    cameraSmoothnessLabel: "कैमरा स्मूदनेस",
    cameraSmoothnessCopy: "0% पर दृश्य तुरंत माउस का पीछा करता है। 100% पर सबसे ज़्यादा स्मूदनेस मिलती है।",
    cameraSmoothnessShort: (value) => `स्मूद ${value}`,
    dragSensitivityLabel: "माउस ड्रैग संवेदनशीलता",
    dragSensitivityCopy: "कैमरा घुमाते समय माउस ड्रैग की संवेदनशीलता समायोजित करें। 1 सबसे स्थिर है और 10 सबसे तेज़ प्रतिक्रिया देता है।",
    resetDefaultsTitle: "सभी डिफ़ॉल्ट बहाल करें",
    resetDefaultsAction: "बहाल करें",
    optionOn: "चालू",
    optionOff: "बंद",
  },
  id: {
    announcementsTitle: "Pengumuman",
    announcementsModalTitle: "Pengumuman Pembaruan",
    presetTitle: "Preset",
    presetModalTitle: "Preset",
    presetProfessionalLabel: "Mode Profesional",
    presetEntertainmentLabel: "Mode Hiburan",
    presetCustomLabel: "Kustom",
    presetProfessionalMeta: "Bingkai luar · tepi 3x · Professional",
    presetEntertainmentMeta: "Default · tombol default",
    presetCustomMeta: "Pengaturan kustom saat ini",
    shortcutsTitle: "Tombol Pintas",
    shortcutsModalTitle: "Tombol Pintas",
    aboutTitle: "Tentang",
    aboutModalTitle: "Tentang Hanazar Games",
    aboutVersionTitle: "Versi",
    aboutSummary: "Hanazar Software · Hak dan sumber terbuka",
    settingsModalTitle: "Pengaturan Game",
    settingsGeneralTitle: "Dasar",
    settingsAnimationTitle: "Animasi",
    settingsSummary: (enabled, total) => `${enabled}/${total} aktif`,
    animationSpeedLabel: "Kecepatan Animasi",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Kehalusan Kamera",
    cameraSmoothnessCopy: "0% berarti tampilan langsung mengikuti mouse. 100% berarti kehalusan maksimum.",
    cameraSmoothnessShort: (value) => `Halus ${value}`,
    dragSensitivityLabel: "Sensitivitas Drag Mouse",
    dragSensitivityCopy: "Atur sensitivitas drag mouse saat memutar kamera. 1 lebih tenang dan 10 paling sensitif.",
    resetDefaultsTitle: "Pulihkan Semua",
    resetDefaultsAction: "Pulihkan",
    optionOn: "Aktif",
    optionOff: "Nonaktif",
  },
  tr: {
    announcementsTitle: "Duyurular",
    announcementsModalTitle: "Güncelleme Duyurusu",
    presetTitle: "Ön Ayarlar",
    presetModalTitle: "Ön Ayarlar",
    presetProfessionalLabel: "Profesyonel Mod",
    presetEntertainmentLabel: "Eğlence Modu",
    presetCustomLabel: "Özel",
    presetProfessionalMeta: "Dış çerçeve · 3x kenar · Professional",
    presetEntertainmentMeta: "Varsayılan · varsayılan kısayollar",
    presetCustomMeta: "Geçerli özel düzen",
    shortcutsTitle: "Kısayollar",
    shortcutsModalTitle: "Kısayol Ayarları",
    aboutTitle: "Hakkında",
    aboutModalTitle: "Hanazar Games Hakkında",
    aboutVersionTitle: "Sürüm",
    aboutSummary: "Hanazar Software · Haklar ve açık kaynak",
    settingsModalTitle: "Oyun Ayarları",
    settingsGeneralTitle: "Temel",
    settingsAnimationTitle: "Animasyon",
    settingsSummary: (enabled, total) => `${enabled}/${total} açık`,
    animationSpeedLabel: "Animasyon Hızı",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Kamera Akıcılığı",
    cameraSmoothnessCopy: "0% görünümün fareyi anında takip etmesini sağlar. 100% en yüksek yumuşatma seviyesidir.",
    cameraSmoothnessShort: (value) => `Akıcılık ${value}`,
    dragSensitivityLabel: "Fare Sürükleme Hassasiyeti",
    dragSensitivityCopy: "Kamerayı döndürürken fare sürükleme hassasiyetini ayarlar. 1 daha sakin, 10 en hassas seviyedir.",
    resetDefaultsTitle: "Tümünü Sıfırla",
    resetDefaultsAction: "Sıfırla",
    optionOn: "Açık",
    optionOff: "Kapalı",
  },
  vi: {
    announcementsTitle: "Thông báo",
    announcementsModalTitle: "Thông báo Cập nhật",
    presetTitle: "Thiết lập sẵn",
    presetModalTitle: "Thiết lập sẵn",
    presetProfessionalLabel: "Chế độ Chuyên nghiệp",
    presetEntertainmentLabel: "Chế độ Giải trí",
    presetCustomLabel: "Tùy chỉnh",
    presetProfessionalMeta: "Khung ngoài · viền 3x · Professional",
    presetEntertainmentMeta: "Mặc định · phím mặc định",
    presetCustomMeta: "Thiết lập tùy chỉnh hiện tại",
    shortcutsTitle: "Phím tắt",
    shortcutsModalTitle: "Phím tắt",
    aboutTitle: "Giới thiệu",
    aboutModalTitle: "Về Hanazar Games",
    aboutVersionTitle: "Phiên bản",
    aboutSummary: "Hanazar Software · Bản quyền và mã nguồn mở",
    settingsModalTitle: "Cài đặt Trò chơi",
    settingsGeneralTitle: "Cơ bản",
    settingsAnimationTitle: "Hoạt ảnh",
    settingsSummary: (enabled, total) => `${enabled}/${total} bật`,
    animationSpeedLabel: "Tốc độ Hoạt ảnh",
    animationSpeedShort: (speed) => `Anim ${speed}`,
    cameraSmoothnessLabel: "Độ mượt Camera",
    cameraSmoothnessCopy: "0% nghĩa là góc nhìn theo chuột ngay lập tức. 100% là mức mượt tối đa.",
    cameraSmoothnessShort: (value) => `Mượt ${value}`,
    dragSensitivityLabel: "Độ Nhạy Kéo Chuột",
    dragSensitivityCopy: "Điều chỉnh độ nhạy khi kéo chuột để xoay camera. 1 ổn định hơn, 10 nhạy nhất.",
    resetDefaultsTitle: "Khôi phục Mặc định",
    resetDefaultsAction: "Khôi phục",
    optionOn: "Bật",
    optionOff: "Tắt",
  },
  th: {
    announcementsTitle: "ประกาศ",
    announcementsModalTitle: "ประกาศอัปเดต",
    presetTitle: "พรีเซ็ต",
    presetModalTitle: "พรีเซ็ต",
    presetProfessionalLabel: "โหมดมืออาชีพ",
    presetEntertainmentLabel: "โหมดบันเทิง",
    presetCustomLabel: "กำหนดเอง",
    presetProfessionalMeta: "กรอบนอก · เส้นขอบ 3x · Professional",
    presetEntertainmentMeta: "ค่าเริ่มต้น · ปุ่มลัดเริ่มต้น",
    presetCustomMeta: "การตั้งค่าแบบกำหนดเอง",
    shortcutsTitle: "ปุ่มลัด",
    shortcutsModalTitle: "การตั้งค่าปุ่มลัด",
    aboutTitle: "เกี่ยวกับ",
    aboutModalTitle: "เกี่ยวกับ Hanazar Games",
    aboutVersionTitle: "เวอร์ชัน",
    aboutSummary: "Hanazar Software · สิทธิ์และโอเพนซอร์ส",
    settingsModalTitle: "การตั้งค่าเกม",
    settingsGeneralTitle: "พื้นฐาน",
    settingsAnimationTitle: "แอนิเมชัน",
    settingsSummary: (enabled, total) => `เปิด ${enabled}/${total}`,
    animationSpeedLabel: "ความเร็วแอนิเมชัน",
    animationSpeedShort: (speed) => `แอนิ ${speed}`,
    cameraSmoothnessLabel: "ความลื่นของกล้อง",
    cameraSmoothnessCopy: "0% คือมุมมองตามเมาส์ทันที ส่วน 100% คือความลื่นสูงสุด",
    cameraSmoothnessShort: (value) => `ลื่น ${value}`,
    dragSensitivityLabel: "ความไวการลากเมาส์",
    dragSensitivityCopy: "ปรับความไวของการลากเมาส์ขณะหมุนกล้อง 1 นิ่งกว่า และ 10 ไวที่สุด",
    resetDefaultsTitle: "คืนค่าเริ่มต้นทั้งหมด",
    resetDefaultsAction: "คืนค่าเริ่มต้น",
    optionOn: "เปิด",
    optionOff: "ปิด",
  },
};

const container = document.getElementById("canvas-container");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const menuToggle = document.getElementById("menu-toggle");
const restartBtn = document.getElementById("restart");
const openAnnouncementsTopBtn = document.getElementById("open-announcements-top");
const hintEl = document.getElementById("hint-text");
const toastEl = document.getElementById("toast");
const settingsPanel = document.getElementById("settings-panel");
const settingsBackdrop = document.getElementById("settings-backdrop");
const settingsClose = document.getElementById("settings-close");
const openRulesBtn = document.getElementById("open-rules");
const openAnnouncementsMenuBtn = document.getElementById("open-announcements-menu");
const openGameSettingsBtn = document.getElementById("open-game-settings");
const openPresetBtn = document.getElementById("open-preset");
const openStylePickerBtn = document.getElementById("open-style-picker");
const openLanguagePickerBtn = document.getElementById("open-language-picker");
const openShortcutsBtn = document.getElementById("open-shortcuts");
const openAboutBtn = document.getElementById("open-about");
const splashScreen = document.getElementById("splash-screen");
const splashLoading = document.getElementById("splash-loading");
const enterGameBtn = document.getElementById("enter-game");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalActions = document.getElementById("modal-actions");
const modalCancel = document.getElementById("modal-cancel");
const modalConfirm = document.getElementById("modal-confirm");

let modalConfirmAction = null;
let modalCancelAction = null;
let splashReadyTimer = null;
let splashHideTimer = null;
let toastShowTimer = null;
let toastHideTimer = null;
let settingsCloseTimer = null;
let modalHideTimer = null;
let pendingKeybindingAction = null;
let shouldShowGuideAfterAnnouncement = false;
let modalEnterConfirmEnabled = false;

let scene;
let camera;
let renderer;
let controls;
let boardFrame;
let boardFrameMaterial;
let innerGridGroup;
let gridLineMaterial;
let trailGuideGroup;
let trailGuideMaterial;
let tileEdgeMaterial;
let tileEdgeGeometry;
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
  settings: loadSettings(),
  keybindings: loadKeybindings(),
  language: loadLanguage(),
  splashFinished: false,
};

initThree();
applySettings();
applyLanguage();
resetGame();
bindEvents();
animate();
startExperience();

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
  controls.enablePan = false;
  controls.minDistance = SIZE * 1.4;
  controls.maxDistance = SIZE * 3.3;
  controls.target.set(0, 0, 0);
  applyControlSensitivity();
  applyControlSmoothness();

  const ambient = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xf2d9b1, 0.65);
  dir.position.set(3, 6, 4);
  scene.add(dir);

  tileEdgeGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.95, 0.95, 0.95));
  addBoardFrame();
  addSubtleGrid();
  addTrailGuides();

  window.addEventListener("resize", onResize);
}

function addBoardFrame() {
  const size = SIZE * CELL_SIZE + BOARD_PADDING * 2;
  const geo = new THREE.BoxGeometry(size, size, size);
  const edges = new THREE.EdgesGeometry(geo);
  boardFrameMaterial = new THREE.LineBasicMaterial({
    color: 0xc9a66b,
    transparent: true,
    opacity: 0.55,
    linewidth: 1.5,
  });
  const line = new THREE.LineSegments(
    edges,
    boardFrameMaterial
  );
  boardFrame = line;
  scene.add(boardFrame);
}

function addSubtleGrid() {
  const group = new THREE.Group();
  gridLineMaterial = new THREE.LineBasicMaterial({
    color: 0xcbb79a,
    transparent: true,
    opacity: 0.35,
    linewidth: 1,
  });
  const half = (SIZE - 1) * CELL_SIZE * 0.5;
  for (let i = 1; i < SIZE; i++) {
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
      const line = new THREE.Line(geo, gridLineMaterial);
      group.add(line);
    });
  }
  innerGridGroup = group;
  scene.add(innerGridGroup);
}

function addTrailGuides() {
  const group = new THREE.Group();
  trailGuideMaterial = new THREE.LineBasicMaterial({
    color: 0xcbb79a,
    transparent: true,
    opacity: 0.24,
    linewidth: 1,
  });
  const half = (SIZE - 1) * CELL_SIZE * 0.5;
  const paths = [
    [new THREE.Vector3(-half, 0, 0), new THREE.Vector3(half, 0, 0)],
    [new THREE.Vector3(0, -half, 0), new THREE.Vector3(0, half, 0)],
    [new THREE.Vector3(0, 0, -half), new THREE.Vector3(0, 0, half)],
  ];
  paths.forEach((points) => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geo, trailGuideMaterial));
  });
  trailGuideGroup = group;
  scene.add(trailGuideGroup);
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
  tileMeshes.forEach((mesh) => {
    scene.remove(mesh);
    disposeTileMesh(mesh);
  });
  tileMeshes.clear();
  activeAnimations = [];
  addRandomTile(state);
  addRandomTile(state);
  updateUI();
  renderTilesImmediate();
  hideModal();
}

function bindEvents() {
  restartBtn.addEventListener("click", requestRestart);
  openAnnouncementsTopBtn.addEventListener("click", () => {
    showAnnouncementModal();
  });
  menuToggle.addEventListener("click", openSettingsPanel);
  settingsClose.addEventListener("click", closeSettingsPanel);
  settingsBackdrop.addEventListener("click", closeSettingsPanel);
  openRulesBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showRulesModal();
  });
  openAnnouncementsMenuBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showAnnouncementModal({ returnToMenu: true });
  });
  openGameSettingsBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showGameSettingsPickerModal();
  });
  openPresetBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showPresetModal();
  });
  openStylePickerBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showStylePickerModal();
  });
  openLanguagePickerBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showLanguagePickerModal();
  });
  openShortcutsBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showShortcutsModal();
  });
  openAboutBtn.addEventListener("click", () => {
    closeSettingsPanel();
    showAboutModal();
  });
  enterGameBtn.addEventListener("click", finishSplash);

  window.addEventListener("keydown", onKeyDown);
  modalBody.addEventListener("click", onModalBodyClick);
  modalBody.addEventListener("input", onModalBodyInput);
  modalBody.addEventListener("change", onModalBodyInput);

  modalCancel.addEventListener("click", () => {
    if (modalCancelAction) {
      modalCancelAction();
      return;
    }
    hideModal();
  });

  modalConfirm.addEventListener("click", () => {
    if (modalConfirmAction) {
      modalConfirmAction();
      return;
    }
    hideModal();
  });
}

function onKeyDown(e) {
  const key = normalizeBindingKey(e.key);

  if (pendingKeybindingAction) {
    e.preventDefault();
    if (key === "escape") {
      pendingKeybindingAction = null;
      showShortcutsModal();
      return;
    }
    if (key === "backspace" || key === "delete") {
      clearKeybinding(pendingKeybindingAction);
      pendingKeybindingAction = null;
      showToast(strings().toastShortcutCleared ?? strings().toastShortcutSaved);
      showShortcutsModal();
      return;
    }
    assignKeybinding(pendingKeybindingAction, key);
    pendingKeybindingAction = null;
    showToast(strings().toastShortcutSaved);
    showShortcutsModal();
    return;
  }

  if (key === "escape") {
    if (!modal.classList.contains("hidden")) {
      hideModal();
      return;
    }
    if (!settingsPanel.classList.contains("hidden")) {
      closeSettingsPanel();
      return;
    }
  }

  if (
    key === "enter" &&
    !modal.classList.contains("hidden") &&
    modalEnterConfirmEnabled &&
    typeof modalConfirmAction === "function"
  ) {
    e.preventDefault();
    modalConfirmAction();
    return;
  }

  const action = getActionForKey(key);
  if (!action) return;

  if (["moveLeft", "moveRight", "moveUp", "moveDown", "depthForward", "depthBack"].includes(action)) {
    if (isMoving || state.gameOver || isOverlayBlockingGame()) return;
    const dir = keyToDirection(action);
    if (!dir) return;
    e.preventDefault();
    handleMove(dir);
    return;
  }

  if (isOverlayBlockingGame()) return;

  e.preventDefault();
  switch (action) {
    case "openMenu":
      openSettingsPanel();
      return;
    case "restart":
      requestRestart();
      return;
    case "openRules":
      showRulesModal();
      return;
    case "openGameSettings":
      showGameSettingsPickerModal();
      return;
    case "openStyle":
      showStylePickerModal();
      return;
    case "openLanguage":
      showLanguagePickerModal();
      return;
    case "openShortcuts":
      showShortcutsModal();
      return;
    case "openAbout":
      showAboutModal();
      return;
    default:
      return;
  }
}

function normalizeBindingKey(key) {
  return key.length === 1 ? key.toLowerCase() : key.toLowerCase();
}

function getActionForKey(key) {
  return Object.entries(state.keybindings).find(([, value]) => value === key)?.[0] ?? null;
}

function keyToDirection(action) {
  const axes = computeViewAlignedAxes();
  switch (action) {
    case "moveLeft":
      return negateAxis(axes.right);
    case "moveRight":
      return axes.right;
    case "moveUp":
      return axes.up;
    case "moveDown":
      return negateAxis(axes.up);
    case "depthForward":
      return axes.depth;
    case "depthBack":
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
    if (detectPresetMode() !== "professional") {
      showToast(strings().toastBlocked);
    }
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

function addRandomTile(gameState, transitions = []) {
  const empties = [];
  for (let x = 0; x < gameState.size; x++) {
    for (let y = 0; y < gameState.size; y++) {
      for (let z = 0; z < gameState.size; z++) {
        if (!gameState.grid[x][y][z]) empties.push({ x, y, z });
      }
    }
  }
  if (!empties.length) return;
  const spot = empties[Math.floor(Math.random() * empties.length)];
  const value = Math.random() < TILE_PROB_FOUR ? 4 : 2;
  const tile = { id: uid(), value };
  gameState.grid[spot.x][spot.y][spot.z] = tile;
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

    const duration = t.spawn ? getAnimationDuration(SPAWN_SCALE_DURATION) : getAnimationDuration(ANIM_DURATION);
    const fromPos = toWorldPosition(t.from);
    const toPos = toWorldPosition(t.to);
    activeAnimations.push({
      mesh,
      from: fromPos,
      to: toPos,
      start: now,
      duration,
      remove: t.remove,
      newValue: t.newValue,
      spawn: t.spawn,
    });
  });

  const longest = activeAnimations.length ? Math.max(...activeAnimations.map((a) => a.duration)) : 0;
  window.setTimeout(() => {
    isMoving = false;
    cleanupMeshes();
    checkGameState();
  }, longest + 20);
}

function cleanupMeshes() {
  tileMeshes.forEach((mesh, id) => {
    const exists = findTileById(state.grid, id);
    if (!exists) {
      scene.remove(mesh);
      disposeTileMesh(mesh);
      tileMeshes.delete(id);
      return;
    }
    const pos = findTilePos(state.grid, id);
    mesh.position.copy(toWorldPosition(pos));
    updateTileValue(mesh, exists.value);
  });
}

function findTileById(grid, id) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const tile = grid[x][y][z];
        if (tile && tile.id === id) return tile;
      }
    }
  }
  return null;
}

function findTilePos(grid, id) {
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const tile = grid[x][y][z];
        if (tile && tile.id === id) return { x, y, z };
      }
    }
  }
  return { x: 0, y: 0, z: 0 };
}

function renderTilesImmediate() {
  tileMeshes.forEach((mesh) => {
    scene.remove(mesh);
    disposeTileMesh(mesh);
  });
  tileMeshes.clear();
  for (let x = 0; x < state.size; x++) {
    for (let y = 0; y < state.size; y++) {
      for (let z = 0; z < state.size; z++) {
        const tile = state.grid[x][y][z];
        if (!tile) continue;
        const mesh = createTileMesh(tile.value, tile.id);
        mesh.position.copy(toWorldPosition({ x, y, z }));
        scene.add(mesh);
        tileMeshes.set(tile.id, mesh);
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
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
        disposeTileMesh(anim.mesh);
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
  if (!tileEdgeMaterial) {
    const palette = resolveTheme(state.settings.themeName, state.settings.themeTone);
    tileEdgeMaterial = new THREE.LineBasicMaterial({
      color: palette.tileEdgeColor,
      transparent: true,
      opacity: palette.tileEdgeOpacity,
    });
  }
  const edgeGroup = new THREE.Group();
  mesh.add(edgeGroup);
  mesh.userData.edgeGroup = edgeGroup;
  rebuildTileEdgeLines(mesh);
  return mesh;
}

function getTileEdgeLayerCount() {
  return Math.max(1, Math.min(8, Math.round(normalizeTileEdgeWidth(state.settings.tileEdgeWidth) * 1.6)));
}

function rebuildTileEdgeLines(mesh) {
  const group = mesh.userData.edgeGroup;
  if (!group) return;
  const layerCount = getTileEdgeLayerCount();
  while (group.children.length) {
    group.remove(group.children[0]);
  }
  for (let i = 0; i < layerCount; i++) {
    const edgeLines = new THREE.LineSegments(tileEdgeGeometry, tileEdgeMaterial);
    edgeLines.scale.setScalar(1 + i * 0.008);
    group.add(edgeLines);
  }
  group.visible = state.settings.tileEdgeHighlight;
}

function updateTileValue(mesh, value) {
  if (mesh.userData.value === value && mesh.userData.themeKey === getThemeKey()) return;
  disposeMaterial(mesh.material);
  mesh.userData.value = value;
  mesh.userData.themeKey = getThemeKey();
  mesh.material = makeTileMaterials(value);
}

function tileColor(value) {
  return getTileStyle(value).baseColor;
}

function makeTileMaterials(value) {
  const style = getTileStyle(value);
  const texture = createNumberTexture(value, style);
  const mat = new THREE.MeshPhongMaterial({
    map: texture,
    color: style.baseColor,
    shininess: style.shininess,
    specular: style.specular,
  });
  return [mat, mat, mat, mat, mat, mat];
}

function createNumberTexture(value, style = getTileStyle(value)) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = style.canvasOuter;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = style.canvasInner;
  ctx.fillRect(8, 8, size - 16, size - 16);
  ctx.fillStyle = style.textColor;
  const valueText = value.toString();
  const fontSize = fitNumberFontSize(ctx, valueText, size - 54);
  ctx.font = `bold ${fontSize}px 'Avenir Next', 'Noto Sans SC', sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(valueText, size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy?.() ?? 1;
  texture.needsUpdate = true;
  return texture;
}

function fitNumberFontSize(ctx, text, maxWidth) {
  let size = 124;
  while (size > 44) {
    ctx.font = `bold ${size}px 'Avenir Next', 'Noto Sans SC', sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }
    size -= 4;
  }
  return 44;
}

function getTileStyle(value) {
  const palette = resolveTheme(state.settings.themeName, state.settings.themeTone);
  const accent = new THREE.Color(palette.accent);
  const accentStrong = new THREE.Color(palette.accentStrong);
  const hsl = { h: 0, s: 0, l: 0 };
  accent.getHSL(hsl);

  const level = Math.max(0, Math.log2(value) - 1);
  const capped = Math.min(level, 10);
  const t = capped / 10;
  const isDarkTone = palette.tone === "dark";
  const hueShift = (hsl.h + (isDarkTone ? -0.02 : 0.02) * t + 1) % 1;
  const saturation = THREE.MathUtils.clamp(hsl.s + (isDarkTone ? 0.1 : 0.06) + t * 0.18, 0.18, 0.9);
  const lightness = isDarkTone
    ? THREE.MathUtils.clamp(0.92 - t * 0.54, 0.26, 0.9)
    : THREE.MathUtils.clamp(0.92 - t * 0.46, 0.24, 0.92);

  const base = new THREE.Color().setHSL(hueShift, saturation, lightness);
  const outer = new THREE.Color().setHSL(
    hueShift,
    Math.max(0.08, saturation * 0.22),
    isDarkTone ? Math.min(0.28 + t * 0.06, 0.4) : 0.96
  );
  const inner = base.clone().lerp(accentStrong, THREE.MathUtils.clamp(0.18 + t * 0.42, 0.18, 0.62));
  const luminance = 0.2126 * base.r + 0.7152 * base.g + 0.0722 * base.b;
  const textColor = luminance > 0.58 ? "#2a1c12" : "#fff7ed";

  return {
    baseColor: base.getHex(),
    specular: accentStrong.getHex(),
    shininess: isDarkTone ? 42 : 30,
    textColor,
    canvasOuter: `#${outer.getHexString()}`,
    canvasInner: `#${inner.getHexString()}`,
  };
}

function refreshTileAppearance() {
  tileMeshes.forEach((mesh) => {
    updateTileValue(mesh, mesh.userData.value);
  });
}

function getThemeKey() {
  return `${state.settings.themeName}:${state.settings.themeTone}`;
}

function disposeTileMesh(mesh) {
  disposeMaterial(mesh.material);
  mesh.geometry.dispose();
}

function disposeMaterial(material) {
  const list = Array.isArray(material) ? material : [material];
  const seen = new Set();
  list.forEach((entry) => {
    if (!entry || seen.has(entry)) return;
    seen.add(entry);
    if (entry.map) entry.map.dispose();
    entry.dispose();
  });
}

function uid() {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
  } catch (e) {
    // Ignore.
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
    console.warn("Unable to save best score", e);
  }
}

function loadBest() {
  try {
    const value = localStorage.getItem(BEST_KEY);
    return value ? Number(value) : 0;
  } catch (e) {
    return 0;
  }
}

function showToast(message) {
  window.clearTimeout(toastShowTimer);
  window.clearTimeout(toastHideTimer);
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  requestAnimationFrame(() => {
    toastEl.classList.add("show");
    toastShowTimer = window.setTimeout(() => {
      toastEl.classList.remove("show");
      toastHideTimer = window.setTimeout(() => {
        toastEl.classList.add("hidden");
      }, 240);
    }, 1000);
  });
}

function checkGameState() {
  if (!state.won && getMaxTile(state.grid) >= 2048) {
    state.won = true;
    showWinModal();
    return;
  }
  if (!hasMoves(state.grid)) {
    state.gameOver = true;
    showGameOverModal();
  }
}

function showGameOverModal() {
  openModal({
    title: strings().gameOverTitle,
    bodyHtml: strings().gameOverBody(state.score, state.best),
    confirmText: strings().gameOverConfirm,
    cancelText: strings().gameOverCancel,
    showCancel: true,
    onConfirm: () => {
      resetGame();
    },
  });
}

function showWinModal() {
  openModal({
    title: strings().winTitle,
    bodyHtml: strings().winBody,
    confirmText: strings().winConfirm,
    cancelText: strings().winCancel,
    showCancel: true,
    onConfirm: () => {
      hideModal();
    },
    onCancel: () => {
      resetGame();
    },
  });
}

function showRulesModal() {
  openModal({
    title: strings().rulesModalTitle,
    bodyHtml: strings().rulesModalBody,
    confirmText: strings().rulesModalConfirm,
    cancelText: strings().rulesModalCancel,
    showCancel: true,
    onConfirm: () => hideModal(),
    onCancel: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showAnnouncementModal({ auto = false, returnToMenu = false } = {}) {
  const text = strings();
  const finishAnnouncement = () => {
    if (!hasSeenAnnouncement()) {
      markAnnouncementSeen();
    }
    hideModal();
    if (returnToMenu) {
      openSettingsPanel();
      return;
    }
    if (shouldShowGuideAfterAnnouncement && !hasSeenGuide()) {
      shouldShowGuideAfterAnnouncement = false;
      window.setTimeout(() => {
        showGuideModal();
      }, 180);
      return;
    }
    shouldShowGuideAfterAnnouncement = false;
  };

  openModal({
    title: text.announcementsModalTitle ?? text.announcementsTitle ?? "Announcements",
    bodyHtml: text.announcementsBody ?? "",
    confirmText: text.announcementsConfirm ?? text.modalClose,
    showCancel: false,
    allowEnterConfirm: true,
    onConfirm: finishAnnouncement,
  });

  if (auto) {
    shouldShowGuideAfterAnnouncement = !hasSeenGuide();
  }
}

function showGameSettingsPickerModal() {
  const text = strings();
  openModal({
    title: text.settingsModalTitle ?? text.gameSettingsTitle,
    bodyHtml: buildGameSettingsModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showPresetModal() {
  const text = strings();
  openModal({
    title: text.presetModalTitle ?? text.presetTitle ?? "Presets",
    bodyHtml: buildPresetModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showStylePickerModal() {
  const text = strings();
  openModal({
    title: text.styleModalTitle ?? text.styleTitle,
    bodyHtml: buildStyleModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showLanguagePickerModal() {
  const text = strings();
  openModal({
    title: text.languageModalTitle ?? text.languageTitle,
    bodyHtml: buildLanguageModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showShortcutsModal() {
  const text = strings();
  openModal({
    title: text.shortcutsModalTitle ?? text.shortcutsTitle ?? "Shortcuts",
    bodyHtml: buildShortcutsModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      pendingKeybindingAction = null;
      hideModal();
      openSettingsPanel();
    },
  });
}

function showAboutModal() {
  const text = strings();
  openModal({
    title: text.aboutModalTitle ?? text.aboutTitle ?? "About",
    bodyHtml: buildAboutModalBody(text),
    confirmText: text.modalBackMenu ?? text.modalClose,
    showCancel: false,
    onConfirm: () => {
      hideModal();
      openSettingsPanel();
    },
  });
}

function showGuideModal() {
  openModal({
    title: strings().guideTitle,
    bodyHtml: strings().guideBody,
    confirmText: strings().guideConfirm,
    showCancel: false,
    onConfirm: () => {
      markGuideSeen();
      hideModal();
    },
  });
}

function requestRestart() {
  if (!state.settings.confirmRestart) {
    resetGame();
    showToast(strings().toastRestarted);
    return;
  }
  openModal({
    title: strings().restartConfirmTitle,
    bodyHtml: strings().restartConfirmBody(state.score),
    confirmText: strings().restartConfirmConfirm,
    cancelText: strings().restartConfirmCancel,
    showCancel: true,
    allowEnterConfirm: true,
    onConfirm: () => {
      resetGame();
      showToast(strings().toastRestarted);
    },
  });
}

function onModalBodyClick(event) {
  const button = event.target.closest("[data-modal-action]");
  if (!button) return;
  event.preventDefault();

  const action = button.dataset.modalAction;
  if (action === "setting") {
    updateSetting(button.dataset.setting, button.dataset.value === "true");
    showGameSettingsPickerModal();
    return;
  }

  if (action === "reset-defaults") {
    showResetDefaultsConfirm();
    return;
  }

  if (action === "preset") {
    applyPreset(button.dataset.preset);
    showPresetModal();
    return;
  }

  if (action === "tone") {
    updateSetting("themeTone", button.dataset.tone === "dark" ? "dark" : "light");
    showStylePickerModal();
    return;
  }

  if (action === "theme") {
    if (!THEME_LIBRARY[button.dataset.theme]) return;
    updateSetting("themeName", button.dataset.theme);
    showStylePickerModal();
    return;
  }

  if (action === "style-setting") {
    updateSetting(button.dataset.setting, button.dataset.value === "true");
    showStylePickerModal();
    return;
  }

  if (action === "capture-binding") {
    pendingKeybindingAction = button.dataset.binding;
    showShortcutsModal();
    return;
  }

  if (action === "helper-toggle") {
    if (!HELPER_LINE_MODES.includes(button.dataset.mode)) return;
    state.settings.helperLines = {
      ...state.settings.helperLines,
      [button.dataset.mode]: !state.settings.helperLines[button.dataset.mode],
    };
    saveSettings(state.settings);
    applySettings();
    showStylePickerModal();
    return;
  }

  if (action === "language") {
    if (!STRINGS[button.dataset.lang]) return;
    setLanguage(button.dataset.lang);
    showLanguagePickerModal();
    return;
  }

  if (action === "about-link") {
    const href = button.dataset.href;
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }
}

function onModalBodyInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;

  if (target.type === "number" && target.value.trim() === "") {
    return;
  }

  if (target.dataset.modalInput === "animation-speed") {
    const normalized = normalizeAnimationSpeed(target.value);
    state.settings.animationSpeed = normalized;
    saveSettings(state.settings);
    updateMenuSummaries();
    syncAnimationSpeedControls(normalized, target);
    return;
  }

  if (target.dataset.modalInput === "camera-smoothness") {
    const normalized = normalizeCameraSmoothness(target.value);
    state.settings.cameraSmoothness = normalized;
    saveSettings(state.settings);
    applyControlSmoothness();
    updateMenuSummaries();
    syncCameraSmoothnessControls(normalized, target);
    return;
  }

  if (target.dataset.modalInput === "drag-sensitivity") {
    const normalized = normalizeDragSensitivity(target.value);
    state.settings.dragSensitivity = normalized;
    saveSettings(state.settings);
    applyControlSensitivity();
    syncDragSensitivityControls(normalized, target);
    return;
  }

  if (target.dataset.modalInput === "tile-edge-width") {
    const normalized = normalizeTileEdgeWidth(target.value);
    state.settings.tileEdgeWidth = normalized;
    saveSettings(state.settings);
    syncTileEdgeWidthControls(normalized, target);
    updateTileEdgeVisibility();
  }
}

function openModal({
  title,
  bodyHtml,
  confirmText,
  cancelText = "",
  showCancel = true,
  allowEnterConfirm = false,
  onConfirm = () => hideModal(),
  onCancel = () => hideModal(),
}) {
  window.clearTimeout(modalHideTimer);
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;
  modalConfirm.textContent = confirmText;
  modalCancel.textContent = cancelText;
  modalCancel.style.display = showCancel ? "inline-flex" : "none";
  modalActions.style.justifyContent = showCancel ? "flex-end" : "center";
  modal.classList.remove("hidden");
  requestAnimationFrame(() => {
    modal.classList.add("open");
  });
  modalConfirmAction = onConfirm;
  modalCancelAction = showCancel ? onCancel : null;
  modalEnterConfirmEnabled = allowEnterConfirm;
}

function hideModal() {
  modal.classList.remove("open");
  modalConfirmAction = null;
  modalCancelAction = null;
  modalEnterConfirmEnabled = false;
  pendingKeybindingAction = null;
  modalCancel.style.display = "inline-flex";
  modalActions.style.justifyContent = "flex-end";
  window.clearTimeout(modalHideTimer);
  modalHideTimer = window.setTimeout(() => {
    modal.classList.add("hidden");
  }, 240);
}

function getMaxTile(grid) {
  let max = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      for (let z = 0; z < grid.length; z++) {
        const tile = grid[x][y][z];
        if (tile && tile.value > max) max = tile.value;
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
        const tile = grid[x][y][z];
        if (!tile) return true;
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
          const neighbor = grid[nx][ny][nz];
          if (!neighbor || neighbor.value === tile.value) return true;
        }
      }
    }
  }
  return false;
}

function onResize() {
  const width = container.clientWidth;
  const height = Math.max(container.clientHeight, 1);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function startExperience() {
  if (!state.settings.showSplash) {
    state.splashFinished = true;
    splashScreen.classList.add("hidden");
    if (!hasSeenAnnouncement()) {
      window.setTimeout(() => {
        showAnnouncementModal({ auto: true });
      }, 120);
      return;
    }
    if (!hasSeenGuide()) {
      window.setTimeout(() => {
        showGuideModal();
      }, 120);
    }
    return;
  }

  document.body.classList.add("app-locked");
  splashScreen.classList.remove("hidden");
  requestAnimationFrame(() => {
    splashScreen.classList.add("active");
  });

  splashReadyTimer = window.setTimeout(() => {
    splashScreen.classList.add("ready");
    splashLoading.textContent = strings().splashReady;
  }, state.settings.reducedMotion ? 500 : 1400);

  splashHideTimer = window.setTimeout(() => {
    finishSplash();
  }, state.settings.reducedMotion ? 1100 : 2600);
}

function finishSplash() {
  if (state.splashFinished) return;
  state.splashFinished = true;
  window.clearTimeout(splashReadyTimer);
  window.clearTimeout(splashHideTimer);
  splashScreen.classList.add("ready", "leaving");
  splashLoading.textContent = strings().splashReady;
  document.body.classList.remove("app-locked");
  window.setTimeout(() => {
    splashScreen.classList.add("hidden");
  }, 420);
  if (!hasSeenAnnouncement()) {
    window.setTimeout(() => {
      showAnnouncementModal({ auto: true });
    }, 260);
    return;
  }
  if (!hasSeenGuide()) {
    window.setTimeout(() => {
      showGuideModal();
    }, 260);
  }
}

function openSettingsPanel() {
  if (!state.splashFinished) return;
  window.clearTimeout(settingsCloseTimer);
  settingsBackdrop.classList.remove("hidden");
  settingsPanel.classList.remove("hidden");
  requestAnimationFrame(() => {
    settingsBackdrop.classList.add("open");
    settingsPanel.classList.add("open");
  });
}

function closeSettingsPanel() {
  settingsBackdrop.classList.remove("open");
  settingsPanel.classList.remove("open");
  window.clearTimeout(settingsCloseTimer);
  settingsCloseTimer = window.setTimeout(() => {
    settingsBackdrop.classList.add("hidden");
    settingsPanel.classList.add("hidden");
  }, 340);
}

function updateSetting(key, value) {
  state.settings[key] = value;
  saveSettings(state.settings);
  applySettings();
}

function applySettings() {
  document.body.classList.toggle("hints-hidden", !state.settings.showHints);
  hintEl.style.display = state.settings.showHints ? "" : "none";
  updateMenuSummaries();
  applyControlSensitivity();
  applyControlSmoothness();
  applyTheme();
}

function applyTheme() {
  const palette = resolveTheme(state.settings.themeName, state.settings.themeTone);
  document.body.dataset.theme = state.settings.themeName;
  document.body.dataset.tone = state.settings.themeTone;

  Object.entries(palette.css).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });

  if (scene) {
    scene.background = new THREE.Color(palette.sceneBg);
  }
  if (boardFrameMaterial) {
    boardFrameMaterial.color.set(palette.frameColor);
    boardFrameMaterial.opacity = palette.helperOuterOpacity;
  }
  if (gridLineMaterial) {
    gridLineMaterial.color.set(palette.gridColor);
    gridLineMaterial.opacity = palette.helperInnerOpacity;
  }
  if (trailGuideMaterial) {
    trailGuideMaterial.color.set(palette.gridColor);
    trailGuideMaterial.opacity = palette.helperTrailOpacity;
  }
  if (tileEdgeMaterial) {
    tileEdgeMaterial.color.set(palette.tileEdgeColor);
    tileEdgeMaterial.opacity = palette.tileEdgeOpacity;
  }
  applyHelperLineVisibility();
  updateTileEdgeVisibility();
  refreshTileAppearance();
}

function applyHelperLineVisibility() {
  const lines = state.settings.helperLines;
  if (boardFrame) boardFrame.visible = Boolean(lines.outer);
  if (innerGridGroup) innerGridGroup.visible = Boolean(lines.inner);
  if (trailGuideGroup) trailGuideGroup.visible = Boolean(lines.trail);
}

function updateTileEdgeVisibility() {
  tileMeshes.forEach((mesh) => {
    rebuildTileEdgeLines(mesh);
  });
}

function resolveTheme(themeName, tone) {
  const safeTheme = THEME_LIBRARY[themeName] ? themeName : "original";
  const safeTone = tone === "dark" ? "dark" : "light";
  const accentSet = THEME_LIBRARY[safeTheme][safeTone];
  const shared =
    safeTone === "dark"
      ? {
          "--bg": "#17120d",
          "--bg-deep": "#261d15",
          "--panel": "rgba(33, 26, 21, 0.84)",
          "--panel-strong": "rgba(40, 31, 25, 0.96)",
          "--text": "#f3e7d7",
          "--muted": "#c7b198",
          "--line": "rgba(255, 232, 204, 0.22)",
          "--shadow": "0 24px 80px rgba(0, 0, 0, 0.34)",
          "--shadow-soft": "0 14px 36px rgba(0, 0, 0, 0.26)",
          "--page-glow-soft": "rgba(255, 255, 255, 0.05)",
          "--page-bg-start": "#1b1510",
          "--page-bg-end": "#0d0906",
          "--canvas-top-light": "rgba(255, 255, 255, 0.04)",
          "--canvas-bg-start": "rgba(25, 20, 16, 0.74)",
          "--canvas-bg-end": "rgba(12, 9, 7, 0.92)",
          "--toast-bg-start": "rgba(36, 28, 22, 0.96)",
          "--toast-bg-end": "rgba(24, 18, 14, 0.98)",
          "--toast-shadow": "0 20px 46px rgba(0, 0, 0, 0.3)",
          "--overlay-bg": "rgba(4, 3, 2, 0.56)",
          "--shell-start": "rgba(30, 23, 19, 0.98)",
          "--shell-end": "rgba(19, 15, 12, 0.98)",
          "--shell-border": "rgba(255, 232, 204, 0.18)",
          "--rule-hero-start": "rgba(42, 33, 27, 0.96)",
          "--rule-hero-end": "rgba(29, 23, 18, 0.98)",
          "--rule-card-bg": "rgba(34, 27, 22, 0.9)",
          "--keycap-start": "#3a2e25",
          "--keycap-end": "#241b15",
          "--callout-end": "rgba(255, 255, 255, 0.02)",
          "--splash-bg-start": "#100c08",
          "--splash-bg-end": "#050303",
          "--splash-text": "#f8eedf",
          "--splash-muted-strong": "rgba(248, 238, 223, 0.72)",
          "--splash-muted": "rgba(248, 238, 223, 0.82)",
          "--progress-track": "rgba(255, 248, 236, 0.12)",
          "--button-text": "#fffaf2",
          "--surface-elevated-start": "rgba(63, 49, 39, 0.94)",
          "--surface-elevated-end": "rgba(39, 31, 24, 0.98)",
          "--surface-muted-start": "rgba(83, 66, 53, 0.82)",
          "--surface-muted-end": "rgba(57, 43, 34, 0.9)",
          "--field-bg": "rgba(26, 20, 16, 0.94)",
        }
      : {
          "--bg": "#f4edde",
          "--bg-deep": "#eadcc1",
          "--panel": "rgba(255, 250, 240, 0.84)",
          "--panel-strong": "rgba(255, 248, 235, 0.96)",
          "--text": "#352618",
          "--muted": "#7d6650",
          "--line": "rgba(57, 38, 18, 0.18)",
          "--shadow": "0 24px 80px rgba(70, 43, 14, 0.14)",
          "--shadow-soft": "0 14px 36px rgba(82, 53, 24, 0.12)",
          "--page-glow-soft": "rgba(255, 255, 255, 0.9)",
          "--page-bg-start": "#f8f1e3",
          "--page-bg-end": "#efe4cd",
          "--canvas-top-light": "rgba(255, 255, 255, 0.8)",
          "--canvas-bg-start": "rgba(255, 251, 244, 0.7)",
          "--canvas-bg-end": "rgba(243, 236, 224, 0.86)",
          "--toast-bg-start": "rgba(255, 248, 235, 0.96)",
          "--toast-bg-end": "rgba(248, 234, 208, 0.98)",
          "--toast-shadow": "0 18px 42px rgba(101, 66, 28, 0.18)",
          "--overlay-bg": "rgba(43, 28, 13, 0.3)",
          "--shell-start": "rgba(255, 250, 243, 0.98)",
          "--shell-end": "rgba(248, 238, 221, 0.98)",
          "--shell-border": "rgba(116, 81, 39, 0.12)",
          "--rule-hero-start": "rgba(255, 250, 241, 0.95)",
          "--rule-hero-end": "rgba(247, 237, 219, 0.98)",
          "--rule-card-bg": "rgba(255, 252, 246, 0.9)",
          "--keycap-start": "#fff8ea",
          "--keycap-end": "#efdfbf",
          "--callout-end": "rgba(255, 255, 255, 0.02)",
          "--splash-bg-start": "#2f1f14",
          "--splash-bg-end": "#191007",
          "--splash-text": "#fff6e9",
          "--splash-muted-strong": "rgba(255, 242, 224, 0.72)",
          "--splash-muted": "rgba(255, 242, 224, 0.8)",
          "--progress-track": "rgba(255, 244, 224, 0.12)",
          "--button-text": "#fff9f0",
          "--surface-elevated-start": "rgba(255, 252, 247, 0.96)",
          "--surface-elevated-end": "rgba(244, 234, 216, 0.94)",
          "--surface-muted-start": "rgba(239, 231, 218, 0.94)",
          "--surface-muted-end": "rgba(227, 217, 201, 0.94)",
          "--field-bg": "rgba(255, 250, 242, 0.96)",
        };

  return {
    css: {
      ...shared,
      "--accent": accentSet.accent,
      "--accent-strong": accentSet.accentStrong,
      "--accent-deep": accentSet.accentDeep,
      "--accent-soft": safeTone === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.16)",
      "--accent-glow": safeTone === "dark" ? "rgba(255, 255, 255, 0.24)" : "rgba(255, 255, 255, 0.18)",
      "--page-glow-accent": accentSet.pageGlowAccent,
      "--canvas-glow": accentSet.canvasGlow,
      "--rule-hero-glow": accentSet.pageGlowAccent,
      "--keycap-border": safeTone === "dark" ? "rgba(255, 255, 255, 0.14)" : "rgba(57, 38, 18, 0.18)",
      "--callout-start": accentSet.pageGlowAccent,
      "--splash-radial": accentSet.pageGlowAccent,
      "--splash-glow": accentSet.pageGlowAccent,
      "--progress-start": accentSet.accent,
      "--progress-end": accentSet.accentDeep,
      "--button-shadow":
        safeTone === "dark"
          ? "0 14px 32px rgba(0, 0, 0, 0.32)"
          : "0 14px 32px rgba(97, 63, 24, 0.24)",
      "--button-shadow-hover":
        safeTone === "dark"
          ? "0 18px 40px rgba(0, 0, 0, 0.38)"
          : "0 18px 36px rgba(97, 63, 24, 0.28)",
      "--hover-border": safeTone === "dark" ? "rgba(255, 255, 255, 0.24)" : "rgba(57, 38, 18, 0.24)",
      "--accent-border": safeTone === "dark" ? "rgba(255, 255, 255, 0.18)" : "rgba(57, 38, 18, 0.18)",
      "--accent-ring": safeTone === "dark" ? "rgba(255, 255, 255, 0.12)" : accentSet.pageGlowAccent,
    },
    accent: accentSet.accent,
    accentStrong: accentSet.accentStrong,
    sceneBg: accentSet.sceneBg,
    frameColor: accentSet.frameColor,
    gridColor: accentSet.gridColor,
    tileEdgeColor: safeTone === "dark" ? accentSet.accentDeep : "#18120d",
    tileEdgeOpacity: safeTone === "dark" ? 0.88 : 0.52,
    helperOuterOpacity: safeTone === "dark" ? 0.72 : 0.55,
    helperInnerOpacity: safeTone === "dark" ? 0.34 : 0.35,
    helperTrailOpacity: safeTone === "dark" ? 0.48 : 0.3,
    tone: safeTone,
  };
}

function setLanguage(lang) {
  if (!STRINGS[lang]) return;
  state.language = lang;
  saveLanguage(lang);
  applyLanguage();
  showToast(strings().toastLanguage);
}

function applyLanguage() {
  const text = strings();
  document.documentElement.lang = text.htmlLang;
  document.title = text.documentTitle;

  setText("brand-eyebrow", text.brandEyebrow);
  setText("brand-title", text.brandTitle);
  setText("menu-toggle", text.menuButton);
  setText("score-label", text.scoreLabel);
  setText("best-label", text.bestLabel);
  setText("restart", text.restart);
  setText("hint-text", text.hint);
  setText("menu-kicker", text.menuKicker);
  setText("menu-title", text.menuTitle);
  setText("section-rules-title", text.rulesTitle);
  setText("section-announcements-title", text.announcementsTitle ?? "Announcements");
  setText("section-settings-title", text.gameSettingsTitle);
  setText("section-preset-title", text.presetTitle ?? "Presets");
  setText("section-language-title", text.languageTitle);
  setText("section-shortcuts-title", text.shortcutsTitle ?? "Shortcuts");
  setText("section-style-title", text.styleTitle);
  setText("section-about-title", text.aboutTitle ?? "About");
  setText("splash-brand", text.splashBrand);
  setText("splash-title", getSplashTitle(text));
  setText("splash-tagline", text.splashTagline);
  setText("splash-loading", state.splashFinished ? text.splashReady : text.splashLoading);
  setText("enter-game", text.enterGame);
  setText("open-announcements-top", text.announcementsTitle ?? "Announcements");
  updateMenuSummaries();
}

function updateMenuSummaries() {
  const text = strings();
  setText("menu-rules-meta", text.rulesSummary);
  setText("menu-announcements-meta", text.announcementsSummary ?? `${APP_VERSION} · ${RELEASE_DATE}`);
  setText("menu-settings-meta", getSettingsSummary(text));
  setText("menu-preset-meta", getPresetSummary(text));
  setText(
    "menu-style-meta",
    `${getThemeLabel(state.settings.themeName, text)} · ${getToneLabel(state.settings.themeTone, text)} · ${getHelperLinesSummary(text)}`
  );
  setText("menu-language-meta", LANGUAGE_NATIVE_LABELS[state.language] ?? state.language);
  setText("menu-shortcuts-meta", getShortcutsSummary(text));
  setText("menu-about-meta", text.aboutSummary ?? "Hanazar Software");
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function getSettingsSummary(text = strings()) {
  const enabled = SETTINGS_CONFIG.reduce(
    (count, config) => count + (state.settings[config.key] ? 1 : 0),
    0
  );
  const base = typeof text.settingsSummary === "function"
    ? text.settingsSummary(enabled, SETTINGS_CONFIG.length)
    : `${enabled}/${SETTINGS_CONFIG.length}`;
  const speed = typeof text.animationSpeedShort === "function"
    ? text.animationSpeedShort(formatAnimationSpeed(state.settings.animationSpeed))
    : formatAnimationSpeed(state.settings.animationSpeed);
  const smoothness = typeof text.cameraSmoothnessShort === "function"
    ? text.cameraSmoothnessShort(formatCameraSmoothness(state.settings.cameraSmoothness))
    : formatCameraSmoothness(state.settings.cameraSmoothness);
  return `${base} · ${speed} · ${smoothness}`;
}

function getPresetLabel(mode, text = strings()) {
  if (mode === "professional") return text.presetProfessionalLabel ?? "Professional Mode";
  if (mode === "entertainment") return text.presetEntertainmentLabel ?? "Entertainment Mode";
  return text.presetCustomLabel ?? "Custom";
}

function getPresetSummary(text = strings()) {
  const mode = detectPresetMode();
  const label = getPresetLabel(mode, text);
  if (mode === "professional") {
    return `${label} · ${text.presetProfessionalMeta ?? "Outer frame · 3x edges · Professional"}`;
  }
  if (mode === "entertainment") {
    return `${label} · ${text.presetEntertainmentMeta ?? "Default setup · Default shortcuts"}`;
  }
  return `${label} · ${text.presetCustomMeta ?? "Current setup differs from presets"}`;
}

function getToneLabel(tone, text = strings()) {
  return tone === "dark" ? text.toneDark : text.toneLight;
}

function getThemeLabel(themeName, text = strings()) {
  const labelMap = {
    original: text.themeOriginal,
    crimson: text.themeCrimson,
    orange: text.themeOrange,
    green: text.themeGreen,
    cyan: text.themeCyan,
    blue: text.themeBlue,
    violet: text.themeViolet,
  };
  return labelMap[themeName] ?? labelMap.original ?? themeName;
}

function getHelperLineModeLabel(mode, text = strings()) {
  const labelMap = {
    outer: text.helperOuter,
    inner: text.helperInner,
    trail: text.helperTrail,
  };
  return labelMap[mode] ?? labelMap.outer ?? mode;
}

function getHelperLinesSummary(text = strings()) {
  const active = HELPER_LINE_MODES
    .filter((mode) => state.settings.helperLines[mode])
    .map((mode) => getHelperLineModeLabel(mode, text));
  return active.length ? active.join(" + ") : (text.helperOff ?? "Off");
}

function getShortcutsSummary(text = strings()) {
  return `${text.shortcutOpenMenu ?? "Menu"}: ${formatKeyLabel(state.keybindings.openMenu, text)} · ${text.shortcutRestart ?? "Restart"}: ${formatKeyLabel(state.keybindings.restart, text)}`;
}

function hasDefaultKeybindings(keybindings = state.keybindings) {
  return Object.entries(DEFAULT_KEYBINDINGS).every(([action, key]) => keybindings[action] === key);
}

function hasHelperLineState(expected, settings = state.settings) {
  return HELPER_LINE_MODES.every((mode) => Boolean(settings.helperLines[mode]) === Boolean(expected[mode]));
}

function detectPresetModeForState(settings = state.settings, keybindings = state.keybindings) {
  const edgeWidth = normalizeTileEdgeWidth(settings.tileEdgeWidth);
  const animationSpeed = normalizeAnimationSpeed(settings.animationSpeed);
  const cameraSmoothness = normalizeCameraSmoothness(settings.cameraSmoothness);
  const dragSensitivity = normalizeDragSensitivity(settings.dragSensitivity);
  const defaultEdgeWidth = normalizeTileEdgeWidth(DEFAULT_SETTINGS.tileEdgeWidth);
  const defaultAnimationSpeed = normalizeAnimationSpeed(DEFAULT_SETTINGS.animationSpeed);
  const defaultCameraSmoothness = normalizeCameraSmoothness(DEFAULT_SETTINGS.cameraSmoothness);
  const defaultDragSensitivity = normalizeDragSensitivity(DEFAULT_SETTINGS.dragSensitivity);

  if (
    settings.showHints === false &&
    settings.reducedMotion === true &&
    settings.confirmRestart === true &&
    settings.showSplash === true &&
    animationSpeed === defaultAnimationSpeed &&
    cameraSmoothness === 25 &&
    dragSensitivity === defaultDragSensitivity &&
    settings.tileEdgeHighlight === true &&
    edgeWidth === 3 &&
    hasHelperLineState({ outer: true, inner: false, trail: false }, settings) &&
    hasDefaultKeybindings(keybindings)
  ) {
    return "professional";
  }

  if (
    settings.showHints === DEFAULT_SETTINGS.showHints &&
    settings.reducedMotion === DEFAULT_SETTINGS.reducedMotion &&
    settings.confirmRestart === DEFAULT_SETTINGS.confirmRestart &&
    settings.showSplash === DEFAULT_SETTINGS.showSplash &&
    animationSpeed === defaultAnimationSpeed &&
    cameraSmoothness === defaultCameraSmoothness &&
    dragSensitivity === defaultDragSensitivity &&
    settings.tileEdgeHighlight === DEFAULT_SETTINGS.tileEdgeHighlight &&
    edgeWidth === defaultEdgeWidth &&
    hasHelperLineState(DEFAULT_SETTINGS.helperLines, settings) &&
    hasDefaultKeybindings(keybindings)
  ) {
    return "entertainment";
  }

  return "custom";
}

function detectPresetMode() {
  return detectPresetModeForState(state.settings, state.keybindings);
}

function applyPreset(mode) {
  if (mode !== "professional" && mode !== "entertainment") return;

  const nextSettings = {
    ...state.settings,
    showHints: DEFAULT_SETTINGS.showHints,
    reducedMotion: DEFAULT_SETTINGS.reducedMotion,
    confirmRestart: DEFAULT_SETTINGS.confirmRestart,
    showSplash: DEFAULT_SETTINGS.showSplash,
    animationSpeed: DEFAULT_SETTINGS.animationSpeed,
    cameraSmoothness: DEFAULT_SETTINGS.cameraSmoothness,
    dragSensitivity: DEFAULT_SETTINGS.dragSensitivity,
    tileEdgeHighlight: DEFAULT_SETTINGS.tileEdgeHighlight,
    tileEdgeWidth: DEFAULT_SETTINGS.tileEdgeWidth,
    helperLines: { ...DEFAULT_SETTINGS.helperLines },
  };

  if (mode === "professional") {
    nextSettings.showHints = false;
    nextSettings.reducedMotion = true;
    nextSettings.showSplash = true;
    nextSettings.cameraSmoothness = 25;
    nextSettings.tileEdgeHighlight = true;
    nextSettings.tileEdgeWidth = 3;
    nextSettings.helperLines = { outer: true, inner: false, trail: false };
  }

  state.settings = nextSettings;
  state.keybindings = { ...DEFAULT_KEYBINDINGS };
  saveSettings(state.settings);
  saveKeybindings(state.keybindings);
  applySettings();
  applyLanguage();
  showToast(
    typeof strings().presetToastApplied === "function"
      ? strings().presetToastApplied(getPresetLabel(mode))
      : `${getPresetLabel(mode)} applied`
  );
}

function getSplashTitle(text = strings()) {
  return detectPresetMode() === "professional"
    ? `${text.splashTitle ?? "3D 2048"} ${text.splashProfessionalSuffix ?? "Professional"}`
    : (text.splashTitle ?? "3D 2048");
}

function buildPresetModalBody(text = strings()) {
  const activeMode = detectPresetMode();
  const renderPreset = (mode, copy, meta) => `
    <div class="setting-row-card preset-card">
      <div class="setting-row-head">
        <div>
          <div class="picker-card-title">${getPresetLabel(mode, text)}</div>
          <p class="picker-card-copy">${copy}</p>
        </div>
        <div class="setting-state">${activeMode === mode ? (text.presetCurrent ?? "Current") : meta}</div>
      </div>
      <button
        type="button"
        class="choice-button shortcut-capture ${activeMode === mode ? "active" : ""}"
        data-modal-action="preset"
        data-preset="${mode}"
      >${text.presetApply ?? "Apply Preset"}</button>
    </div>
  `;

  return `
    <div class="picker-layout">
      <div class="picker-card">
        <div class="picker-card-title">${text.presetTitle ?? "Presets"}</div>
        <p class="picker-card-copy">${text.presetModalIntro ?? ""}</p>
      </div>
      <div class="picker-card">
        <div class="settings-stack">
          ${renderPreset("professional", text.presetProfessionalCopy ?? "", text.presetProfessionalMeta ?? "Professional")}
          ${renderPreset("entertainment", text.presetEntertainmentCopy ?? "", text.presetEntertainmentMeta ?? "Default")}
        </div>
      </div>
    </div>
  `;
}

function buildGameSettingsModalBody(text = strings()) {
  const buildSettingRow = ({ key, labelKey, copyKey }) => {
    const enabled = Boolean(state.settings[key]);
    const label = text[labelKey] ?? key;
    const copy = text[copyKey] ?? "";
    return `
      <div class="setting-row-card">
        <div class="setting-row-head">
          <div>
            <div class="picker-card-title">${label}</div>
            <p class="picker-card-copy">${copy}</p>
          </div>
          <div class="setting-state">${enabled ? text.optionOn : text.optionOff}</div>
        </div>
        <div class="choice-grid two compact">
          <button
            type="button"
            class="choice-button compact ${enabled ? "active" : ""}"
            data-modal-action="setting"
            data-setting="${key}"
            data-value="true"
          >${text.optionOn}</button>
          <button
            type="button"
            class="choice-button compact ${enabled ? "" : "active"}"
            data-modal-action="setting"
            data-setting="${key}"
            data-value="false"
          >${text.optionOff}</button>
        </div>
      </div>
    `;
  };

  const generalRows = SETTINGS_CONFIG
    .filter((config) => config.group === "general")
    .map(buildSettingRow)
    .join("");
  const animationRows = SETTINGS_CONFIG
    .filter((config) => config.group === "animation")
    .map(buildSettingRow)
    .join("");

  return `
    <div class="picker-layout">
      <p class="picker-card-copy">${text.settingsModalIntro ?? ""}</p>
      <div class="picker-card">
        <div class="picker-grid-title">${text.settingsGeneralTitle ?? "General"}</div>
        <div class="settings-stack">${generalRows}</div>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.settingsAnimationTitle ?? "Animation"}</div>
        <p class="picker-card-copy">${text.settingsAnimationIntro ?? ""}</p>
        <div class="settings-stack">${animationRows}</div>
        <div class="setting-row-card speed-card">
          <div class="setting-row-head">
            <div>
              <div class="picker-card-title">${text.animationSpeedLabel ?? "Move Animation Speed"}</div>
              <p class="picker-card-copy">${text.animationSpeedCopy ?? ""}</p>
            </div>
            <div class="setting-state" data-animation-speed-display>${formatAnimationSpeed(state.settings.animationSpeed)}</div>
          </div>
          <div class="speed-editor">
            <input
              class="speed-range"
              type="range"
              min="0.25"
              max="3"
              step="0.05"
              value="${state.settings.animationSpeed}"
              data-modal-input="animation-speed"
            >
            <div class="speed-inline">
              <input
                class="speed-number"
                type="number"
                min="0.25"
                max="3"
                step="0.05"
                value="${state.settings.animationSpeed}"
                data-modal-input="animation-speed"
              >
              <span class="speed-unit">x</span>
            </div>
          </div>
        </div>
        <div class="setting-row-card speed-card">
          <div class="setting-row-head">
            <div>
              <div class="picker-card-title">${text.cameraSmoothnessLabel ?? "Camera Smoothness"}</div>
              <p class="picker-card-copy">${text.cameraSmoothnessCopy ?? ""}</p>
            </div>
            <div class="setting-state" data-camera-smoothness-display>${formatCameraSmoothness(state.settings.cameraSmoothness)}</div>
          </div>
          <div class="speed-editor">
            <input
              class="speed-range"
              type="range"
              min="0"
              max="100"
              step="1"
              value="${state.settings.cameraSmoothness}"
              data-modal-input="camera-smoothness"
            >
            <div class="speed-inline">
              <input
                class="speed-number"
                type="number"
                min="0"
                max="100"
                step="1"
                value="${state.settings.cameraSmoothness}"
                data-modal-input="camera-smoothness"
              >
              <span class="speed-unit">%</span>
            </div>
          </div>
        </div>
        <div class="setting-row-card speed-card">
          <div class="setting-row-head">
            <div>
              <div class="picker-card-title">${text.dragSensitivityLabel ?? "Mouse Drag Sensitivity"}</div>
              <p class="picker-card-copy">${text.dragSensitivityCopy ?? ""}</p>
            </div>
            <div class="setting-state" data-drag-sensitivity-display>${formatDragSensitivity(state.settings.dragSensitivity)}</div>
          </div>
          <div class="speed-editor">
            <input
              class="speed-range"
              type="range"
              min="1"
              max="10"
              step="1"
              value="${state.settings.dragSensitivity}"
              data-modal-input="drag-sensitivity"
            >
            <div class="speed-inline">
              <input
                class="speed-number"
                type="number"
                min="1"
                max="10"
                step="1"
                value="${state.settings.dragSensitivity}"
                data-modal-input="drag-sensitivity"
              >
              <span class="speed-unit">/ 10</span>
            </div>
          </div>
        </div>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.resetDefaultsTitle ?? "Restore All Defaults"}</div>
        <div class="setting-row-card">
          <div class="setting-row-head">
            <div>
              <div class="picker-card-title">${text.resetDefaultsTitle ?? "Restore All Defaults"}</div>
              <p class="picker-card-copy">${text.resetDefaultsCopy ?? ""}</p>
            </div>
          </div>
          <button
            type="button"
            class="choice-button shortcut-capture"
            data-modal-action="reset-defaults"
          >${text.resetDefaultsAction ?? "Restore Defaults"}</button>
        </div>
      </div>
    </div>
  `;
}

function buildStyleModalBody(text = strings()) {
  const toneButtons = ["light", "dark"].map((tone) => `
    <button
      type="button"
      class="choice-button ${state.settings.themeTone === tone ? "active" : ""}"
      data-modal-action="tone"
      data-tone="${tone}"
    >${getToneLabel(tone, text)}</button>
  `).join("");

  const themeButtons = THEME_KEYS.map((themeName) => `
    <button
      type="button"
      class="style-option ${state.settings.themeName === themeName ? "active" : ""}"
      data-modal-action="theme"
      data-theme="${themeName}"
    >
      <span class="theme-swatch theme-${themeName}"></span>
      <span class="theme-label">${getThemeLabel(themeName, text)}</span>
    </button>
  `).join("");

  const edgeButtons = [true, false].map((enabled) => `
    <button
      type="button"
      class="choice-button compact ${state.settings.tileEdgeHighlight === enabled ? "active" : ""}"
      data-modal-action="style-setting"
      data-setting="tileEdgeHighlight"
      data-value="${enabled}"
    >${enabled ? text.optionOn : text.optionOff}</button>
  `).join("");

  const helperButtons = HELPER_LINE_MODES.map((mode) => `
    <button
      type="button"
      class="choice-button ${state.settings.helperLines[mode] ? "active" : ""}"
      data-modal-action="helper-toggle"
      data-mode="${mode}"
    >${getHelperLineModeLabel(mode, text)}</button>
  `).join("");

  return `
    <div class="picker-layout">
      <div class="picker-card">
        <div class="picker-card-title">${text.styleTitle}</div>
        <p class="picker-card-copy">${text.styleModalIntro ?? ""}</p>
        <div class="picker-grid-title">${text.styleToneHeading ?? "Tone"}</div>
        <div class="choice-grid two">${toneButtons}</div>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.styleThemeHeading ?? "Theme"}</div>
        <div class="style-grid">${themeButtons}</div>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.styleAssistTitle ?? "Visual Assist"}</div>
        <div class="setting-row-card">
          <div class="setting-row-head">
            <div>
              <div class="picker-card-title">${text.settingTileEdges ?? "Tile Edge Highlight"}</div>
              <p class="picker-card-copy">${text.settingTileEdgesCopy ?? ""}</p>
            </div>
            <div class="setting-state">${state.settings.tileEdgeHighlight ? text.optionOn : text.optionOff}</div>
          </div>
          <div class="choice-grid two compact">${edgeButtons}</div>
          <div class="speed-card edge-width-card">
            <div class="setting-row-head">
              <div>
                <div class="picker-card-title">${text.tileEdgeWidthLabel ?? "Tile Edge Thickness"}</div>
                <p class="picker-card-copy">${text.tileEdgeWidthCopy ?? ""}</p>
              </div>
              <div class="setting-state" data-tile-edge-width-display>${formatTileEdgeWidth(state.settings.tileEdgeWidth)}</div>
            </div>
            <div class="speed-editor">
              <input
                class="speed-range"
                type="range"
                min="1"
                max="5"
                step="0.25"
                value="${state.settings.tileEdgeWidth}"
                data-modal-input="tile-edge-width"
              >
              <div class="speed-inline">
                <input
                  class="speed-number"
                  type="number"
                  min="1"
                  max="5"
                  step="0.25"
                  value="${state.settings.tileEdgeWidth}"
                  data-modal-input="tile-edge-width"
                >
                <span class="speed-unit">x</span>
              </div>
            </div>
          </div>
        </div>
        <div class="setting-row-card speed-card">
          <div class="picker-card-title">${text.helperLinesTitle ?? "Guide Line Layers"}</div>
          <p class="picker-card-copy">${text.helperLinesCopy ?? ""}</p>
          <div class="choice-grid helper-grid">${helperButtons}</div>
        </div>
      </div>
    </div>
  `;
}

function buildShortcutsModalBody(text = strings()) {
  const movementActions = ["moveLeft", "moveRight", "moveUp", "moveDown", "depthForward", "depthBack"];
  const utilityActions = [
    "openMenu",
    "restart",
    "openRules",
    "openGameSettings",
    "openStyle",
    "openLanguage",
    "openShortcuts",
    "openAbout",
  ];
  const renderRows = (actions) => actions.map((action) => `
    <div class="setting-row-card shortcut-row">
      <div class="setting-row-head">
        <div class="picker-card-title">${getShortcutLabel(action, text)}</div>
        <div class="setting-state">${formatKeyLabel(state.keybindings[action], text)}</div>
      </div>
      <button
        type="button"
        class="choice-button shortcut-capture ${pendingKeybindingAction === action ? "active" : ""}"
        data-modal-action="capture-binding"
        data-binding="${action}"
      >${pendingKeybindingAction === action ? (text.captureWaiting ?? "Press a new key…") : formatKeyLabel(state.keybindings[action], text)}</button>
    </div>
  `).join("");

  return `
    <div class="picker-layout">
      <div class="picker-card">
        <div class="picker-card-title">${text.shortcutsTitle ?? "Shortcuts"}</div>
        <p class="picker-card-copy">${text.shortcutsModalIntro ?? ""}</p>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.shortcutMovementTitle ?? "Movement"}</div>
        <div class="settings-stack shortcuts-grid">${renderRows(movementActions)}</div>
      </div>
      <div class="picker-card">
        <div class="picker-grid-title">${text.shortcutInterfaceTitle ?? "Interface & Utility"}</div>
        <div class="settings-stack shortcuts-grid">${renderRows(utilityActions)}</div>
      </div>
    </div>
  `;
}

function getShortcutLabel(action, text = strings()) {
  const labelMap = {
    moveLeft: text.shortcutMoveLeft,
    moveRight: text.shortcutMoveRight,
    moveUp: text.shortcutMoveUp,
    moveDown: text.shortcutMoveDown,
    depthForward: text.shortcutDepthForward,
    depthBack: text.shortcutDepthBack,
    openMenu: text.shortcutOpenMenu,
    restart: text.shortcutRestart,
    openRules: text.shortcutOpenRules,
    openGameSettings: text.shortcutOpenSettings,
    openStyle: text.shortcutOpenStyle,
    openLanguage: text.shortcutOpenLanguage,
    openShortcuts: text.shortcutOpenShortcuts,
    openAbout: text.shortcutOpenAbout,
  };
  return labelMap[action] ?? action;
}

function formatKeyLabel(key, text = strings()) {
  if (!key) return text.shortcutUnassigned ?? "Unassigned";
  if (key === " ") return "Space";
  return key.length === 1 ? key.toUpperCase() : key.replace(/(^.|-.)/g, (part) => part.toUpperCase());
}

function assignKeybinding(action, key) {
  Object.keys(state.keybindings).forEach((currentAction) => {
    if (state.keybindings[currentAction] === key) {
      state.keybindings[currentAction] = "";
    }
  });
  state.keybindings[action] = key;
  saveKeybindings(state.keybindings);
  updateMenuSummaries();
}

function clearKeybinding(action) {
  state.keybindings[action] = "";
  saveKeybindings(state.keybindings);
  updateMenuSummaries();
}

function loadKeybindings() {
  try {
    const raw = localStorage.getItem(KEYBINDINGS_KEY);
    if (!raw) return { ...DEFAULT_KEYBINDINGS };
    const parsed = { ...DEFAULT_KEYBINDINGS, ...JSON.parse(raw) };
    Object.keys(parsed).forEach((key) => {
      parsed[key] = typeof parsed[key] === "string" ? normalizeBindingKey(parsed[key]) : DEFAULT_KEYBINDINGS[key];
    });
    return parsed;
  } catch (e) {
    return { ...DEFAULT_KEYBINDINGS };
  }
}

function saveKeybindings(keybindings) {
  try {
    localStorage.setItem(KEYBINDINGS_KEY, JSON.stringify(keybindings));
  } catch (e) {
    console.warn("Unable to save keybindings", e);
  }
}

function buildLanguageModalBody(text = strings()) {
  const buttons = Object.keys(LANGUAGE_NATIVE_LABELS).map((lang) => `
    <button
      type="button"
      class="language-option ${state.language === lang ? "active" : ""}"
      data-modal-action="language"
      data-lang="${lang}"
    >${LANGUAGE_NATIVE_LABELS[lang] ?? lang}</button>
  `).join("");

  return `
    <div class="picker-layout">
      <div class="picker-card">
        <div class="picker-card-title">${text.languageTitle}</div>
        <p class="picker-card-copy">${text.languageModalIntro ?? ""}</p>
        <div class="picker-grid-title">${text.languageGridHeading ?? "Languages"}</div>
        <div class="language-grid">${buttons}</div>
      </div>
    </div>
  `;
}

function buildAboutModalBody(text = strings()) {
  return `
    <div class="picker-layout about-layout">
      <div class="picker-card about-card">
        <div class="picker-grid-title">${text.aboutTitle ?? "About"}</div>
        <div class="picker-card-title">${text.aboutBrandTitle ?? "Hanazar Software / Hanazar Games"}</div>
        <p class="picker-card-copy">${text.aboutModalIntro ?? ""}</p>
        <p class="about-copy">${text.aboutBrandCopy ?? ""}</p>
      </div>
      <div class="picker-card about-card">
        <div class="picker-grid-title">${text.aboutVersionTitle ?? "Version"}</div>
        <p class="about-copy">${text.aboutVersionCopy ?? `${APP_VERSION} · ${RELEASE_DATE}`}</p>
      </div>
      <div class="picker-card about-card">
        <div class="picker-grid-title">${text.aboutRightsTitle ?? "Rights"}</div>
        <p class="about-copy">${text.aboutRightsCopy ?? ""}</p>
      </div>
      <div class="picker-card about-card">
        <div class="picker-grid-title">${text.aboutLinksTitle ?? "Links"}</div>
        <div class="about-links">
          <button type="button" class="choice-button about-link-button" data-modal-action="about-link" data-href="${GITHUB_PROFILE_URL}">${text.aboutProfileLink ?? "GitHub Profile"}</button>
          <button type="button" class="choice-button about-link-button" data-modal-action="about-link" data-href="${REPOSITORY_URL}">${text.aboutRepoLink ?? "Open-source Repository"}</button>
          <button type="button" class="choice-button about-link-button" data-modal-action="about-link" data-href="${LIVE_SITE_URL}">${text.aboutLiveLink ?? "Live Website"}</button>
        </div>
      </div>
    </div>
  `;
}

function normalizeAnimationSpeed(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_SETTINGS.animationSpeed;
  return Math.min(3, Math.max(0.25, Math.round(numeric * 20) / 20));
}

function formatAnimationSpeed(value) {
  return `${normalizeAnimationSpeed(value).toFixed(2)}x`;
}

function normalizeCameraSmoothness(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_SETTINGS.cameraSmoothness;
  return Math.min(100, Math.max(0, Math.round(numeric)));
}

function formatCameraSmoothness(value) {
  return `${normalizeCameraSmoothness(value)}%`;
}

function normalizeDragSensitivity(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_SETTINGS.dragSensitivity;
  return Math.min(10, Math.max(1, Math.round(numeric)));
}

function formatDragSensitivity(value) {
  return `${normalizeDragSensitivity(value)}`;
}

function normalizeTileEdgeWidth(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_SETTINGS.tileEdgeWidth;
  return Math.min(5, Math.max(1, Math.round(numeric * 4) / 4));
}

function formatTileEdgeWidth(value) {
  return `${normalizeTileEdgeWidth(value).toFixed(2)}x`;
}

function applyControlSmoothness() {
  if (!controls) return;
  const smoothness = normalizeCameraSmoothness(state.settings.cameraSmoothness);
  if (smoothness <= 0) {
    controls.enableDamping = false;
    controls.dampingFactor = 1;
    return;
  }
  controls.enableDamping = true;
  controls.dampingFactor = THREE.MathUtils.lerp(0.22, 0.02, smoothness / 100);
}

function applyControlSensitivity() {
  if (!controls) return;
  controls.rotateSpeed = normalizeDragSensitivity(state.settings.dragSensitivity) / 5;
}

function syncAnimationSpeedControls(value, source = null) {
  const normalized = normalizeAnimationSpeed(value);
  const speedDisplay = modalBody.querySelector("[data-animation-speed-display]");
  const controls = modalBody.querySelectorAll('[data-modal-input="animation-speed"]');
  controls.forEach((control) => {
    if (control === source && source?.type === "number" && source.value.trim() === "") {
      return;
    }
    control.value = normalized.toFixed(2);
  });
  if (speedDisplay) {
    speedDisplay.textContent = formatAnimationSpeed(normalized);
  }
}

function syncCameraSmoothnessControls(value, source = null) {
  const normalized = normalizeCameraSmoothness(value);
  const smoothnessDisplay = modalBody.querySelector("[data-camera-smoothness-display]");
  const controlsList = modalBody.querySelectorAll('[data-modal-input="camera-smoothness"]');
  controlsList.forEach((control) => {
    if (control === source && source?.type === "number" && source.value.trim() === "") {
      return;
    }
    control.value = `${normalized}`;
  });
  if (smoothnessDisplay) {
    smoothnessDisplay.textContent = formatCameraSmoothness(normalized);
  }
}

function syncDragSensitivityControls(value, source = null) {
  const normalized = normalizeDragSensitivity(value);
  const sensitivityDisplay = modalBody.querySelector("[data-drag-sensitivity-display]");
  const controlsList = modalBody.querySelectorAll('[data-modal-input="drag-sensitivity"]');
  controlsList.forEach((control) => {
    if (control === source && source?.type === "number" && source.value.trim() === "") {
      return;
    }
    control.value = `${normalized}`;
  });
  if (sensitivityDisplay) {
    sensitivityDisplay.textContent = formatDragSensitivity(normalized);
  }
}

function syncTileEdgeWidthControls(value, source = null) {
  const normalized = normalizeTileEdgeWidth(value);
  const widthDisplay = modalBody.querySelector("[data-tile-edge-width-display]");
  const controls = modalBody.querySelectorAll('[data-modal-input="tile-edge-width"]');
  controls.forEach((control) => {
    if (control === source && source?.type === "number" && source.value.trim() === "") {
      return;
    }
    control.value = normalized.toFixed(2);
  });
  if (widthDisplay) {
    widthDisplay.textContent = formatTileEdgeWidth(normalized);
  }
}

function strings() {
  return {
    ...STRINGS.en,
    ...(LANGUAGE_ENHANCEMENTS.en ?? {}),
    ...STRINGS[state.language],
    ...(LANGUAGE_ENHANCEMENTS[state.language] ?? {}),
  };
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    if (!THEME_LIBRARY[parsed.themeName]) parsed.themeName = DEFAULT_SETTINGS.themeName;
    if (parsed.themeTone !== "light" && parsed.themeTone !== "dark") {
      parsed.themeTone = DEFAULT_SETTINGS.themeTone;
    }
    parsed.tileEdgeHighlight = parsed.tileEdgeHighlight !== false;
    parsed.tileEdgeWidth = normalizeTileEdgeWidth(parsed.tileEdgeWidth);
    const helperDefaults = DEFAULT_SETTINGS.helperLines;
    const storedLines = parsed.helperLines && typeof parsed.helperLines === "object"
      ? parsed.helperLines
      : (HELPER_LINE_MODES.includes(parsed.helperLineMode)
        ? { outer: parsed.helperLineMode === "outer", inner: parsed.helperLineMode === "inner", trail: parsed.helperLineMode === "trail" }
        : {});
    parsed.helperLines = {
      outer: Boolean(storedLines.outer ?? helperDefaults.outer),
      inner: Boolean(storedLines.inner ?? helperDefaults.inner),
      trail: Boolean(storedLines.trail ?? helperDefaults.trail),
    };
    parsed.animationSpeed = normalizeAnimationSpeed(parsed.animationSpeed);
    parsed.cameraSmoothness = normalizeCameraSmoothness(parsed.cameraSmoothness);
    parsed.dragSensitivity = normalizeDragSensitivity(parsed.dragSensitivity);
    return parsed;
  } catch (e) {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn("Unable to save settings", e);
  }
}

function detectLanguage() {
  const candidate = navigator.language || navigator.userLanguage || "zh-CN";
  const lowered = candidate.toLowerCase();
  if (lowered.startsWith("zh")) {
    if (lowered.includes("hant") || lowered.includes("tw") || lowered.includes("hk") || lowered.includes("mo")) {
      return "zh-TW";
    }
    return "zh-CN";
  }
  if (candidate.startsWith("ja")) return "ja";
  if (candidate.startsWith("ko")) return "ko";
  if (candidate.startsWith("es")) return "es";
  if (candidate.startsWith("pt")) return "pt";
  if (candidate.startsWith("it")) return "it";
  if (candidate.startsWith("ru")) return "ru";
  if (candidate.startsWith("ar")) return "ar";
  if (candidate.startsWith("hi")) return "hi";
  if (candidate.startsWith("id")) return "id";
  if (candidate.startsWith("tr")) return "tr";
  if (candidate.startsWith("vi")) return "vi";
  if (candidate.startsWith("th")) return "th";
  if (candidate.startsWith("fr")) return "fr";
  if (candidate.startsWith("de")) return "de";
  return "en";
}

function loadLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored && STRINGS[stored]) return stored;
  } catch (e) {
    // Ignore.
  }
  return detectLanguage();
}

function saveLanguage(lang) {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch (e) {
    console.warn("Unable to save language", e);
  }
}

function hasSeenGuide() {
  try {
    return localStorage.getItem(GUIDE_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function markGuideSeen() {
  try {
    localStorage.setItem(GUIDE_KEY, "1");
  } catch (e) {
    console.warn("Unable to persist guide flag", e);
  }
}

function hasSeenAnnouncement() {
  try {
    return localStorage.getItem(ANNOUNCEMENT_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function markAnnouncementSeen() {
  try {
    localStorage.setItem(ANNOUNCEMENT_KEY, "1");
  } catch (e) {
    console.warn("Unable to persist announcement flag", e);
  }
}

function restoreAllDefaults() {
  state.settings = {
    ...DEFAULT_SETTINGS,
    helperLines: { ...DEFAULT_SETTINGS.helperLines },
  };
  state.keybindings = { ...DEFAULT_KEYBINDINGS };
  saveSettings(state.settings);
  saveKeybindings(state.keybindings);
  applySettings();
  applyLanguage();
}

function showResetDefaultsConfirm() {
  openModal({
    title: strings().resetDefaultsConfirmTitle,
    bodyHtml: strings().resetDefaultsConfirmBody,
    confirmText: strings().resetDefaultsConfirmConfirm,
    cancelText: strings().resetDefaultsConfirmCancel,
    showCancel: true,
    allowEnterConfirm: true,
    onConfirm: () => {
      restoreAllDefaults();
      showToast(strings().toastDefaultsRestored);
      showGameSettingsPickerModal();
    },
  });
}

function isOverlayBlockingGame() {
  return (
    !settingsPanel.classList.contains("hidden") ||
    !modal.classList.contains("hidden") ||
    !state.splashFinished
  );
}

function getAnimationDuration(base) {
  const reduced = state.settings.reducedMotion ? 0.45 : 1;
  const speed = normalizeAnimationSpeed(state.settings.animationSpeed);
  return Math.max(60, Math.round((base * reduced) / speed));
}
