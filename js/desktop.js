// Windows 98 Desktop Icons

class Desktop {
    constructor() {
        this.desktop = document.getElementById('desktop');
        this.contextMenu = document.getElementById('context-menu');
        this.selectedIcon = null;
        this.icons = [];

        this.init();
    }

    init() {
        // Create default desktop icons
        this.createSystemIcons();
        this.createPortfolioIcons();

        // Desktop right-click context menu
        this.desktop.addEventListener('contextmenu', (e) => {
            if (e.target === this.desktop) {
                e.preventDefault();
                this.showContextMenu(e.clientX, e.clientY);
            }
        });

        // Close context menu on click outside
        document.addEventListener('click', (e) => {
            if (!this.contextMenu.contains(e.target)) {
                this.contextMenu.style.display = 'none';
            }
        });

        // Context menu items
        const contextItems = this.contextMenu.querySelectorAll('.context-menu-item');
        contextItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'refresh') {
                    location.reload();
                }
                this.contextMenu.style.display = 'none';
            });
        });

        // Deselect icons on desktop click
        this.desktop.addEventListener('click', (e) => {
            if (e.target === this.desktop) {
                this.deselectAll();
            }
        });
    }

    createIcon(options) {
        const icon = {
            name: options.name,
            type: options.type,
            gridX: options.gridX || 0,
            gridY: options.gridY || 0,
            action: options.action || null,
            projectData: options.projectData || null
        };

        this.icons.push(icon);

        const iconEl = document.createElement('div');
        iconEl.className = 'desktop-icon';
        iconEl.dataset.iconType = options.type;
        iconEl.dataset.gridX = options.gridX || 0;
        iconEl.dataset.gridY = options.gridY || 0;

        iconEl.innerHTML = `
            <div class="desktop-icon-image"></div>
            <div class="desktop-icon-label">${options.name}</div>
        `;

        // Single click to select
        iconEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectIcon(iconEl);
        });

        // Double click to open
        iconEl.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (options.action) {
                options.action();
            }
        });

        this.desktop.appendChild(iconEl);
        return iconEl;
    }

    createSystemIcons() {
        // My Computer
        this.createIcon({
            name: 'My Computer',
            type: 'computer',
            gridX: 0,
            gridY: 0,
            action: () => {
                if (window.explorerApp) {
                    window.explorerApp.open();
                }
            }
        });

        // Internet Explorer
        this.createIcon({
            name: 'Internet\nExplorer',
            type: 'internet-explorer',
            gridX: 0,
            gridY: 1,
            action: () => {
                if (window.myspaceApp) {
                    window.myspaceApp.open();
                }
            }
        });

        // Recycle Bin
        this.createIcon({
            name: 'Recycle Bin',
            type: 'recycle-bin',
            gridX: 0,
            gridY: 2,
            action: () => {
                windowManager.createWindow({
                    title: 'Recycle Bin',
                    width: 500,
                    height: 350,
                    content: '<div style="padding: 20px; text-align: center; color: #808080;">The Recycle Bin is empty.</div>'
                });
            }
        });

        // About Me
        this.createIcon({
            name: 'About Me',
            type: 'about',
            gridX: 0,
            gridY: 3,
            action: () => {
                if (window.projectViewer) {
                    window.projectViewer.showAboutMe();
                }
            }
        });
    }

    createPortfolioIcons() {
        // Student work projects (to be in folder)
        const studentProjects = [
            { name: 'Djingo City', type: 'djingo', file: 'exact_djingo-city.txt' },
            { name: 'IDF Paris Kiosk', type: 'idf-kiosk', file: 'exact_idf-paris-kiosk.txt' },
            { name: "JUST'LA", type: 'justla', file: 'exact_just-la.txt' },
            { name: 'Masters Research', type: 'research', file: 'exact_masters-research.txt' },
            { name: 'KmUn Grenoble', type: 'kmun', file: 'exact_kmun-grenoble.txt' },
            { name: 'Zixi Research Lab', type: 'zixi', file: 'exact_zixi-research-lab.txt' }
        ];

        // Create Student work 2018 folder
        this.createIcon({
            name: 'Student work\n2018',
            type: 'folder',
            gridX: 3,
            gridY: 0,
            action: () => {
                this.openStudentWorkFolder(studentProjects);
            }
        });

        // Main desktop projects
        const mainProjects = [
            { name: 'SennOS at\nsennder', type: 'sennos', file: 'exact_sennos.txt', gridX: 1, gridY: 0 },
            { name: 'Assembl by\nbluenove', type: 'assembl', file: 'exact_assembl.txt', gridX: 2, gridY: 0 },
            { name: 'X-TRACT', type: 'xtract', file: 'exact_x-tract.txt', gridX: 4, gridY: 0 },
            { name: 'Do Tank by\nCITEO', type: 'dotank', file: 'exact_owf.txt', gridX: 1, gridY: 1 },
            { name: "Movin'On HUB\nMICHELIN", type: 'movinon', file: 'exact_obside.txt', gridX: 2, gridY: 1 },
            { name: 'Graphic\nDesign', type: 'graphic-design', file: 'exact_graphic-design.txt', gridX: 3, gridY: 1 },
            { name: 'Fine Arts', type: 'fine-arts', file: 'exact_fine-arts.txt', gridX: 4, gridY: 1 },
            { name: 'Hackathon', type: 'hackathon', file: 'exact_hackathon.txt', gridX: 1, gridY: 2 }
        ];

        mainProjects.forEach(project => {
            this.createIcon({
                name: project.name,
                type: project.type,
                gridX: project.gridX,
                gridY: project.gridY,
                projectData: {
                    file: project.file,
                    title: project.name.replace(/\n/g, ' ')
                },
                action: () => {
                    if (window.projectViewer) {
                        window.projectViewer.openProject(project);
                    }
                }
            });
        });
    }

    openStudentWorkFolder(projects) {
        // Create folder window content with project icons
        let iconsHTML = '<div style="padding: 20px; display: flex; flex-wrap: wrap; gap: 20px;">';

        projects.forEach((project, index) => {
            iconsHTML += `
                <div class="folder-icon" data-project-index="${index}" style="
                    width: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                    padding: 8px;
                ">
                    <div style="font-size: 32px;">📄</div>
                    <div style="font-size: 11px; text-align: center; word-wrap: break-word;">${project.name}</div>
                </div>
            `;
        });

        iconsHTML += '</div>';

        const win = windowManager.createWindow({
            title: 'Student work 2018',
            width: 600,
            height: 400,
            content: iconsHTML
        });

        // Add click handlers to folder icons
        setTimeout(() => {
            const folderIcons = win.querySelectorAll('.folder-icon');
            folderIcons.forEach(icon => {
                icon.addEventListener('dblclick', () => {
                    const projectIndex = parseInt(icon.dataset.projectIndex);
                    const project = projects[projectIndex];
                    if (window.projectViewer) {
                        window.projectViewer.openProject(project);
                    }
                });

                // Single click to select
                icon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    folderIcons.forEach(i => i.style.background = 'transparent');
                    icon.style.background = 'rgba(0, 0, 128, 0.2)';
                });
            });
        }, 100);
    }

    selectIcon(iconEl) {
        this.deselectAll();
        iconEl.classList.add('selected');
        this.selectedIcon = iconEl;
    }

    deselectAll() {
        const icons = this.desktop.querySelectorAll('.desktop-icon');
        icons.forEach(icon => icon.classList.remove('selected'));
        this.selectedIcon = null;
    }

    showContextMenu(x, y) {
        this.contextMenu.style.left = x + 'px';
        this.contextMenu.style.top = y + 'px';
        this.contextMenu.style.display = 'block';
    }
}

// Initialize desktop
let desktop;
