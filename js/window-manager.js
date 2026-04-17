// Windows 98 Window Manager

class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndexCounter = 100;
        this.container = document.getElementById('windows-container');
    }

    createWindow(options) {
        const window = {
            id: 'win-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            title: options.title || 'Untitled',
            icon: options.icon || '',
            width: options.width || 600,
            height: options.height || 400,
            x: options.x !== undefined ? options.x : 100 + (this.windows.length * 30),
            y: options.y !== undefined ? options.y : 100 + (this.windows.length * 30),
            content: options.content || '',
            resizable: options.resizable !== false,
            minimized: false,
            maximized: false,
            zIndex: this.zIndexCounter++,
            onClose: options.onClose || null
        };

        this.windows.push(window);
        this.renderWindow(window);
        this.focusWindow(window.id);
        return window.id;
    }

    renderWindow(window) {
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = window.id;
        windowEl.style.width = window.width + 'px';
        windowEl.style.height = window.height + 'px';
        windowEl.style.left = window.x + 'px';
        windowEl.style.top = window.y + 'px';
        windowEl.style.zIndex = window.zIndex;

        windowEl.innerHTML = `
            <div class="window-titlebar" data-window-id="${window.id}">
                ${window.icon ? `<img src="${window.icon}" class="window-titlebar-icon" alt="">` : ''}
                <div class="window-titlebar-text">${window.title}</div>
                <div class="window-titlebar-buttons">
                    <button class="window-titlebar-button minimize" data-action="minimize" data-window-id="${window.id}"></button>
                    <button class="window-titlebar-button maximize" data-action="maximize" data-window-id="${window.id}"></button>
                    <button class="window-titlebar-button close" data-action="close" data-window-id="${window.id}"></button>
                </div>
            </div>
            <div class="window-content" id="${window.id}-content">
                ${window.content}
            </div>
            ${window.resizable ? `
                <div class="window-resize-handle n" data-direction="n"></div>
                <div class="window-resize-handle s" data-direction="s"></div>
                <div class="window-resize-handle e" data-direction="e"></div>
                <div class="window-resize-handle w" data-direction="w"></div>
                <div class="window-resize-handle ne" data-direction="ne"></div>
                <div class="window-resize-handle nw" data-direction="nw"></div>
                <div class="window-resize-handle se" data-direction="se"></div>
                <div class="window-resize-handle sw" data-direction="sw"></div>
            ` : ''}
        `;

        this.container.appendChild(windowEl);

        // Add event listeners
        this.attachWindowEvents(window.id);
        if (window.resizable) {
            this.attachResizeEvents(window.id);
        }
        this.addToTaskbar(window);
    }

    attachWindowEvents(windowId) {
        const windowEl = document.getElementById(windowId);
        const titlebar = windowEl.querySelector('.window-titlebar');

        // Make draggable
        let isDragging = false;
        let dragOffsetX, dragOffsetY;

        titlebar.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-titlebar-button')) return;

            isDragging = true;
            const rect = windowEl.getBoundingClientRect();
            dragOffsetX = e.clientX - rect.left;
            dragOffsetY = e.clientY - rect.top;

            this.focusWindow(windowId);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const window = this.getWindow(windowId);
            if (window.maximized) return;

            windowEl.style.left = (e.clientX - dragOffsetX) + 'px';
            windowEl.style.top = Math.max(0, e.clientY - dragOffsetY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Button actions
        const buttons = windowEl.querySelectorAll('.window-titlebar-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = button.dataset.action;
                const winId = button.dataset.windowId;

                if (action === 'minimize') this.minimizeWindow(winId);
                if (action === 'maximize') this.toggleMaximize(winId);
                if (action === 'close') this.closeWindow(winId);
            });
        });

        // Focus on click
        windowEl.addEventListener('mousedown', () => {
            this.focusWindow(windowId);
        });
    }

    attachResizeEvents(windowId) {
        const windowEl = document.getElementById(windowId);
        const resizeHandles = windowEl.querySelectorAll('.window-resize-handle');

        resizeHandles.forEach(handle => {
            handle.addEventListener('mousedown', (e) => {
                e.stopPropagation();

                const window = this.getWindow(windowId);
                if (window.maximized) return;

                const direction = handle.dataset.direction;
                const startX = e.clientX;
                const startY = e.clientY;
                const startWidth = windowEl.offsetWidth;
                const startHeight = windowEl.offsetHeight;
                const startLeft = windowEl.offsetLeft;
                const startTop = windowEl.offsetTop;

                const minWidth = 200;
                const minHeight = 150;

                const handleMouseMove = (e) => {
                    const deltaX = e.clientX - startX;
                    const deltaY = e.clientY - startY;

                    let newWidth = startWidth;
                    let newHeight = startHeight;
                    let newLeft = startLeft;
                    let newTop = startTop;

                    // Handle horizontal resizing
                    if (direction.includes('e')) {
                        newWidth = Math.max(minWidth, startWidth + deltaX);
                    } else if (direction.includes('w')) {
                        const potentialWidth = startWidth - deltaX;
                        if (potentialWidth >= minWidth) {
                            newWidth = potentialWidth;
                            newLeft = startLeft + deltaX;
                        }
                    }

                    // Handle vertical resizing
                    if (direction.includes('s')) {
                        newHeight = Math.max(minHeight, startHeight + deltaY);
                    } else if (direction.includes('n')) {
                        const potentialHeight = startHeight - deltaY;
                        if (potentialHeight >= minHeight) {
                            newHeight = potentialHeight;
                            newTop = Math.max(0, startTop + deltaY);
                        }
                    }

                    windowEl.style.width = newWidth + 'px';
                    windowEl.style.height = newHeight + 'px';
                    windowEl.style.left = newLeft + 'px';
                    windowEl.style.top = newTop + 'px';

                    // Update window object
                    window.width = newWidth;
                    window.height = newHeight;
                    window.x = newLeft;
                    window.y = newTop;
                };

                const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);

                this.focusWindow(windowId);
            });
        });
    }

    getWindow(windowId) {
        return this.windows.find(w => w.id === windowId);
    }

    focusWindow(windowId) {
        // Update z-indices
        this.windows.forEach(w => {
            const el = document.getElementById(w.id);
            if (el) {
                const titlebar = el.querySelector('.window-titlebar');
                if (w.id === windowId) {
                    w.zIndex = this.zIndexCounter++;
                    el.style.zIndex = w.zIndex;
                    titlebar.classList.remove('inactive');
                } else {
                    titlebar.classList.add('inactive');
                }
            }
        });

        // Update taskbar
        this.updateTaskbar();
    }

    minimizeWindow(windowId) {
        const window = this.getWindow(windowId);
        if (!window) return;

        window.minimized = true;
        const windowEl = document.getElementById(windowId);
        windowEl.classList.add('minimized');

        this.updateTaskbar();
    }

    restoreWindow(windowId) {
        const window = this.getWindow(windowId);
        if (!window) return;

        window.minimized = false;
        const windowEl = document.getElementById(windowId);
        windowEl.classList.remove('minimized');

        this.focusWindow(windowId);
    }

    toggleMaximize(windowId) {
        const window = this.getWindow(windowId);
        if (!window) return;

        window.maximized = !window.maximized;
        const windowEl = document.getElementById(windowId);

        if (window.maximized) {
            windowEl.classList.add('maximized');
        } else {
            windowEl.classList.remove('maximized');
        }
    }

    closeWindow(windowId) {
        const window = this.getWindow(windowId);
        if (!window) return;

        if (window.onClose) {
            window.onClose();
        }

        const windowEl = document.getElementById(windowId);
        if (windowEl) {
            windowEl.remove();
        }

        this.windows = this.windows.filter(w => w.id !== windowId);
        this.removeFromTaskbar(windowId);
    }

    addToTaskbar(window) {
        const taskbarButtons = document.getElementById('taskbar-buttons');

        const button = document.createElement('button');
        button.className = 'taskbar-button';
        button.id = 'taskbar-' + window.id;
        button.dataset.windowId = window.id;

        button.innerHTML = `
            ${window.icon ? `<img src="${window.icon}" alt="">` : ''}
            <span>${window.title}</span>
        `;

        button.addEventListener('click', () => {
            if (window.minimized) {
                this.restoreWindow(window.id);
            } else {
                this.focusWindow(window.id);
            }
        });

        taskbarButtons.appendChild(button);
        this.updateTaskbar();
    }

    removeFromTaskbar(windowId) {
        const button = document.getElementById('taskbar-' + windowId);
        if (button) {
            button.remove();
        }
    }

    updateTaskbar() {
        // Update active state of taskbar buttons
        this.windows.forEach(w => {
            const button = document.getElementById('taskbar-' + w.id);
            if (button) {
                // Find the focused window
                const focusedWindow = this.windows.reduce((prev, current) =>
                    (current.zIndex > prev.zIndex && !current.minimized) ? current : prev
                );

                if (w.id === focusedWindow.id && !w.minimized) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            }
        });
    }

    getWindowContent(windowId) {
        return document.getElementById(windowId + '-content');
    }
}

// Global instance
const windowManager = new WindowManager();
