# Hanazar Games | 3D 2048

<div align="center">

**A stylish 3D reinterpretation of classic 2048, rebuilt inside a 4×4×4 cube.**

[![Version](https://img.shields.io/badge/version-V3.1.1-c98a3d?style=for-the-badge)](https://hzagaming.github.io/3D-2048-webgame/)
[![Release Date](https://img.shields.io/badge/released-2026--03--24-8a5f2a?style=for-the-badge)](https://hzagaming.github.io/3D-2048-webgame/)
[![Live Demo](https://img.shields.io/badge/Play-Live%20Website-b1453d?style=for-the-badge)](https://hzagaming.github.io/3D-2048-webgame/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160.0-2a2017?style=for-the-badge)](https://threejs.org/)

</div>

---

## Overview

`3D 2048` is a browser-playable puzzle game under **Hanazar Games**.  
It keeps the core idea of classic 2048, but upgrades the board from a flat grid into a **4×4×4 spatial cube**.

You do not just think about left, right, up, and down anymore.  
You rotate the camera, judge depth, choose the right direction, and merge tiles inside a real 3D volume.

This project is currently a **pure static web game**:

- No build step
- No package installation required
- Runs directly in the browser
- Powered by `Three.js` through `importmap`

---

## Live Website

- Play Online: [https://hzagaming.github.io/3D-2048-webgame/](https://hzagaming.github.io/3D-2048-webgame/)
- Repository: [https://github.com/hzagaming/3D-2048-webgame](https://github.com/hzagaming/3D-2048-webgame)
- GitHub Profile: [https://github.com/hzagaming](https://github.com/hzagaming)

---

## Preview

<img width="688" height="677" alt="3D 2048 preview" src="https://github.com/user-attachments/assets/8dd84b4d-b1e2-4045-97a8-7d1fdafd6a16" />

---

## Core Highlights

### 1. Real 3D 2048 Gameplay

- The board is a full **4×4×4 cube**
- Matching numbers merge in **three-dimensional space**
- Camera rotation changes how movement directions are interpreted
- The game keeps classic 2048 strategy while adding real spatial planning

### 2. Stylish Hanazar Interface

- Branded splash intro with `Hanazar Games`
- Dedicated menu system with animated panels and modal windows
- Theme-aware UI styling
- Warm original palette plus multiple color themes
- Light / dark visual modes

### 3. Rich Settings System

- Basic gameplay settings
- Animation tuning
- Camera smoothing control
- Mouse drag sensitivity control
- Tile edge highlight and edge thickness control
- Multi-layer helper line control
- Reset to defaults with confirmation

### 4. Strong Accessibility and Replay Support

- First-visit guide popup
- One-time update announcement popup
- Custom shortcut mapping
- Preset switching for different play styles
- Multi-language support

---

## Feature List

### Gameplay

- 4×4×4 cube board
- Random `2 / 4` tile generation
- Merge scoring system
- Best score persistence
- Win popup at `2048`
- Lose popup when no moves remain
- Smooth tile transition animation

### Camera and Control

- Mouse drag to rotate
- Mouse wheel zoom
- Camera-aware movement mapping
- `WASD + QE` default movement
- Shift-drag panning disabled to avoid accidental board translation
- Adjustable camera smoothness
- Adjustable mouse drag sensitivity

### Menu System

- Rules
- Announcements
- Game Settings
- Presets
- Style
- Language
- Shortcuts
- About

Each section opens in its own modal panel.

### Presets

#### Entertainment Mode

- Default gameplay configuration
- Default shortcuts
- Default camera smoothness
- Default drag sensitivity
- Does not override your current theme color

#### Professional Mode

- Outer helper frame enabled
- Tile edge highlight enabled
- Tile edge thickness set to `3x`
- Control hint hidden
- Reduced motion enabled
- Intro animation kept enabled
- Camera smoothness set to `25%`
- Default shortcuts restored
- Blocked-move toast suppressed
- Splash title changes to `3D 2048 Professional`

### Visual Customization

- `7` color themes:
  - Original (Default)
  - Crimson
  - Orange
  - Green
  - Cyan
  - Blue
  - Violet
- Light / dark tone switching
- Theme-aware UI colors
- Theme-aware tile appearance
- Theme-aware board frame and guide lines

### Visual Assist

- Tile edge highlight toggle
- Tile edge thickness control
- Helper line multi-select:
  - Outer frame
  - Inner grid
  - Trail guides
- Full combination support:
  - all on
  - all off
  - any custom combination

### Animation Settings

- Move animation speed
- Camera smoothness
- Reduced motion toggle
- Intro animation toggle

### Basic Settings

- Show controls hint
- Confirm before restart
- Restore all defaults

### Shortcut Customization

You can rebind:

- Move Left
- Move Right
- Move Up
- Move Down
- Depth Forward
- Depth Back
- Open Menu
- Restart
- Open Rules
- Open Game Settings
- Open Style Settings
- Open Language Settings
- Open Shortcuts
- Open About

Shortcut capture supports:

- Press a key to rebind
- `Esc` to cancel
- `Backspace / Delete` to clear

### Announcement System

- First-visit auto popup
- One-time update notice storage
- Reopen anytime from the top bar or menu

### About Panel

- Hanazar Software / Hanazar Games branding
- Version info
- Release date
- Copyright notice
- GitHub profile link
- Repository link
- Live website link

---

## Languages

The current build includes:

- 简体中文
- 繁體中文
- English
- 日本語
- Español
- Français
- Deutsch
- 한국어
- Português
- Italiano
- Русский
- العربية
- हिन्दी
- Bahasa Indonesia
- Türkçe
- Tiếng Việt
- ไทย

---

## Controls

### Default Movement

| Action | Default Key |
|---|---|
| Move Left | `A` |
| Move Right | `D` |
| Move Up | `W` |
| Move Down | `S` |
| Depth Forward | `Q` |
| Depth Back | `E` |

### Camera

| Action | Input |
|---|---|
| Rotate Camera | Mouse Drag |
| Zoom | Mouse Wheel |
| Pan | Disabled |

### Utility Shortcuts

| Action | Default Key |
|---|---|
| Open Menu | `M` |
| Restart | `R` |
| Open Rules | `H` |
| Open Game Settings | `G` |
| Open Style Settings | `T` |
| Open Language Settings | `L` |
| Open Shortcuts | `K` |
| Open About | `B` |

---

## V3.1.1 Update

**Release Date:** `2026-03-24`  
**Version:** `V3.1.1`

### Major Changes

- Rebuilt the site into a more complete game portal instead of a simple prototype page
- Added a dedicated multi-entry menu system
- Added one-time announcements and first-visit guide flow
- Added presets for professional and entertainment play styles
- Added theme switching, light / dark tone switching, and tile appearance sync
- Added tile edge highlight, edge thickness control, and helper line controls
- Added full shortcut customization
- Added about panel with version, links, and project info
- Expanded language support
- Added camera smoothness and mouse drag sensitivity controls

### UX / Visual Improvements

- Intro animation with Hanazar branding
- Professional splash title variant
- Better number fitting on large-value tiles
- Cleaner menu layout
- Improved theme consistency across the whole site

### Control Fixes

- Disabled accidental `Shift + Drag` panning
- Improved camera feel with adjustable smoothing and sensitivity

---

## Local Run

This repository is a static site.  
Run it with any local static server.

### Recommended: Use a Static Server

If you use VS Code, `Live Server` works well.

You can also run:

```bash
python3 -m http.server 5500
```

Then visit:

```text
http://127.0.0.1:5500/
```

### Notes

- This project imports `Three.js` from `unpkg` through `importmap`
- A network connection is required unless you later vendor those dependencies locally
- Opening the file directly through `file://` is not recommended

---

## Project Structure

```text
3D-2048-webgame/
├── index.html     # page structure, menu entries, modal shell
├── style.css      # full visual system, themes, panels, motion
├── main.js        # gameplay, 3D scene, settings, presets, i18n, shortcuts
└── README.md      # project documentation
```

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Three.js](https://threejs.org/)
- OrbitControls
- Browser Local Storage

---

## Design Direction

This version is not trying to feel like a default utility demo.  
It aims to feel like a small branded game site:

- bold headline
- branded splash
- animated menu
- configurable presentation
- 3D board readability
- polished preset and settings flow

---

## Brand & Rights

**Hanazar Software / Hanazar Games**  
Copyright © 2026 Hanazar Software / Hanazar Games. All rights reserved.

---

## Quick Summary

If you want the shortest possible description:

> **3D 2048** is a stylish browser-based 2048 game set inside a rotatable 4×4×4 cube, with presets, themes, settings, shortcuts, announcements, multilingual UI, and Hanazar-branded presentation.
