// Space Invaders Game

class SpaceInvadersApp {
    open() {
        const tempId = 'spaceinvaders-' + Date.now();
        const windowId = windowManager.createWindow({
            title: 'Space Invaders',
            width: 480,
            height: 540,
            content: `
                <div style="display: flex; flex-direction: column; height: 100%; background: #000;">
                    <div style="
                        background: #c0c0c0;
                        padding: 4px 8px;
                        border-bottom: 2px solid #808080;
                        display: flex;
                        justify-content: space-between;
                        font-family: 'Courier New', monospace;
                        font-size: 12px;
                    ">
                        <div>Score: <span id="score-${tempId}">0</span></div>
                        <div>Lives: <span id="lives-${tempId}">3</span></div>
                    </div>
                    <canvas id="game-canvas-${tempId}" width="480" height="500" style="display: block;"></canvas>
                </div>
            `
        });

        setTimeout(() => {
            this.initGame(tempId);
        }, 0);

        return windowId;
    }

    initGame(tempId) {
        const canvas = document.getElementById(`game-canvas-${tempId}`);
        const scoreEl = document.getElementById(`score-${tempId}`);
        const livesEl = document.getElementById(`lives-${tempId}`);

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const game = {
            player: { x: 220, y: 460, w: 40, h: 20, speed: 5 },
            bullets: [],
            aliens: [],
            alienBullets: [],
            score: 0,
            lives: 3,
            alienDir: 1,
            alienSpeed: 1,
            gameOver: false,
            keys: {}
        };

        // Create aliens (5 rows, 8 columns)
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 8; col++) {
                game.aliens.push({
                    x: col * 50 + 40,
                    y: row * 40 + 40,
                    w: 30,
                    h: 20,
                    alive: true
                });
            }
        }

        // Keyboard controls
        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                game.keys[e.key] = e.type === 'keydown';
            }
        };

        document.addEventListener('keydown', keyHandler);
        document.addEventListener('keyup', keyHandler);

        // Game loop
        const update = () => {
            if (game.gameOver) return;

            // Move player
            if (game.keys['ArrowLeft'] && game.player.x > 0) {
                game.player.x -= game.player.speed;
            }
            if (game.keys['ArrowRight'] && game.player.x < canvas.width - game.player.w) {
                game.player.x += game.player.speed;
            }

            // Shoot
            if (game.keys[' ']) {
                if (game.bullets.length < 3) {
                    game.bullets.push({ x: game.player.x + game.player.w / 2 - 2, y: game.player.y, w: 4, h: 10 });
                }
                game.keys[' '] = false;
            }

            // Move bullets
            game.bullets = game.bullets.filter(b => {
                b.y -= 8;
                return b.y > 0;
            });

            // Move alien bullets
            game.alienBullets = game.alienBullets.filter(b => {
                b.y += 5;
                return b.y < canvas.height;
            });

            // Aliens shoot randomly
            if (Math.random() < 0.02) {
                const aliveAliens = game.aliens.filter(a => a.alive);
                if (aliveAliens.length > 0) {
                    const alien = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
                    game.alienBullets.push({ x: alien.x + alien.w / 2 - 2, y: alien.y + alien.h, w: 4, h: 10 });
                }
            }

            // Move aliens
            let changeDir = false;
            game.aliens.forEach(a => {
                if (!a.alive) return;
                a.x += game.alienDir * game.alienSpeed;
                if (a.x <= 0 || a.x >= canvas.width - a.w) {
                    changeDir = true;
                }
            });

            if (changeDir) {
                game.alienDir *= -1;
                game.aliens.forEach(a => {
                    a.y += 20;
                    if (a.alive && a.y + a.h >= game.player.y) {
                        game.gameOver = true;
                    }
                });
            }

            // Collision: bullets vs aliens
            game.bullets.forEach(b => {
                game.aliens.forEach(a => {
                    if (a.alive && collision(b, a)) {
                        a.alive = false;
                        b.y = -100;
                        game.score += 10;
                        scoreEl.textContent = game.score;
                    }
                });
            });

            // Collision: alien bullets vs player
            game.alienBullets.forEach(b => {
                if (collision(b, game.player)) {
                    b.y = canvas.height + 100;
                    game.lives--;
                    livesEl.textContent = game.lives;
                    if (game.lives <= 0) {
                        game.gameOver = true;
                    }
                }
            });

            // Win condition
            if (game.aliens.every(a => !a.alive)) {
                game.gameOver = true;
            }
        };

        const collision = (a, b) => {
            return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
        };

        const draw = () => {
            // Clear screen
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw player
            ctx.fillStyle = '#0f0';
            ctx.fillRect(game.player.x, game.player.y, game.player.w, game.player.h);
            ctx.fillRect(game.player.x + 15, game.player.y - 10, 10, 10);

            // Draw bullets
            ctx.fillStyle = '#ff0';
            game.bullets.forEach(b => {
                ctx.fillRect(b.x, b.y, b.w, b.h);
            });

            // Draw alien bullets
            ctx.fillStyle = '#f00';
            game.alienBullets.forEach(b => {
                ctx.fillRect(b.x, b.y, b.w, b.h);
            });

            // Draw aliens
            game.aliens.forEach(a => {
                if (!a.alive) return;
                ctx.fillStyle = '#0ff';
                ctx.fillRect(a.x, a.y, a.w, a.h);
                ctx.fillStyle = '#fff';
                ctx.fillRect(a.x + 5, a.y + 5, 8, 8);
                ctx.fillRect(a.x + 17, a.y + 5, 8, 8);
            });

            // Game over message
            if (game.gameOver) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#fff';
                ctx.font = '48px Arial';
                ctx.textAlign = 'center';
                const msg = game.aliens.every(a => !a.alive) ? 'YOU WIN!' : 'GAME OVER';
                ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
                ctx.font = '24px Arial';
                ctx.fillText(`Final Score: ${game.score}`, canvas.width / 2, canvas.height / 2 + 50);
                ctx.font = '16px Arial';
                ctx.fillStyle = '#0f0';
                ctx.fillText('Looking for exceptional design work? Hire Jordan!', canvas.width / 2, canvas.height / 2 + 90);
            }
        };

        const gameLoop = () => {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        };

        gameLoop();

        // Cleanup when window closes
        const windowEl = document.getElementById(`window-${windowId}`);
        if (windowEl) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.removedNodes.forEach((node) => {
                        if (node.id === `window-${windowId}`) {
                            document.removeEventListener('keydown', keyHandler);
                            document.removeEventListener('keyup', keyHandler);
                            observer.disconnect();
                        }
                    });
                });
            });
            observer.observe(windowEl.parentNode, { childList: true });
        }
    }
}

// Global instance
window.spaceInvadersApp = new SpaceInvadersApp();
