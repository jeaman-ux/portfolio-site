# Jordan Design Portfolio 2026

A nostalgic Windows 98 desktop experience featuring Jordan Eaman's design portfolio as interactive desktop icons.

## Features

### Desktop Environment
- Authentic Windows 98 Bliss wallpaper
- Desktop icons with unique designs for each portfolio project
- Drag-and-drop window management
- System icons (My Computer, Recycle Bin, About Me)

### Portfolio Projects (Desktop Icons)
Each project has its own unique icon:
- 🚛 **SennOS at sennder** - Freight logistics software
- 👥 **Assembl by bluenove** - Collective intelligence platform
- 🏙️ **Djingo City** - Urban living assistant
- ⛷️ **X-TRACT** - First aid response app
- 🔬 **Zixi Research Lab** - Rural development project
- ♻️ **Do Tank by CITEO** - Eco-responsibility platform
- 🌾 **JUST'LA** - Local product distribution
- 🗞️ **IDF Paris Kiosk** - Urban news kiosk redesign
- 🚗 **Movin'On HUB - MICHELIN** - Mobility innovation lab
- 🚇 **KmUn Grenoble** - Sustainable mobility incentive
- 📚 **Masters Research** - Digital infrastructure thesis
- 🎨 **Graphic Design** - Design portfolio
- 🖼️ **Fine Arts** - Art gallery

### Windows 98 Features
- **Taskbar** with Start button and system tray clock
- **Start Menu** with Programs, Documents, Settings, etc.
- **Window Management**: Draggable, minimizable, maximizable windows
- **Applications**:
  - Notepad (text editor)
  - Minesweeper (simplified game)
  - Windows Explorer
- **Dialogs**: Shut Down, Run, and system dialogs
- **Eco-friendly Mode**: Terminal-style text-only interface (black background, green text) with keyboard navigation

### Eco-friendly Terminal Mode
A low-energy, text-only mode perfect for accessibility and minimal resource usage:
- Classic terminal aesthetic (black & green)
- Simple keyboard commands
- No images, pure text content
- Easy navigation with clear instructions
- Switch back to classic mode anytime

**Commands:**
- `list` - Show all projects
- `1-14` - View a specific project
- `about` - About Jordan Eaman
- `help` - Show all commands
- `clear` - Clear screen
- `classic` - Return to Windows 98 mode

## How to Use

### Running Locally

#### Option 1: Using Python (Recommended)
```bash
cd /Users/concord/Desktop/Windows98-Simulator
python3 -m http.server 8080
```
Then open http://localhost:8080 in your browser.

#### Option 2: Using Node.js
```bash
npx http-server
```

#### Option 3: Using PHP
```bash
php -S localhost:8080
```

**Note**: You must use a local web server (not `file://`) to enable loading of portfolio content from the adjacent "Jordaneaman Site" folder.

### Interaction Guide
- **Double-click** icons to open windows
- **Single-click** to select icons
- **Drag** windows by their title bar
- **Right-click** desktop for context menu
- **Click Start** button for Start Menu
- **Minimize/Maximize/Close** buttons work as expected
- **Taskbar** shows open windows - click to restore

## File Structure

```
Windows98-Simulator/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Desktop, taskbar styling
│   ├── windows.css        # Window components
│   ├── startmenu.css      # Start menu styling
│   └── desktop.css        # Desktop icons
├── js/
│   ├── main.js            # App initialization
│   ├── window-manager.js  # Window system
│   ├── taskbar.js         # Taskbar & clock
│   ├── startmenu.js       # Start menu
│   ├── desktop.js         # Desktop icons
│   ├── portfolio-loader.js # Content loader
│   └── apps/
│       ├── project-viewer.js # Portfolio viewer
│       ├── notepad.js
│       ├── minesweeper.js
│       └── explorer.js
├── assets/
│   ├── icons/
│   ├── wallpapers/
│   │   └── bliss.jpg      # Windows 98 wallpaper
│   └── sounds/
└── README.md
```

## Technical Details

### Technologies
- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build process required
- Responsive window system using vanilla JS

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Modern browsers with ES6 support

### Windows 98 Color Scheme
- Window Gray: `#c0c0c0`
- Active Title: `#000080` (Navy)
- Inactive Title: `#808080`
- Desktop: `#008080` (Teal)

## Portfolio Content Loading

The simulator loads portfolio content from:
```
../Jordaneaman Site/text/exact/
```

If files can't be loaded, fallback demo content is displayed.

## Future Enhancements

- [ ] Window resizing by dragging edges
- [ ] More complete Minesweeper gameplay
- [ ] Additional applications (Paint, Calculator, Solitaire)
- [ ] Sound effects
- [ ] Screensaver
- [ ] Custom cursors
- [ ] File system simulation
- [ ] Actual portfolio images in project windows

## Design Guidelines

This project follows strict **Windows 98 authenticity rules**. See `DESIGN-GUIDELINES.md` for:
- Exact color palette specifications
- Performance standards (< 1s load, 60fps interactions)
- Interaction behaviors
- Customization boundaries
- Decision-making protocol

**Key Principle**: Windows 98 design and behavior come FIRST. All customizations must respect this foundation.

## Credits

**Portfolio**: Jordan Eaman
**Design**: Authentic Windows 98 interface recreation
**Development**: Custom JavaScript window manager

---

**Contact**: JordanEAman@gmail.com
**Portfolio**: https://www.jordaneaman.com/

*This is a creative portfolio presentation combining nostalgic Windows 98 aesthetics with modern web technologies.*
