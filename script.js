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

        if (percent < 60) percent += Math.random() * 6;
        else if (percent < 90) percent += Math.random() * 2;
        else if (percent < 100) percent += Math.random() * 1.5;

        percent = Math.min(percent, 100);

        progressBar.style.width = percent + "%";
        percentText.textContent = Math.floor(percent) + "%";

        if (percent >= 100) {
            clearInterval(loadInterval);

            let glitchCount = 0;
            const glitchInterval = setInterval(() => {

                progressBar.style.transform =
                    `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)`;

                progressBar.style.background = "#ff4da6";

                crashPage.style.filter =
                    `hue-rotate(${Math.random()*360}deg)`;

                glitchCount++;

                if (glitchCount > 20) {
                    clearInterval(glitchInterval);
                    progressBar.style.transform = "none";
                    progressBar.style.background = "#ff4da6";
                    crashPage.style.filter = "none";
                    triggerCrashEffect();
                }

            }, 60);
        }

    }, 120);
}

// ================= CRASH SHAKE → BLACK SCREEN =================
function triggerCrashEffect() {

    // Shake crash page
    let shakeAmount = 0;

    const shakeInterval = setInterval(() => {
        shakeAmount += 3;
        crashPage.style.transform = `
            translate(${Math.random()*shakeAmount - shakeAmount/2}px,
                      ${Math.random()*shakeAmount - shakeAmount/2}px)
            rotate(${Math.random()*6 - 3}deg)
        `;
    }, 40);

    setTimeout(() => {

        clearInterval(shakeInterval);
        crashPage.style.transform = "none";

        // Hide crash page completely
        crashPage.classList.add("hidden");

        // Show game page
        gamePage.classList.remove("hidden");

        // Initialize game
        initGame();

        // Create tiles
        setupBlackTiles();

        // Wait 1 second before tiles start disappearing
        setTimeout(() => {
            startTileReveal();
        }, 2000);

    }, 1000);
}

// ================= BLACK TILE REVEAL =================
// ⭐ FIXED VERSION ⭐

function startTileReveal() {
    const blackReveal = document.getElementById("black-reveal");
    const tiles = Array.from(blackReveal.children);

    let remaining = [...tiles];

    const interval = setInterval(() => {

        const count = Math.min(
            remaining.length,
            2 + Math.floor(Math.random() * 6)
        );

        for (let i = 0; i < count; i++) {

            const idx = Math.floor(Math.random() * remaining.length);
            const tile = remaining[idx];

            // Add glitch animation
            tile.classList.add("glitching");

            setTimeout(() => {
                tile.classList.remove("glitching");
                tile.classList.add("revealed");
            }, 80 + Math.random() * 120);

            remaining.splice(idx, 1);
        }

        if (remaining.length === 0) {
            clearInterval(interval);

     setTimeout(() => {
     blackReveal.style.display = "none";

    // Start everything AFTER reveal
     startEnemy();
     startTimer();

     }, 400);
        }

    }, 60);
}


// ================= BLACK TILE SETUP =================

function setupBlackTiles() {
    const blackReveal = document.getElementById("black-reveal");

    const tileSize = 80; // bigger = chunkier glitch
    const columns = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);

    blackReveal.innerHTML = "";
    blackReveal.style.display = "grid";
    blackReveal.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    blackReveal.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement("div");
        tile.classList.add("reveal-tile");
        blackReveal.appendChild(tile);
    }
}

// ================= GAME LOGIC (UNCHANGED) =================

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

const gameContainer = document.getElementById("game");
const tileSize = 60;      // larger tiles
const spriteSize = 40;
const kissSize = 32;

let player, enemy;
let playerEl, enemyEl;
let kisses = [];
let enemyInterval, gameTimer;
let enemySpeed = 500;
let timeLeft = 60;
let score = 0;
let scoreEl, timerEl;

// ================= GAME INITIALIZATION =================
function initGame() {
  gameContainer.innerHTML = "";
  kisses = [];
  enemySpeed = 500;
  timeLeft = 60;
  score = 0;
  clearInterval(enemyInterval);
  clearInterval(gameTimer);

  createUI();
  drawMaze();
  createPlayer();
  createEnemy();
  placeKisses();
  updatePlayer();
  updateEnemy();
}

