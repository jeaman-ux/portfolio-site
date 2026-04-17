// Breakout Game

class BreakoutApp {
    open() {
        const tempId = 'breakout-' + Date.now();
        const windowId = windowManager.createWindow({
            title: 'Breakout',
            width: 480,
            height: 520,
            content: `
                <div style="padding: 12px; display: flex; flex-direction: column; gap: 8px; height: 100%; box-sizing: border-box;">
                    <div style="display: flex; justify-content: space-between; padding: 4px 8px; background: #c0c0c0; border: 2px inset #808080;">
                        <div>Score: <span id="breakout-score-${tempId}" style="font-weight: bold;">0</span></div>
                        <div id="breakout-status-${tempId}" style="font-weight: bold;">Press SPACE to start</div>
                    </div>
                    <canvas id="breakout-canvas-${tempId}" width="456" height="440" style="
                        border: 2px inset #808080;
                        background: #000;
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
        const canvas = document.getElementById(`breakout-canvas-${tempId}`);
        const scoreEl = document.getElementById(`breakout-score-${tempId}`);
        const statusEl = document.getElementById(`breakout-status-${tempId}`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Game state
        let score = 0;
        let gameStarted = false;
        let gameOver = false;

        // Paddle
        const paddle = {
            width: 80,
            height: 12,
            x: width / 2 - 40,
            y: height - 30,
            speed: 8,
            moveLeft: false,
            moveRight: false
        };

        // Ball
        const ball = {
            x: width / 2,
            y: height - 50,
            radius: 6,
            dx: 0,
            dy: 0,
            speed: 4
        };

        // Bricks
        const brickRows = 5;
        const brickCols = 8;
        const brickWidth = 50;
        const brickHeight = 20;
        const brickPadding = 6;
        const brickOffsetTop = 40;
        const brickOffsetLeft = 6;
        const bricks = [];

        // Initialize bricks
        for (let row = 0; row < brickRows; row++) {
            bricks[row] = [];
            for (let col = 0; col < brickCols; col++) {
                bricks[row][col] = { x: 0, y: 0, status: 1 };
            }
        }

        // Keyboard handlers
        const keyDown = (e) => {
            if (e.key === 'ArrowLeft') paddle.moveLeft = true;
            if (e.key === 'ArrowRight') paddle.moveRight = true;
            if (e.key === ' ' && !gameStarted && !gameOver) {
                gameStarted = true;
                ball.dx = 3;
                ball.dy = -4;
                statusEl.textContent = 'Playing';
            }
        };

        const keyUp = (e) => {
            if (e.key === 'ArrowLeft') paddle.moveLeft = false;
            if (e.key === 'ArrowRight') paddle.moveRight = false;
        };

        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);

        // Drawing functions
        function drawPaddle() {
            ctx.fillStyle = '#0f0';
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        function drawBall() {
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        function drawBricks() {
            const colors = ['#f00', '#ff0', '#0f0', '#0ff', '#00f'];
            for (let row = 0; row < brickRows; row++) {
                for (let col = 0; col < brickCols; col++) {
                    const brick = bricks[row][col];
                    if (brick.status === 1) {
                        brick.x = col * (brickWidth + brickPadding) + brickOffsetLeft;
                        brick.y = row * (brickHeight + brickPadding) + brickOffsetTop;
                        ctx.fillStyle = colors[row];
                        ctx.fillRect(brick.x, brick.y, brickWidth, brickHeight);
                    }
                }
            }
        }

        // Collision detection
        function detectBrickCollision() {
            for (let row = 0; row < brickRows; row++) {
                for (let col = 0; col < brickCols; col++) {
                    const brick = bricks[row][col];
                    if (brick.status === 1) {
                        if (ball.x > brick.x && ball.x < brick.x + brickWidth &&
                            ball.y > brick.y && ball.y < brick.y + brickHeight) {
                            ball.dy = -ball.dy;
                            brick.status = 0;
                            score += 10;
                            scoreEl.textContent = score;

                            // Check win
                            if (score === brickRows * brickCols * 10) {
                                statusEl.textContent = 'You Win! Hire Jordan for great design!';
                                gameOver = true;
                            }
                        }
                    }
                }
            }
        }

        // Update game state
        function update() {
            if (!gameStarted || gameOver) return;

            // Move paddle
            if (paddle.moveLeft && paddle.x > 0) {
                paddle.x -= paddle.speed;
            }
            if (paddle.moveRight && paddle.x + paddle.width < width) {
                paddle.x += paddle.speed;
            }

            // Move ball
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Ball wall collision
            if (ball.x + ball.radius > width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
            }
            if (ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
            }

            // Ball paddle collision
            if (ball.y + ball.radius > paddle.y &&
                ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
            }

            // Ball falls below paddle
            if (ball.y + ball.radius > height) {
                statusEl.textContent = 'Game Over! Hire Jordan for great design!';
                gameOver = true;
            }

            detectBrickCollision();
        }

        // Draw everything
        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);
            drawBricks();
            drawPaddle();
            drawBall();
        }

        // Game loop
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    }
}

// Global instance
window.breakoutApp = new BreakoutApp();
