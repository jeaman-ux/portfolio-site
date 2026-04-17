// Snake Game

class SnakeApp {
    constructor() {
        this.tileSize = 20;
        this.gridWidth = 20;
        this.gridHeight = 15;
    }

    open() {
        const tempId = 'snake-' + Date.now();
        const windowId = windowManager.createWindow({
            title: 'Snake',
            width: 440,
            height: 380,
            content: `
                <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px; height: 100%; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-family: 'MS Sans Serif', sans-serif; font-size: 11px;">
                            Score: <span id="snake-score-${tempId}">0</span>
                        </div>
                        <button id="snake-restart-${tempId}" style="
                            padding: 2px 12px;
                            background: #c0c0c0;
                            border-top: 2px solid #fff;
                            border-left: 2px solid #fff;
                            border-right: 2px solid #000;
                            border-bottom: 2px solid #000;
                            cursor: pointer;
                            font-family: 'MS Sans Serif', sans-serif;
                            font-size: 11px;
                        ">New Game</button>
                    </div>
                    <canvas id="snake-canvas-${tempId}" width="400" height="300" style="
                        background: #000;
                        border: 2px inset #808080;
                        display: block;
                    "></canvas>
                </div>
            `
        });

        setTimeout(() => {
            this.initGame(tempId);
        }, 0);

        return windowId;
    }

    initGame(tempId) {
        const canvas = document.getElementById(`snake-canvas-${tempId}`);
        const scoreEl = document.getElementById(`snake-score-${tempId}`);
        const restartBtn = document.getElementById(`snake-restart-${tempId}`);

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let snake = [{x: 10, y: 7}];
        let direction = {x: 1, y: 0};
        let nextDirection = {x: 1, y: 0};
        let food = this.randomFood(snake);
        let score = 0;
        let gameOver = false;
        let gameLoop;

        const draw = () => {
            // Clear screen
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = '#0f0';
            snake.forEach((segment, i) => {
                ctx.fillRect(
                    segment.x * this.tileSize,
                    segment.y * this.tileSize,
                    this.tileSize - 2,
                    this.tileSize - 2
                );
            });

            // Draw food
            ctx.fillStyle = '#ff0';
            ctx.fillRect(
                food.x * this.tileSize,
                food.y * this.tileSize,
                this.tileSize - 2,
                this.tileSize - 2
            );

            // Draw game over
            if (gameOver) {
                ctx.fillStyle = '#f00';
                ctx.font = '20px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
                ctx.font = '12px Arial';
                ctx.fillStyle = '#0f0';
                ctx.fillText('Looking for exceptional design work? Hire Jordan!', canvas.width / 2, canvas.height / 2 + 30);
            }
        };

        const update = () => {
            if (gameOver) return;

            direction = nextDirection;

            // Move snake
            const head = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y
            };

            // Check wall collision
            if (head.x < 0 || head.x >= this.gridWidth ||
                head.y < 0 || head.y >= this.gridHeight) {
                gameOver = true;
                return;
            }

            // Check self collision
            if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver = true;
                return;
            }

            snake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                score++;
                scoreEl.textContent = score;
                food = this.randomFood(snake);
            } else {
                snake.pop();
            }
        };

        const handleKeyDown = (e) => {
            const key = e.key;

            // Prevent opposite direction
            if (key === 'ArrowUp' && direction.y === 0) {
                nextDirection = {x: 0, y: -1};
                e.preventDefault();
            } else if (key === 'ArrowDown' && direction.y === 0) {
                nextDirection = {x: 0, y: 1};
                e.preventDefault();
            } else if (key === 'ArrowLeft' && direction.x === 0) {
                nextDirection = {x: -1, y: 0};
                e.preventDefault();
            } else if (key === 'ArrowRight' && direction.x === 0) {
                nextDirection = {x: 1, y: 0};
                e.preventDefault();
            }
        };

        const startGame = () => {
            snake = [{x: 10, y: 7}];
            direction = {x: 1, y: 0};
            nextDirection = {x: 1, y: 0};
            food = this.randomFood(snake);
            score = 0;
            gameOver = false;
            scoreEl.textContent = score;

            if (gameLoop) clearInterval(gameLoop);
            gameLoop = setInterval(() => {
                update();
                draw();
            }, 150);
        };

        document.addEventListener('keydown', handleKeyDown);
        restartBtn.addEventListener('click', startGame);

        // Cleanup on window close
        const observer = new MutationObserver(() => {
            if (!document.getElementById(`snake-canvas-${windowId}`)) {
                clearInterval(gameLoop);
                document.removeEventListener('keydown', handleKeyDown);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        startGame();
    }

    randomFood(snake) {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
        } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
        return food;
    }
}

// Global instance
window.snakeApp = new SnakeApp();
