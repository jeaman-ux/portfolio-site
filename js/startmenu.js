// Windows 98 Start Menu

class StartMenu {
    constructor() {
        this.startButton = document.getElementById('start-button');
        this.startMenu = document.getElementById('start-menu');
        this.programsSubmenu = document.getElementById('programs-submenu');
        this.gamesSubmenu = document.getElementById('games-submenu');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Start button toggle
        this.startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Start menu items
        const menuItems = this.startMenu.querySelectorAll('.start-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.dataset.action;
                const app = item.dataset.app;

                if (action === 'programs') {
                    this.showProgramsSubmenu();
                } else if (action === 'games') {
                    this.showGamesSubmenu();
                } else if (action === 'shutdown') {
                    this.showShutdownDialog();
                } else if (action === 'run') {
                    this.showRunDialog();
                } else if (action === 'eco-friendly') {
                    this.enterEcoMode();
                } else if (app) {
                    this.launchApp(app);
                    this.close();
                }
            });

            // Programs submenu hover
            if (item.dataset.action === 'programs') {
                item.addEventListener('mouseenter', () => {
                    this.showProgramsSubmenu();
                });
            }

            // Games submenu hover
            if (item.dataset.action === 'games') {
                item.addEventListener('mouseenter', () => {
                    this.showGamesSubmenu();
                });
            }
        });

        // Programs submenu items
        const programItems = this.programsSubmenu.querySelectorAll('.start-menu-item');
        programItems.forEach(item => {
            item.addEventListener('click', () => {
                const app = item.dataset.app;
                if (app) {
                    this.launchApp(app);
                    this.close();
                }
            });
        });

        // Games submenu items
        const gameItems = this.gamesSubmenu.querySelectorAll('.start-menu-item');
        gameItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const app = item.dataset.app;
                if (app) {
                    this.launchApp(app);
                    this.close();
                }
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.startMenu.contains(e.target) &&
                !this.programsSubmenu.contains(e.target) &&
                !this.gamesSubmenu.contains(e.target) &&
                e.target !== this.startButton &&
                !this.startButton.contains(e.target)) {
                this.close();
            }
        });

        // Close submenus when leaving menu area - but with delay to allow moving to submenu
        let submenuTimeout;
        this.startMenu.addEventListener('mouseleave', (e) => {
            // Check if mouse is moving towards a submenu
            const movingToSubmenu =
                e.relatedTarget === this.programsSubmenu ||
                this.programsSubmenu.contains(e.relatedTarget) ||
                e.relatedTarget === this.gamesSubmenu ||
                this.gamesSubmenu.contains(e.relatedTarget);

            if (!movingToSubmenu) {
                submenuTimeout = setTimeout(() => {
                    this.programsSubmenu.style.display = 'none';
                    this.gamesSubmenu.style.display = 'none';
                }, 300);
            }
        });

        // Keep submenus open when hovering over them
        const keepSubmenuOpen = (submenu) => {
            submenu.addEventListener('mouseenter', () => {
                clearTimeout(submenuTimeout);
            });
            submenu.addEventListener('mouseleave', (e) => {
                // Don't close if mouse is going back to start menu
                if (!this.startMenu.contains(e.relatedTarget)) {
                    setTimeout(() => {
                        submenu.style.display = 'none';
                    }, 100);
                }
            });
        };

        keepSubmenuOpen(this.programsSubmenu);
        keepSubmenuOpen(this.gamesSubmenu);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.startMenu.style.display = 'block';
        this.isOpen = true;
    }

    close() {
        this.startMenu.style.display = 'none';
        this.programsSubmenu.style.display = 'none';
        this.gamesSubmenu.style.display = 'none';
        this.isOpen = false;
    }

    showProgramsSubmenu() {
        const rect = this.startMenu.getBoundingClientRect();
        this.programsSubmenu.style.left = rect.right + 'px';
        this.programsSubmenu.style.top = rect.top + 'px';
        this.programsSubmenu.style.bottom = 'auto';
        this.programsSubmenu.style.display = 'block';
        this.gamesSubmenu.style.display = 'none';
    }

    showGamesSubmenu() {
        const rect = this.startMenu.getBoundingClientRect();
        this.gamesSubmenu.style.left = rect.right + 'px';
        this.gamesSubmenu.style.top = rect.top + 'px';
        this.gamesSubmenu.style.bottom = 'auto';
        this.gamesSubmenu.style.display = 'block';
        this.programsSubmenu.style.display = 'none';
    }

    launchApp(appName) {
        switch (appName) {
            case 'notepad':
                if (window.notepadApp) {
                    window.notepadApp.open();
                }
                break;
            case 'minesweeper':
                if (window.minesweeperApp) {
                    window.minesweeperApp.open();
                }
                break;
            case 'explorer':
                if (window.explorerApp) {
                    window.explorerApp.open();
                }
                break;
            case 'snake':
                if (window.snakeApp) {
                    window.snakeApp.open();
                }
                break;
            case 'breakout':
                if (window.breakoutApp) {
                    window.breakoutApp.open();
                }
                break;
            case 'spaceinvaders':
                if (window.spaceInvadersApp) {
                    window.spaceInvadersApp.open();
                }
                break;
        }
    }

    showShutdownDialog() {
        this.close();
        const windowId = windowManager.createWindow({
            title: 'Shut Down Windows',
            width: 350,
            height: 180,
            content: `
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; height: 100%;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="font-size: 32px;">💻</div>
                        <div style="flex: 1;">
                            <p style="margin-bottom: 8px;">What do you want the computer to do?</p>
                            <select style="width: 100%; padding: 2px; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 11px;">
                                <option>Shut down</option>
                                <option>Restart</option>
                                <option>Stand by</option>
                            </select>
                        </div>
                    </div>
                    <div class="dialog-buttons" style="margin-top: auto;">
                        <button class="dialog-button" onclick="alert('This is just a demo!'); windowManager.closeWindow('${windowId}')">OK</button>
                        <button class="dialog-button" onclick="windowManager.closeWindow('${windowId}')">Cancel</button>
                    </div>
                </div>
            `
        });

        // Center the dialog
        const windowEl = document.getElementById(windowId);
        windowEl.style.left = (window.innerWidth / 2 - 175) + 'px';
        windowEl.style.top = (window.innerHeight / 2 - 140) + 'px';
    }

    enterEcoMode() {
        this.close();
        if (window.terminal) {
            window.terminal.enter();
        }
    }

    showRunDialog() {
        this.close();
        const windowId = windowManager.createWindow({
            title: 'Run',
            width: 400,
            height: 150,
            content: `
                <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; height: 100%;">
                    <div style="display: flex; gap: 12px;">
                        <div style="font-size: 32px;">▶️</div>
                        <div style="flex: 1;">
                            <p style="margin-bottom: 8px;">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
                            <label style="display: block; margin-bottom: 4px;">Open:</label>
                            <input type="text" style="width: 100%; padding: 2px 4px; font-family: 'MS Sans Serif', Arial, sans-serif; font-size: 11px; border: 1px solid #808080;">
                        </div>
                    </div>
                    <div class="dialog-buttons" style="margin-top: auto;">
                        <button class="dialog-button" onclick="alert('This is just a demo!'); windowManager.closeWindow('${windowId}')">OK</button>
                        <button class="dialog-button" onclick="windowManager.closeWindow('${windowId}')">Cancel</button>
                        <button class="dialog-button">Browse...</button>
                    </div>
                </div>
            `
        });

        // Center the dialog
        const windowEl = document.getElementById(windowId);
        windowEl.style.left = (window.innerWidth / 2 - 200) + 'px';
        windowEl.style.top = (window.innerHeight / 2 - 115) + 'px';
    }
}

// Initialize start menu
const startMenu = new StartMenu();
