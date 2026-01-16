// Notepad Application

class NotepadApp {
    constructor() {
        this.untitledCount = 1;
    }

    open(content = '') {
        const windowId = windowManager.createWindow({
            title: 'Untitled - Notepad',
            width: 600,
            height: 400,
            content: `
                <div class="window-menubar">
                    <div class="window-menubar-item">File</div>
                    <div class="window-menubar-item">Edit</div>
                    <div class="window-menubar-item">Search</div>
                    <div class="window-menubar-item">Help</div>
                </div>
                <textarea style="
                    width: 100%;
                    height: calc(100% - 18px);
                    border: none;
                    outline: none;
                    padding: 8px;
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    resize: none;
                    box-sizing: border-box;
                ">${content}</textarea>
            `
        });

        return windowId;
    }
}

// Global instance
window.notepadApp = new NotepadApp();