// ================= UI =================
// ================= UI =================
function createUI() {
  const uiContainer = document.createElement("div");
  uiContainer.style.display = "flex";
  uiContainer.style.justifyContent = "space-between";
  uiContainer.style.alignItems = "center";
  uiContainer.style.width = maze[0].length * tileSize + "px";
  uiContainer.style.margin = "0 auto 10px auto";

  // Score
  scoreEl = document.createElement("div");
  scoreEl.style.display = "flex";
  scoreEl.style.alignItems = "center";

  const kissIcon = document.createElement("img");
  kissIcon.src = "images/kiss.png";
  kissIcon.style.height = "45px";       // smaller icon
  kissIcon.style.width = "auto";
  kissIcon.style.objectFit = "contain";
  kissIcon.style.marginRight = "5px";
  scoreEl.appendChild(kissIcon);

  const scoreText = document.createElement("span");
  scoreText.textContent = score;
  scoreText.style.fontSize = "25px";    // smaller font
  scoreText.style.fontWeight = "bold";
  scoreText.style.color = "#ff4da6";    // same color as timer
  scoreEl.appendChild(scoreText);

  // Timer
  timerEl = document.createElement("div");
  timerEl.textContent = `Time: ${timeLeft}s`;
  timerEl.style.fontSize = "16px";      // slightly smaller
  timerEl.style.fontWeight = "bold";
  timerEl.style.color = "#ff4da6";      // pink color

  uiContainer.appendChild(scoreEl);
  uiContainer.appendChild(timerEl);
  gameContainer.appendChild(uiContainer);

  const mazeWrapper = document.createElement("div");
  mazeWrapper.id = "maze-wrapper";
  mazeWrapper.style.position = "relative";
  mazeWrapper.style.width = maze[0].length * tileSize + "px";
  mazeWrapper.style.height = maze.length * tileSize + "px";
  mazeWrapper.style.margin = "0 auto";
  gameContainer.appendChild(mazeWrapper);
}
// ================= MAZE =================
function drawMaze() {
  const mazeWrapper = document.getElementById("maze-wrapper");
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        const wall = document.createElement("div");
        wall.style.position = "absolute";
        wall.style.left = x * tileSize + "px";
        wall.style.top = y * tileSize + "px";
        wall.style.width = tileSize + "px";
        wall.style.height = tileSize + "px";
        wall.style.background = "#ff4da6"; // fully pink walls
        mazeWrapper.appendChild(wall);
      }
      if (cell === 2) {
        const finishImg = document.createElement("img");
        finishImg.src = "images/me.png";
        finishImg.style.position = "absolute";
        finishImg.style.width = spriteSize + "px";
        finishImg.style.height = spriteSize + "px";
        finishImg.style.left = x * tileSize + (tileSize - spriteSize)/2 + "px";
        finishImg.style.top = y * tileSize + (tileSize - spriteSize)/2 + "px";
        mazeWrapper.appendChild(finishImg);
      }
    });
  });
}

// ================= PLAYER =================
function createPlayer() {
  player = { x: 1, y: 1 };
  playerEl = document.createElement("img");
  playerEl.src = "images/player.png";
  playerEl.style.position = "absolute";
  playerEl.style.width = spriteSize + "px";
  playerEl.style.height = spriteSize + "px";
  playerEl.style.transition = "0.1s";
  document.getElementById("maze-wrapper").appendChild(playerEl);
}

function updatePlayer() {
  playerEl.style.left = player.x * tileSize + (tileSize - spriteSize)/2 + "px";
  playerEl.style.top = player.y * tileSize + (tileSize - spriteSize)/2 + "px";
}

// ================= ENEMY =================
function createEnemy() {
  enemy = { x: 12, y: 1 };
  enemyEl = document.createElement("div");
  enemyEl.style.position = "absolute";
  enemyEl.style.width = spriteSize + "px";
  enemyEl.style.height = spriteSize + "px";
  enemyEl.style.background = "black";
  enemyEl.style.borderRadius = "50%";
  enemyEl.style.zIndex = "1000";
  document.getElementById("maze-wrapper").appendChild(enemyEl);
}

