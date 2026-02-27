const.getElementById("envelope-page");
const letterPageById("letter-page = document.getElementById("crash-page");
const gamePage = document.getElementById("game-page");
const finalPage = = document.getElement");
const crashPage document.getElementById("final-page");

const openBtnById("open-envelope");
const yesBtn = document.getElement = document.getElementById("button-container ================= PAGE SWITCHING =================ById("yes-btn");
const noBtn = document.getElementById("no-btn");
const container = document.getElement");

let moveDistance = 200;
const maxSpeed = 2500;

//

openBtn.addEventListener("click",("hidden");
    letter("hidden");
});

 () => {
    envelopePage.classList.addPage.classList.removeyesBtn.addEventListener("click", () => {
    letterPage.class.classList.remove("hidden");

    setTimeout(() =>List.add("hidden");
    crashPage {
        startGlitch();
    }, 300);
});

// ================= RUNAWAY NO BUTTON =================

container.addEventBoundingClientRectListener("mousemove", (e) => {
    const rect = noBtn.get();
    const btnX = rect.left + rect.width / 2;
    const + rect.height / 2;

    const mouseX = e.clientX;
   .clientY;

    const distance = Math.hypot(mouseX - btn < 120) {
        btnY = rect.top const mouseY = eX, mouseY - btnY);

    if (distance const angle = Math.atan2(btnY - mouseY, btnX - mouseXY = noBtn.offset maxX = container);

        let newX = noBtn.offsetLeft + Math.cos(angle) * moveDistance;
        let newTop + Math.sin(angle) * moveDistance;

        const        const maxY = container.clientX, maxX));
       .clientWidth - noBtn.offsetWidth;
Height - noBtn.offsetHeight;

        newX = Math.max(0, Math.min(new newY = Math.max(0, Math.min(newY, maxY));

        = newX + "px";
        noBtn.style.top = newY + "px";

        if (;
        }
    }
 FAKE LOADING ================= noBtn.style.left progressBar = documentmoveDistance < maxSpeed) {
            moveDistance *= 1.12});

// =================

function startGlitch() {
    const.getElementById("loading-progressText = document.getElementById("loading-percent");

   (() => {
        if (percent < 60) percent += Math.random() * 6;
        else if (");
    const percent let percent = 0;

    const loadInterval = setInterval        else if (percent < 90) percent += Math.random() * 2;
percent < 100) percent += Math.random() * 1.5;

        percent = Math.min(percent, 100);

        progressBar.style.width = percent + "%";
        percentText.textContent = Math.floor(percent) + "%";

        if (percent >= 100) {
            const glitchInterval clearInterval(loadInterval);

            let glitchCount = 0;
            = setInterval(() progressBar.style10-5}px)`;

               .background = "#.filter =
                    => {
               .transform =
                    `translate(${Math.random()*10-5}px, ${Math.random()* progressBar.styleff4da6";
                crashPage.style `hue-rotate(${Math)`;

               .random()*360}deg glitchCount++;

itchInterval);
                   .transform = "none.filter = "none";
                   ();
                               if (glitchCount > 20) {
                    clearInterval(gl progressBar.style";
                    crashPage.style triggerCrashEffect }
            }, 60);
        }
    }, 120);
}

// CRASH SHAKE → BLACK SCREEN =================    const blackReveal = document.getElement");

    let shake =================

function triggerCrashEffect() {
ById("black-revealAmount = 0;
    const shakeInterval =Amount += 3;
        translate(${Math}px,
                     shakeAmount - shake setInterval(() => {
        shake crashPage.style.transform = `
           .random()*shakeAmount - shakeAmount/2()*6 - 3}deg)
        `;
    }, 40);

    setTimeout(() => {
        clear (still empty)
        ${Math.random()*Amount/2}px)
            rotate(${Math.randomInterval(shakeInterval);
        crashPage.style.transform = "none";

        // Show game page gamePage.classList.remove("hidden");

        // Show black overlay BEFORE drawing the maze
       List.remove("hidden blackReveal.class");
        blackReveal.style.display // Hide crash page
        crashPage // Initialize game UNDER the tiles = "grid";

       .classList.add("hidden");

       
        initGame();

        // After 1 second, start setTimeout(() => {
            requestAnimationFrame(() startTileReveal();
            });
        }, 1000);

 ================= BLACK TILE REVETileReveal() {
    tile reveal
        => {
                   }, 1000);
}

//AL =================

function start = document.getElement const blackRevealById("black-revealReveal.children);

 = [...tiles];

    const interval");
    const tiles = Array.from(black    let remaining = setInterval(() count = Math.min => {
        const(remaining.length, 3 + Math.floor));

        for(Math.random()*4 (let i = 0; i < count; i++) {
(Math.random() *("revealed");
            remaining.splice(idx, 1);
        }

        if (remaining.length            const idx = Math.floor remaining.length);
            const tile = remaining[idx];
            tile.classList.add === 0) {
           );
            blackReveal.style.display }
    }, 80);
}

// clearInterval(interval = "none";
        =================BlackTiles() {
    const blackReveal ================= BLACK TILE SETUP

function setup = document.getElementById("black-reveal rows = 6;

    black = "";
    black `repeat(${columnsReveal.style.grid");

    const columns = 10;
    constReveal.innerHTMLReveal.style.gridTemplateColumns =}, 1fr)`;
    blackTemplateRows = `repeat(${rows}, let i = 0; i < columns * rows; i++) {
        const tile = document.createElement("div");
List.add("reveal blackReveal.appendChild(tile);
    }
}

// =================1fr)`;

    for (        tile.class-tile");
        GAME LOGIC (UNCHANGED) =================
// Your entire maze, player, enemy, timer, score code stays exactly as you wrote it.

setupBlackTiles();


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
const wallThickness = 4; // thinner
const spriteSize = 40;
const kissSize = 32; // bigger for score & gameplay

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
  uiContainer.style.alignItems = "center";
  uiContainer.style.width = maze[0].length * tileSize + "px";
  uiContainer.style.margin = "0 auto 10px auto";

  // Score
  scoreEl = document.createElement("div");
  scoreEl.style.display = "flex";
  scoreEl.style.alignItems = "center";

  const kissIcon = document.createElement("img");
  kissIcon.src = "images/kiss.png";
  kissIcon.style.height = "35px"; // bigger
  kissIcon.style.width = "auto";   // maintain proportions
  kissIcon.style.objectFit = "contain";
  kissIcon.style.marginRight = "5px";
  scoreEl.appendChild(kissIcon);

  const scoreText = document.createElement("span");
  scoreText.textContent = score;
  scoreEl.appendChild(scoreText);

  // Timer
  timerEl = document.createElement("div");
  timerEl.textContent = `Time: ${timeLeft}s`;
  timerEl.style.fontWeight = "bold";
  timerEl.style.color = "#ff4da6"; // same pink as walls

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
      if (cell === 1) {
        const wall = document.createElement("div");
        wall.style.position = "absolute";
        wall.style.left = x * tileSize + "px";
        wall.style.top = y * tileSize + "px";
        wall.style.width = tileSize + "px";
        wall.style.height = tileSize + "px";
        wall.style.background = "#ff4da6";
        wall.style.boxSizing = "border-box";
        wall.style.border = `${wallThickness}px solid #ff4da6`; // thin continuous line
        mazeWrapper.appendChild(wall);
      }
      if (cell === 2) {
        const finishImg = document.createElement("img");
        finishImg.src = "images/me.png";
        finishImg.style.position = "absolute";
        finishImg.style.width = tileSize + "px";
        finishImg.style.height = tileSize + "px";
        finishImg.style.left = x * tileSize + "px";
        finishImg.style.top = y * tileSize + "px";
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
  enemyEl.style.zIndex = "1000"; // on top of kisses
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
        kiss.style.width = "auto";   // maintain proportions
        kiss.style.left = x * tileSize + (tileSize - kissSize)/2 + "px";
        kiss.style.top = y * tileSize + (tileSize - kissSize)/2 + "px";
        kiss.style.zIndex = "1"; // kisses below enemy
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
    }, 1500); // 1.5s
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
    timerEl.textContent = `Time: ${timeLeft}s`; // original format
    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(enemyInterval);
      initGame();
    }
  }, 1000);
}

setupBlackTiles();
