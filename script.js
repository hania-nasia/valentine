const envelopePage = document.getElementById("envelope-page");
const letterPage = document.getElementById("letter-page");
const crashPage = document.getElementById("crash-page");
const gamePage = document.getElementById("game-page");
const finalPage = document.getElementById("final-page");

const openBtn = document.getElementById("open-envelope");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const container = document.getElementById("button-container");

let moveDistance = 200;
const maxSpeed = 2500;



// ================= PAGE SWITCHING =================

openBtn.addEventListener("click", () => {
    envelopePage.classList.add("hidden");
    letterPage.classList.remove("hidden");
});

yesBtn.addEventListener("click", () => {
    letterPage.classList.add("hidden");
    crashPage.classList.remove("hidden");

    setTimeout(() => {
        startGlitch();
    }, 300);
});



// ================= RUNAWAY NO BUTTON =================

container.addEventListener("mousemove", (e) => {

    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 120) {

        const angle = Math.atan2(btnY - mouseY, btnX - mouseX);

        let newX = noBtn.offsetLeft + Math.cos(angle) * moveDistance;
        let newY = noBtn.offsetTop + Math.sin(angle) * moveDistance;

        const maxX = container.clientWidth - noBtn.offsetWidth;
        const maxY = container.clientHeight - noBtn.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";

        if (moveDistance < maxSpeed) {
            moveDistance *= 1.12;
        }
    }
});



// ================= FAKE LOADING =================

function startGlitch() {

    const progressBar = document.getElementById("loading-progress");
    const percentText = document.getElementById("loading-percent");

    let percent = 0;

    const loadInterval = setInterval(() => {

        if (percent < 60) {
            percent += Math.random() * 6;
        }
        else if (percent < 90) {
            percent += Math.random() * 2;
        }
        else if (percent < 99) {
            percent += Math.random() * 0.4;
        }

        percent = Math.min(percent, 99);

        progressBar.style.width = percent + "%";
        percentText.textContent = Math.floor(percent) + "%";

        if (percent >= 99) {
            clearInterval(loadInterval);

            setTimeout(() => {
                triggerCrashEffect();
            }, 1000);
        }

    }, 120);
}



// ================= EXPLOSION / GLITCH =================

function triggerCrashEffect() {

    const overlay = document.createElement("div");
    overlay.classList.add("glitch-overlay");
    crashPage.appendChild(overlay);

    let shakeAmount = 0;

    const shakeInterval = setInterval(() => {

        shakeAmount += 4;

        crashPage.style.transform =
            `translate(${Math.random() * shakeAmount - shakeAmount/2}px,
                       ${Math.random() * shakeAmount - shakeAmount/2}px)
             rotate(${Math.random() * 6 - 3}deg)`;

        crashPage.style.filter =
            `hue-rotate(${Math.random() * 360}deg)
             contrast(${1 + Math.random() * 2})`;

    }, 40);

    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "white";
    flash.style.opacity = "0";
    flash.style.zIndex = "10000";
    flash.style.pointerEvents = "none";
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.transition = "opacity 0.15s";
        flash.style.opacity = "1";
    }, 500);

    setTimeout(() => {

        clearInterval(shakeInterval);

        crashPage.style.transform = "none";
        crashPage.style.filter = "none";

        crashPage.classList.add("hidden");
        gamePage.classList.remove("hidden");

        overlay.remove();
        flash.remove();

    }, 5000);
}

// ================= PACMAN VALENTINE GAME (UPGRADED) =================

// Bigger, fully connected maze
// 1 = wall
// 0 = path
// 2 = finish

const maze = [
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,1,0,0,0,0,0,0,0,1],
[1,0,1,1,0,1,0,1,1,1,1,1,0,1],
[1,0,1,0,0,0,0,0,0,0,0,1,0,1],
[1,0,1,0,1,1,1,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,0,1,0,0,0,1],
[1,1,1,0,1,0,1,1,0,1,1,1,0,1],
[1,0,0,0,0,0,1,0,0,0,0,1,0,1],
[1,0,1,1,1,0,1,0,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,0,1,0,0,0,2],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const game = document.getElementById("game");
const tileSize = 50;
const spriteSize = 36; // keeps sprites inside tiles

let player, enemy;
let kisses = [];
let playerEl, enemyEl;
let enemySpeed = 500;
let enemyInterval;

function initGame() {

    game.innerHTML = "";
    kisses = [];
    enemySpeed = 500;

    drawMaze();
    createPlayer();
    createEnemy();
    placeKisses();
    updatePlayer();
    updateEnemy();
    startEnemy();
}