function updateEnemy() {
  enemyEl.style.left = enemy.x * tileSize + (tileSize - spriteSize)/2 + "px";
  enemyEl.style.top = enemy.y * tileSize + (tileSize - spriteSize)/2 + "px";
}

// ================= KISSES =================
function placeKisses() {
  const mazeWrapper = document.getElementById("maze-wrapper");
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0 && Math.random() < 0.2) {
        const kiss = document.createElement("img");
        kiss.src = "images/kiss.png";
        kiss.style.position = "absolute";
        kiss.style.height = kissSize + "px";
        kiss.style.width = "auto";
        kiss.style.left = x * tileSize + (tileSize - kissSize)/2 + "px";
        kiss.style.top = y * tileSize + (tileSize - kissSize)/2 + "px";
        kiss.style.zIndex = "1";
        mazeWrapper.appendChild(kiss);
        kisses.push({ x, y, el: kiss });
      }
    });
  });
}

// ================= PLAYER MOVEMENT =================
document.addEventListener("keydown", (e) => {
  if (gamePage.classList.contains("hidden")) return;
  let newX = player.x;
  let newY = player.y;
  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft") newX--;
  if (e.key === "ArrowRight") newX++;
  if (maze[newY] && maze[newY][newX] !== 1) {
    player.x = newX;
    player.y = newY;
    updatePlayer();
    checkCollisions();
  }
});

// ================= COLLISIONS =================
function checkCollisions() {
  kisses = kisses.filter(kiss => {
    if (kiss.x === player.x && kiss.y === player.y) {
      kiss.el.remove();
      score++;
      updateScore();
      playerEl.src = "images/player-kissed.png";
      setTimeout(() => { playerEl.src = "images/player.png"; }, 1000);
      return false;
    }
    return true;
  });

  if (maze[player.y][player.x] === 2 && kisses.length === 0) {
    playerEl.src = "images/us.png";
    clearInterval(enemyInterval);
    clearInterval(gameTimer);
    setTimeout(() => {
      gamePage.classList.add("hidden");
      finalPage.classList.remove("hidden");
    }, 1500);
  }

  if (enemy.x === player.x && enemy.y === player.y) {
    clearInterval(enemyInterval);
    clearInterval(gameTimer);
    initGame();
  }
}

// ================= SCORE =================
function updateScore() {
  scoreEl.querySelector("span").textContent = score;
}

// ================= ENEMY AI =================
function moveEnemyTowardsPlayer() {
  const queue = [{ x: enemy.x, y: enemy.y, path: [] }];
  const visited = Array(maze.length).fill(0).map(() => Array(maze[0].length).fill(false));
  visited[enemy.y][enemy.x] = true;
  const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];
  while (queue.length) {
    const current = queue.shift();
    if (current.x === player.x && current.y === player.y) {
      if (current.path.length > 0) {
        enemy.x = current.path[0].x;
        enemy.y = current.path[0].y;
      }
      return;
    }
    directions.forEach(d => {
      const nx = current.x + d.dx;
      const ny = current.y + d.dy;
      if (maze[ny] && maze[ny][nx] !== 1 && maze[ny][nx] !== 2 && !visited[ny][nx]) {
        visited[ny][nx] = true;
        queue.push({ x: nx, y: ny, path: [...current.path, { x: nx, y: ny }] });
      }
    });
  }
}

// ================= ENEMY LOOP =================
function startEnemy() {
  clearInterval(enemyInterval);
  enemyInterval = setInterval(() => {
    if (gamePage.classList.contains("hidden")) return;
    moveEnemyTowardsPlayer();
    updateEnemy();
    checkCollisions();
    if (enemySpeed > 200) enemySpeed -= 1;
  }, enemySpeed);
}

// ================= TIMER =================
function startTimer() {
  gameTimer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(enemyInterval);
      initGame();
    }
  }, 1000);
}
