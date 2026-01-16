// Minesweeper Game (Simplified)

class MinesweeperApp {
    constructor() {
        this.gridSize = 9;
        this.mineCount = 10;
    }

    open() {
        const windowId = windowManager.createWindow({
            title: 'Minesweeper',
            width: 300,
            height: 350,
            content: `
                <div style="padding: 12px; display: flex; flex-direction: column; gap: 12px; height: 100%; box-sizing: border-box;">
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 8px;
                        background: #c0c0c0;
                        border: 2px inset #808080;
                    ">
                        <div style="
                            background: #000;
                            color: #f00;
                            padding: 4px 8px;
                            font-family: 'Courier New', monospace;
                            font-weight: bold;
                            font-size: 16px;
                        ">010</div>
                        <button style="
                            width: 32px;
                            height: 32px;
                            font-size: 20px;
                            background: #c0c0c0;
                            border-top: 2px solid #fff;
                            border-left: 2px solid #fff;
                            border-right: 2px solid #000;
                            border-bottom: 2px solid #000;
                            cursor: pointer;
                        " onclick="this.textContent = this.textContent === '🙂' ? '😎' : '🙂'">🙂</button>
                        <div style="
                            background: #000;
                            color: #f00;
                            padding: 4px 8px;
                            font-family: 'Courier New', monospace;
                            font-weight: bold;
                            font-size: 16px;
                        ">000</div>
                    </div>
                    <div id="minesweeper-grid-${windowId}" style="
                        display: grid;
                        grid-template-columns: repeat(9, 1fr);
                        gap: 0;
                        border: 3px inset #808080;
                        padding: 4px;
                        background: #c0c0c0;
                    "></div>
                    <div style="text-align: center; font-size: 10px; color: #808080;">
                        Simplified demo version
                    </div>
                </div>
            `
        });

        // Generate grid after window is created
        setTimeout(() => {
            this.generateGrid(windowId);
        }, 0);

        return windowId;
    }

    generateGrid(windowId) {
        const gridEl = document.getElementById(`minesweeper-grid-${windowId}`);
        if (!gridEl) return;

        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const cell = document.createElement('button');
            cell.style.cssText = `
                width: 24px;
                height: 24px;
                background: #c0c0c0;
                border-top: 2px solid #fff;
                border-left: 2px solid #fff;
                border-right: 2px solid #808080;
                border-bottom: 2px solid #808080;
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
                padding: 0;
            `;

            cell.addEventListener('click', () => {
                const random = Math.random();
                if (random < 0.1) {
                    cell.textContent = '💣';
                    cell.style.background = '#f00';
                } else {
                    const num = Math.floor(Math.random() * 4);
                    cell.textContent = num || '';
                    cell.style.borderTop = '1px solid #808080';
                    cell.style.borderLeft = '1px solid #808080';
                    cell.style.borderRight = 'none';
                    cell.style.borderBottom = 'none';
                    cell.style.background = '#c0c0c0';

                    // Color code numbers
                    if (num === 1) cell.style.color = '#0000ff';
                    if (num === 2) cell.style.color = '#008000';
                    if (num === 3) cell.style.color = '#ff0000';
                }
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                cell.textContent = cell.textContent === '🚩' ? '' : '🚩';
            });

            gridEl.appendChild(cell);
        }
    }
}

// Global instance
window.minesweeperApp = new MinesweeperApp();