function drawMaze() {

    maze.forEach((row, y) => {
        row.forEach((cell, x) => {

            const tile = document.createElement("div");
            tile.style.position = "absolute";
            tile.style.width = tileSize + "px";
            tile.style.height = tileSize + "px";
            tile.style.left = x * tileSize + "px";
            tile.style.top = y * tileSize + "px";

            if (cell === 1) tile.style.background = "#ff4da6";
            if (cell === 2) tile.style.background = "gold";

            game.appendChild(tile);
        });
    });

    game.style.position = "relative";
    game.style.width = maze[0].length * tileSize + "px";
    game.style.height = maze.length * tileSize + "px";
    game.style.margin = "0 auto";
}

function createPlayer() {

    player = { x: 1, y: 1 };

    playerEl = document.createElement("img");
    playerEl.src = "images/player.png";
    playerEl.style.position = "absolute";
    playerEl.style.width = spriteSize + "px";
    playerEl.style.height = spriteSize + "px";
    playerEl.style.transition = "0.1s";

    game.appendChild(playerEl);
}

function createEnemy() {

    enemy = { x: 12, y: 1 };

    enemyEl = document.createElement("div");
    enemyEl.style.position = "absolute";
    enemyEl.style.width = spriteSize + "px";
    enemyEl.style.height = spriteSize + "px";
    enemyEl.style.background = "black";
    enemyEl.style.borderRadius = "50%";

    game.appendChild(enemyEl);
}

function placeKisses() {

    maze.forEach((row, y) => {
        row.forEach((cell, x) => {

            if (cell === 0 && Math.random() < 0.2) {

                const kiss = document.createElement("img");
                kiss.src = "images/kiss.png";
                kiss.style.position = "absolute";
                kiss.style.width = spriteSize + "px";
                kiss.style.height = spriteSize + "px";

                kiss.style.left = x * tileSize + (tileSize - spriteSize)/2 + "px";
                kiss.style.top = y * tileSize + (tileSize - spriteSize)/2 + "px";

                game.appendChild(kiss);

                kisses.push({ x, y, el: kiss });
            }
        });
    });
}

function updatePlayer() {
    playerEl.style.left = player.x * tileSize + (tileSize - spriteSize)/2 + "px";
    playerEl.style.top = player.y * tileSize + (tileSize - spriteSize)/2 + "px";
}

function updateEnemy() {
    enemyEl.style.left = enemy.x * tileSize + (tileSize - spriteSize)/2 + "px";
    enemyEl.style.top = enemy.y * tileSize + (tileSize - spriteSize)/2 + "px";
}

document.addEventListener("keydown", (e) => {

    if (gamePage.classList.contains("hidden")) return;

    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (maze[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
        updatePlayer();
        checkCollisions();
    }
});

function checkCollisions() {

    kisses = kisses.filter(kiss => {

        if (kiss.x === player.x && kiss.y === player.y) {

            kiss.el.remove();

            // temporary kissed effect
            playerEl.src = "images/player-kissed.png";

            setTimeout(() => {
                playerEl.src = "images/player.png";
            }, 100);

            return false;
        }
        return true;
    });

    // win
    if (maze[player.y][player.x] === 2) {

        playerEl.src = "images/player-kissed.png";

        setTimeout(() => {
            gamePage.classList.add("hidden");
            finalPage.classList.remove("hidden");
        }, 600);
    }

    // enemy collision
    if (enemy.x === player.x && enemy.y === player.y) {
        clearInterval(enemyInterval);
        initGame();
    }
}

function startEnemy() {

    clearInterval(enemyInterval);

    enemyInterval = setInterval(() => {

        const directions = [
            {x:0,y:-1},
            {x:0,y:1},
            {x:-1,y:0},
            {x:1,y:0}
        ];

        const move = directions[Math.floor(Math.random() * directions.length)];

        const newX = enemy.x + move.x;
        const newY = enemy.y + move.y;

        if (maze[newY] && maze[newY][newX] !== 1) {
            enemy.x = newX;
            enemy.y = newY;
            updateEnemy();
        }

        if (enemy.x === player.x && enemy.y === player.y) {
            clearInterval(enemyInterval);
            initGame();
        }

        // gradually speed up
        if (enemySpeed > 150) {
            enemySpeed -= 10;
            startEnemy();
        }

    }, enemySpeed);
}

// Start game when page appears
const observer = new MutationObserver(() => {
    if (!gamePage.classList.contains("hidden")) {
        initGame();
    }
});

observer.observe(gamePage, { attributes: true });
