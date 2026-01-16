# Design Guidelines - Jordan Design Portfolio 2026

## Core Principle: Windows 98 Authenticity First

This project must maintain authentic Windows 98 design and behavior as the **primary foundation**. All additions and customizations should respect and enhance this base, never compromise it.

---

## 1. Visual Design Rules

### Colors (Exact Windows 98 Palette)
- **Window Chrome**: `#c0c0c0` (standard gray)
- **Active Title Bar**: `#000080` (navy blue) with gradient to `#1084d0`
- **Inactive Title Bar**: `#808080` (gray) with gradient to `#a0a0a0`
- **Desktop Background**: `#008080` (teal) - default when no wallpaper
- **Text on Active Title**: `#ffffff` (white)
- **3D Light Edge**: `#ffffff` (white)
- **3D Dark Edge**: `#000000` (black)
- **3D Mid-Shadow**: `#808080` (gray)
- **3D Light Shadow**: `#dfdfdf`
- **Button Face**: `#c0c0c0`
- **Selected Item**: `#000080` (blue highlight)
- **Selected Text**: `#ffffff` (white text on blue)

### Typography
- **System Font**: 'MS Sans Serif', Arial, sans-serif
- **Fixed Width**: 'Courier New', monospace
- **Size**: 11px for UI text, 8pt for menus
- **Bold**: Title bars only

### Window Chrome
- **Border Style**: 3D beveled (1px white top/left, 1px black bottom/right)
- **Title Bar Height**: 18px
- **Button Size**: 16px × 14px
- **Menu Bar Height**: 18px
- **Status Bar Height**: 20px
- **Minimize/Maximize/Close**: Standard Windows 98 symbols (_, □, ×)

### Icons
- **Size**: 32×32px for desktop icons, 16×16px for system
- **Style**: Simple, flat, with basic gradients (authentic Win98 style)
- **Spacing**: 80px grid for desktop icons

---

## 2. Interaction Rules

### Performance
- **Loading**: < 1 second for initial page load
- **Window Open**: Instant (no animation delays)
- **Drag Response**: < 16ms (60fps minimum)
- **Click Response**: Immediate visual feedback

### Behaviors
- **Single Click**: Select (desktop icons)
- **Double Click**: Open/Execute
- **Right Click**: Context menu
- **Drag**: Smooth, no lag
- **Window Focus**: Click to focus, bring to front
- **Taskbar**: Click to restore/focus windows

### Animations
- **Window Opening**: None (instant appear) - authentic Win98
- **Window Closing**: None (instant disappear)
- **Minimize**: Instant to taskbar
- **Maximize**: Instant expand
- **Menu Expand**: Instant (no slide/fade)
- **EXCEPTION**: Eco-friendly terminal mode can have smooth transitions for modern UX

---

## 3. Component Standards

### Windows
```
Structure:
├── Title Bar (draggable)
│   ├── Icon (16×16px)
│   ├── Title Text
│   └── Buttons (Minimize, Maximize, Close)
├── Menu Bar (optional)
├── Content Area
└── Status Bar (optional)
```

### Desktop Icons
- 70px wide containers
- 32px icon image
- Label below, centered
- Wrap text at 2 lines max
- Blue highlight when selected

### Taskbar
- 28px height (fixed)
- Start button: left aligned
- Window buttons: flex area
- System tray: right aligned with clock

### Start Menu
- 200px width
- 24px wide banner (vertical "Windows 98" text)
- No hover delays
- Instant submenu appearance

---

## 4. Customization Boundaries

### ✅ ALLOWED Customizations
- **Content**: Portfolio text, project data
- **Desktop Icons**: Custom icons for projects (while maintaining style)
- **Window Content**: Modern layouts inside windows
- **Eco-friendly Mode**: Entirely custom terminal interface
- **Apps**: Custom applications (Notepad, Minesweeper variants)
- **Wallpaper**: Custom backgrounds
- **Sound Effects**: Optional additions

### ❌ FORBIDDEN Changes
- Modifying core Win98 colors
- Changing window chrome appearance
- Altering button sizes/positions
- Adding rounded corners
- Modern shadows or blur effects
- Gradient backgrounds on chrome
- Animated window open/close
- Elastic/bounce effects
- Modern fonts in system UI

### ⚠️ ASK BEFORE Changing
- Icon styles (must stay Win98-appropriate)
- Window behavior (must match Win98)
- Menu structures
- Taskbar modifications
- Desktop layout changes

---

## 5. Code Performance Standards

### Loading Targets
- Initial HTML: < 50KB
- Total CSS: < 30KB
- Total JS: < 100KB (unminified)
- Images: Lazy load, < 500KB total
- First Paint: < 500ms
- Interactive: < 1s

### Optimization Rules
- Vanilla JavaScript (no frameworks for core UI)
- CSS transforms for animations
- Event delegation for icons
- Minimal DOM manipulation
- No unnecessary recalculations
- Portfolio content loaded on-demand

---

## 6. Browser Compatibility

### Target Browsers
- Chrome/Edge: 100%
- Firefox: 100%
- Safari: 100%
- Mobile: Functional but not optimized (Win98 was desktop-only)

---

## 7. Decision-Making Protocol

### When Implementing Features

**Step 1: Ask yourself**
- Does this exist in Windows 98?
- How did Windows 98 handle this?
- Is this a core UI element or content customization?

**Step 2: Reference**
- Check Windows 98 screenshots
- Test on period-accurate references
- Verify color codes against official palette

**Step 3: If Unsure**
- **ASK THE USER** before implementing
- Propose options with Win98 authenticity ratings
- Default to authentic behavior

---

## 8. Testing Checklist

Before considering any feature "done":

- [ ] Colors match exact Windows 98 palette
- [ ] Window chrome looks authentic
- [ ] Interactions feel instant/snappy
- [ ] No modern effects (shadows, blur, etc.)
- [ ] Typography matches system fonts
- [ ] Icons maintain 32×32px size
- [ ] Performance < 1s load, 60fps interactions
- [ ] Works without console errors
- [ ] Desktop wallpaper visible
- [ ] Taskbar clock updates in real-time

---

## 9. Portfolio-Specific Customizations

These are APPROVED deviations from stock Windows 98:

1. **Project Icons**: Use modern emojis (acceptable compromise)
2. **Eco-friendly Mode**: Completely custom terminal (separate mode)
3. **Project Viewer**: Modern content layout inside windows (content area only)
4. **About Me**: Enhanced layout (inside window content)

All other elements MUST maintain Windows 98 authenticity.

---

## 10. Quick Reference

**Before making ANY change, ask:**
1. Is this authentic to Windows 98?
2. Does this maintain performance?
3. Does this require user approval?

**When in doubt**: Preserve Windows 98 behavior and ASK.

---

Last Updated: January 15, 2026
Project: Jordan Design Portfolio 2026
Maintainer: Claude Code with user approval
