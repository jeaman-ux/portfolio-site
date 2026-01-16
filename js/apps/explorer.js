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

        return windowId;
    }

    generateFolderIcons() {
        const folders = [
            { name: 'Portfolio Projects', icon: '📁' },
            { name: 'My Documents', icon: '📄' },
            { name: 'Control Panel', icon: '⚙️' },
            { name: 'Printers', icon: '🖨️' },
            { name: 'Network', icon: '🌐' }
        ];

        return folders.map(folder => `
            <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; text-align: center;">
                <div style="font-size: 32px; margin-bottom: 4px;">${folder.icon}</div>
                <div style="font-size: 11px; word-wrap: break-word; max-width: 80px;">${folder.name}</div>
            </div>
        `).join('');
    }
}

// Global instance
window.explorerApp = new ExplorerApp();
