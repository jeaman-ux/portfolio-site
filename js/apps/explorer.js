// Windows Explorer / My Computer

class ExplorerApp {
    constructor() {
        this.currentPath = 'My Computer';
    }

    open() {
        const windowId = windowManager.createWindow({
            title: 'My Computer',
            width: 600,
            height: 450,
            content: `
                <div class="window-menubar">
                    <div class="window-menubar-item">File</div>
                    <div class="window-menubar-item">Edit</div>
                    <div class="window-menubar-item">View</div>
                    <div class="window-menubar-item">Go</div>
                    <div class="window-menubar-item">Favorites</div>
                    <div class="window-menubar-item">Help</div>
                </div>
                <div style="padding: 4px; background: #fff; border-bottom: 1px solid #808080;">
                    <div style="display: flex; gap: 4px; align-items: center; margin-bottom: 4px;">
                        <button class="dialog-button" style="width: 24px; height: 22px; padding: 0;">◄</button>
                        <button class="dialog-button" style="width: 24px; height: 22px; padding: 0;">►</button>
                        <button class="dialog-button" style="width: 24px; height: 22px; padding: 0;">⬆</button>
                        <div style="flex: 1; padding: 2px 4px; border: 1px inset #808080; background: #fff;">
                            📁 My Computer
                        </div>
                        <button class="dialog-button" style="width: 24px; height: 22px; padding: 0;">🔍</button>
                    </div>
                </div>
                <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, 80px); gap: 20px;">
                    ${this.generateFolderIcons()}
                </div>
            `
        });

        // Add click handlers after window is created
        setTimeout(() => {
            const windowEl = document.getElementById(windowId);
            if (windowEl) {
                const folderIcons = windowEl.querySelectorAll('.explorer-folder-icon');
                folderIcons.forEach(icon => {
                    icon.addEventListener('dblclick', () => {
                        const folderType = icon.dataset.folderType;
                        if (folderType === 'portfolio-projects') {
                            this.openPortfolioProjects();
                        }
                    });
                });
            }
        }, 100);

        return windowId;
    }

    generateFolderIcons() {
        const folders = [
            { name: 'Portfolio Projects', icon: '📁', type: 'portfolio-projects' },
            { name: 'My Documents', icon: '📄', type: 'documents' },
            { name: 'Control Panel', icon: '⚙️', type: 'control-panel' },
            { name: 'Printers', icon: '🖨️', type: 'printers' },
            { name: 'Network', icon: '🌐', type: 'network' }
        ];

        return folders.map(folder => `
            <div class="explorer-folder-icon" data-folder-type="${folder.type}" style="display: flex; flex-direction: column; align-items: center; cursor: pointer; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 4px;">${folder.icon}</div>
                <div style="font-size: 11px; word-wrap: break-word; max-width: 80px;">${folder.name}</div>
            </div>
        `).join('');
    }

    openPortfolioProjects() {
        const iconMap = {
            'concord': '<img src="assets/icons/notepad.png" style="width: 32px; height: 32px;">',
            'sennos': '🚛',
            'assembl': '👥',
            'xtract': '⛷️',
            'dotank': '♻️',
            'movinon': '🚗',
            'graphic-design': '🎨',
            'fine-arts': '🖼️',
            'hackathon': '💡'
        };

        const mainProjects = [
            { name: 'Concord (2023-2026)', type: 'concord', file: 'exact_concord.txt' },
            { name: 'SennOS at sennder (2021-2023)', type: 'sennos', file: 'exact_sennos.txt' },
            { name: 'Assembl by bluenove (2019-2021)', type: 'assembl', file: 'exact_assembl.txt' },
            { name: 'X-TRACT', type: 'xtract', file: 'exact_x-tract.txt' },
            { name: 'Do Tank by CITEO', type: 'dotank', file: 'exact_owf.txt' },
            { name: "Movin'On HUB MICHELIN", type: 'movinon', file: 'exact_obside.txt' },
            { name: 'Graphic Design', type: 'graphic-design', file: 'exact_graphic-design.txt' },
            { name: 'Fine Arts', type: 'fine-arts', file: 'exact_fine-arts.txt' },
            { name: 'Assises du Design', type: 'hackathon', file: 'exact_hackathon.txt' }
        ];

        // Create folder window content with project icons
        let iconsHTML = '<div style="padding: 20px; display: flex; flex-wrap: wrap; gap: 20px;">';

        mainProjects.forEach((project, index) => {
            const icon = iconMap[project.type] || '📄';
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
                    <div style="font-size: 32px;">${icon}</div>
                    <div style="font-size: 11px; text-align: center; word-wrap: break-word;">${project.name}</div>
                </div>
            `;
        });

        iconsHTML += '</div>';

        const windowId = windowManager.createWindow({
            title: 'Portfolio Projects',
            width: 700,
            height: 500,
            content: iconsHTML
        });

        // Add click handlers to folder icons
        setTimeout(() => {
            const windowEl = document.getElementById(windowId);
            if (windowEl) {
                const folderIcons = windowEl.querySelectorAll('.folder-icon');
                folderIcons.forEach(icon => {
                    icon.addEventListener('dblclick', () => {
                        const projectIndex = parseInt(icon.dataset.projectIndex);
                        const project = mainProjects[projectIndex];
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
            }
        }, 100);
    }
}

// Global instance
window.explorerApp = new ExplorerApp();
