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

// ================= FULL PACMAN VALENTINE GAME =================

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
const tileSize = 60;  
const wallGap = 8;           // New: small gap for thicker tiles look
const spriteSize = 40;        // Player & enemy
const kissSize = 30;          // Kisses in maze
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
  startEnemy();
  startTimer();
}

// ================= UI: SCORE + TIMER =================
function createUI() {
  const uiContainer = document.createElement("div");
  uiContainer.style.display = "flex";
  uiContainer.style.justifyContent = "space-between";
  uiContainer.style.alignItems = "center";  // Align score & timer
  uiContainer.style.width = maze[0].length * tileSize + "px";
  uiContainer.style.margin = "0 auto 10px auto";
  uiContainer.style.fontSize = "24px";
  uiContainer.style.fontWeight = "bold";
  uiContainer.style.color = "red";

  // Score
  scoreEl = document.createElement("div");
  scoreEl.style.display = "flex";
  scoreEl.style.alignItems = "center";

  const kissIcon = document.createElement("img");
  kissIcon.src = "images/kiss.png";
  kissIcon.style.width = "35px";  // bigger than before
  kissIcon.style.height = "35px"; // proportional
  kissIcon.style.marginRight = "5px";
  scoreEl.appendChild(kissIcon);

  const scoreText = document.createElement("span");
  scoreText.textContent = score;
  scoreEl.appendChild(scoreText);

  // Timer
  timerEl = document.createElement("div");
  timerEl.textContent = `Time: ${timeLeft}s`;

  uiContainer.appendChild(scoreEl);
  uiContainer.appendChild(timerEl);

  gameContainer.appendChild(uiContainer);

  // Maze wrapper
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
      if (cell === 1 || cell === 0) {
        const tile = document.createElement("div");
        tile.style.position = "absolute";
        tile.style.width = tileSize - wallGap + "px";  // smaller for gap
        tile.style.height = tileSize - wallGap + "px";
        tile.style.left = x * tileSize + wallGap/2 + "px";
        tile.style.top = y * tileSize + wallGap/2 + "px";
        if (cell === 1) {
          tile.style.background = "#ff4da6";
          tile.style.boxSizing = "border-box";
          tile.style.border = "2px solid #ffe6f0"; // thin walls
        }
        mazeWrapper.appendChild(tile);
      }
      if (cell === 2) {
        const finishImg = document.createElement("img");
        finishImg.src = "images/me.png";
        finishImg.style.position = "absolute";
        finishImg.style.width = tileSize - wallGap + "px";
        finishImg.style.height = tileSize - wallGap + "px";
        finishImg.style.left = x * tileSize + wallGap/2 + "px";
        finishImg.style.top = y * tileSize + wallGap/2 + "px";
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
        kiss.style.width = kissSize + "px";
        kiss.style.height = kissSize + "px";
        kiss.style.left = x * tileSize + (tileSize - kissSize)/2 + "px";
        kiss.style.top = y * tileSize + (tileSize - kissSize)/2 + "px";
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
  // Kiss collection
  kisses = kisses.filter(kiss => {
    if (kiss.x === player.x && kiss.y === player.y) {
      kiss.el.remove();
      score++;
      updateScore();
      playerEl.src = "images/player-kissed.png";
      setTimeout(() => { playerEl.src = "images/player.png"; }, 1000); // 1s
      return false;
    }
    return true;
  });

  // Win condition only if all kisses collected
  if (maze[player.y][player.x] === 2 && kisses.length === 0) {
    playerEl.src = "images/us.png";
    clearInterval(enemyInterval);
    clearInterval(gameTimer);
    setTimeout(() => {
      gamePage.classList.add("hidden");
      finalPage.classList.remove("hidden");
    }, 1500); // 1.5s
  }

  // Enemy collision
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

// ================= ENEMY AI (BFS pathfinding) =================
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
    if (enemySpeed > 200) { enemySpeed -= 1; startEnemy(); }
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

// ================= START GAME WHEN PAGE SHOWN =================
const observer = new MutationObserver(() => {
  if (!gamePage.classList.contains("hidden")) initGame();
});
observer.observe(gamePage, { attributes: true });
