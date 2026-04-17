// Main Application Initialization

document.addEventListener('DOMContentLoaded', () => {
    console.log('Jordan Design Portfolio 2026');
    console.log('Initializing...');

    // Initialize desktop after a short delay to ensure all scripts are loaded
    setTimeout(() => {
        desktop = new Desktop();
        console.log('Desktop initialized');

        // Initialize terminal
        window.terminal = new Terminal();
        console.log('Terminal initialized');

        console.log('System ready!');

        // Show welcome message
        setTimeout(() => {
            showWelcomeMessage();
        }, 500);
    }, 100);
});

function showWelcomeMessage() {
    const windowId = windowManager.createWindow({
        title: 'Welcome to Jordan\'s Portfolio',
        width: 400,
        height: 250,
        content: `
            <div style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="font-size: 48px;">💻</div>
                    <div>
                        <h3 style="margin: 0 0 12px 0; color: #000080;">Welcome!</h3>
                        <p style="margin: 0 0 8px 0; line-height: 1.5;">
                            Jordan Design Portfolio 2026 - An interactive portfolio experience presented as a Windows 98 desktop. Explore to discover my work!
                        </p>
                        <p style="margin: 0 0 8px 0; line-height: 1.5;">
                            <strong>Double-click</strong> any project icon on the desktop to view the full project details.
                        </p>
                        <p style="margin: 0 0 8px 0; line-height: 1.5;">
                            Explore the <strong>Start Menu</strong> for apps like Notepad and Minesweeper!
                        </p>
                        <p style="margin: 0; line-height: 1.5;">
                            Try <strong>"Eco-friendly Mode"</strong> in Start Menu for a text-only terminal interface!
                        </p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; padding: 8px; background: #fffacd; border: 1px solid #f0e68c;">
                    <span>💡</span>
                    <span style="font-size: 10px;">
                        Tip: You can drag windows, minimize them, and use the taskbar to switch between open windows.
                    </span>
                </div>
                <div style="text-align: right;">
                    <button class="dialog-button" id="welcome-ok-btn">
                        OK
                    </button>
                </div>
            </div>
        `
    });

    // Center the welcome window and attach event handler
    const windowEl = document.getElementById(windowId);
    if (windowEl) {
        windowEl.style.left = (window.innerWidth / 2 - 200) + 'px';
        windowEl.style.top = (window.innerHeight / 2 - 175) + 'px';

        // Attach OK button handler
        const okBtn = windowEl.querySelector('#welcome-ok-btn');
        if (okBtn) {
            okBtn.addEventListener('click', () => {
                windowManager.closeWindow(windowId);
            });
        }
    }
}

// Prevent context menu on images and other elements
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG' || e.target.closest('.window')) {
        // Allow context menu on images in windows
        return;
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Could update window positions if needed
});

console.log('Main script loaded');
