const envelopePage = document.getElementById("envelope-page");
ById("letter-page");
const crashPage = document.getElement");
const gamePage = document.getElement/paste this entire file into `scriptconst letterPage = document.getElementById("crash-pageById("game-page");
ById("final-pageconst finalPage = document.getElement");

const openBtn = document.getElementById("yes-btn");
ById("button-container");

let moveDistanceById("open-envelope");
const yesBtn = document.getElementconst noBtn = document.getElementById("no-btn");
const container = document.getElement ================= = 200;
const maxSpeed = 2500;

// PAGE SWITCHING =================Page.classList.add("hidden");
    letterPage.classList.removeyesBtn.addEventListener

openBtn.addEventListener("click", () => {
    envelope("hidden");
});

("click", () => {
    letterPage.class");
    crashPageList.add("hidden.classList.remove("hidden");

    setTimeout(() => {
        start 300);
});

// =================

container.addEventGlitch();
    }, RUNAWAY NO BUTTON =================Listener("mousemove", (e) => {

    const rect = noRect();
    const btnX = rect.left2;
    const btnBtn.getBoundingClient + rect.width / Y = rect.top + rect.height / 2;

    (distance < 120) {
 const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if
        const angle.cos(angle) * moveDistance;
        = Math.atan2(btnY - mouseY, btnX - mouseX);

        let newX = noBtn.offsetLeft + Math let newY = noBtn.offsetTop + Math.sin(angle) * move const maxX = containerBtn.offsetWidth;
Y = container.clientDistance;

       .clientWidth - no        const maxHeight - noBtn.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(new.top = newY + "pxY, maxY));

        noBtn.style.left = newX + "px";
        noBtn.style";

        if (            move;
        }
    }
});

// ================= FAKE LOADING =================

function startmoveDistance < maxSpeed) {
Distance *= 1.12Glitch() {

    const progressBar = document.getElementById("loading-progress let percent = 0;

    const load(() => {

       percent < 90) percent += Math.random() * 2;
");
    const percentText = document.getElementById("loading-percent");

   Interval = setInterval if (percent < 60) percent += Math.random() * 6;
        else if (        else if (percent < 100) percent += Math.random() * 1.5;
, 100);

        progressBar.style + "%";
        percentText.textContent clearInterval(load // 🔥 Glitch loading bar
           
        percent = Math.min(percent.width = percent = Math.floor(percent) + "%";

        if (percent >= 100) {
           Interval);

            progressBar.style.random()*10-5}px let glitchCount = 0;
            const glitchInterval = setInterval(() => {

               .transform =
                    `translate(${Math, ${Math.random()*10-5}px)`;

                progressBar.style.background = "#ff4da6"; // dark pink

                crashPage.style.filter =
                   .random()*360}deg)`;

                               if20) {
                    clearInterval(gl.transform = "none `hue-rotate(${Math glitchCount++;

 (glitchCount > itchInterval);
                    progressBar.style.filter = "none";
 =================";
                    progressBar.style.background = "#ff4da6";
                    crashPage.style                    triggerCrashEffect();
                }

            }, 60);
        }

    }, 120);
}

// SCREEN ================= ⭐

function trigger CRASH SHAKE → BLACK
// ⭐ FIXED VERSIONCrashEffect() {
    const blackReveal");

    // Shake effect
    let shake shakeInterval = {
        shake.transform = `
            = document.getElementById("black-revealAmount = 0;
    const setInterval(() =>Amount += 3;
        crashPage.style translate(${Math.random() * shakeAmount - shakeAmount / 2}px,
                      ${Math.random() shakeAmount / 2}px)
            * shakeAmount - rotate(${Math.random() * 6 - 3}deg)
(() => {
        crashPage.style the game page ( gamePage.classList        `;
    }, 40);

    setTimeout clearInterval(shakeInterval);
       .transform = "none";

        // Showstill empty)
        black overlay BEFORE("hidden");
       .display = "grid";

        // HideList.add("hidden UNDER the tiles
        initGame 1 second, then startTimeout(() => {
            request();
            });
    }, 1000);
}

//.remove("hidden");

        // ⭐ Show drawing the maze
        blackReveal.classList.remove blackReveal.style crash page
        crashPage.class");

        // ⭐ Initialize the game();

        // Wait reveal
        setAnimationFrame(() => {
                startTileReveal        }, 1000);

 =================VEAL ================= ⭐

function start BLACK GLITCH RE
// ⭐ FIXED VERSION const blackReveal");
    const tilesTileReveal() {
    = document.getElementById("black-reveal    let remaining = [...tiles];

    const interval(remaining.length, 3 + Math.floor(Math.random() * idx = Math.floor remaining.length tile = remaining = Array.from(blackReveal.children);

 = setInterval(() => {
        const count = Math.min 4));

        for (let i = 0; i < count; i++) {
            const(Math.random() *);
            const[idx];
            tile.classList.add("revealed");
            remaining.spliceReveal.style.display(idx, 1);
        }

        if (remaining.length === 0) {
            clearInterval(interval ================= const blackReveal = document.getElementById("black-revealTemplateColumns =repeat(${rows}, 1fr)`;

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.create);
            black = "none";
        }
    }, 80);
}

// BLACK TILE SETUP =================

function setupBlackTiles() {
   ");

    const columns = 10;
    const rows = 6;

    blackReveal.innerHTML = "";
    blackReveal.style.grid `repeat(${columns}, 1fr)`;
    blackReveal.style.gridTemplateRows = `Element("div");
 }
}

// =================        tile.classList.add("reveal-tile");
        blackReveal.appendChild(tile);
    GAME LOGIC (UNCH
// ⭐ EverythingANGED) ================= below here is EXACTLY your original code ⭐

const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,,0,0,0,0,0,0,0,01,0,1,1,1,1,1,1,,0,0,1,0,0,0,0,11,0,1],
  [1,0,1,1,0,1],
  [1,0,0,1,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,1,1,0,1,0,1,1,0,1,1,1,0,1],
  [1,0,0,1,0,1],
  [1,0,1,1,1,0,1,0,1,0,0,0,1,0,0,0,const gameContainer1,1,0,1,0,1],
  [0,1,0,0,0,2],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

 = document.getElementById("game");
const tileSize = 60;  
const wallThicknessEl;
let kisses = 60;
let score = 0;
let scoreEl, = 4;
const spriteSize = 40;
const kissSize = 32;

let player, enemy;
let playerEl, enemy [];
let enemyInterval, gameTimer;
let enemySpeed = 500;
let timeLeft = GAME INITIALIZATION =================
function initGame() {
  gameContainer;
  score = 0;
  timerEl;

// =================.innerHTML = "";
  kisses = [];
  enemySpeed = 500;
  timeLeft = 60 clearInterval(enemyInterval);
  clearInterval(gameTimer);

  createUI();
  drawMaze();
  createEnemy();
  placeEnemy();
  start UI: SCORE + TIMER =================
function createUI() {
  const ui = "space-between.style.alignItems = "center";
  uiContainer.style.width = maze[0].lengthPlayer();
  createKisses();
  updatePlayer();
  updateEnemy();
  startTimer();
}

// =================Container = document.createElement("div");
  uiContainer.style.display = "flex";
  uiContainer.style.justifyContent";
  uiContainer * tileSize + "px.style.margin = "0 auto 10px auto";

  scoreEl = document";
  uiContainer.createElement(".style.display = "flex";
  scoreEl.style.alignItems = "center";

  const.createElement("div");
  scoreEl kissIcon = documentIcon.style.heightIcon.style.object  kissIcon.style.marginRight = "5px";
  scoreEl.append  const scoreText = document.createElement("span");
  scoreText.textimg");
  kissIcon.src = "images/kiss.png";
  kiss = "35px";
  kissIcon.style.width = "auto";
  kissFit = "contain";
Child(kissIcon);

Content = score;
  scoreEl.appendChild(scoreText);

.createElement(".textContent = `Time: ${timeLeft6";

  uiContainer.appendChild(scoreEl);
  uiContainer  timerEl = documentdiv");
  timerEl}s`;
  timerEl.style.fontWeight = "bold";
  timerEl.style.color = "#ff4da.appendChild(timerEl);

  gameContainer.appendChild(uiContainer.createElement(".id = "maze-wrapper "relative";
  mazeWrapper.style.width = maze[0].length * tileSize + "px);

  const mazeWrapper = documentdiv");
  mazeWrapper";
  mazeWrapper.style.position =";
  mazeWrapper.length * tileSize.style.margin = ".appendChild(maze MAZE =================.style.height = maze + "px";
  mazeWrapper0 auto";
  gameContainerWrapper);
}

// =================
function drawMaze() {
  const mazeWrapper = documentmaze-wrapper");
.getElementById("  maze.forEach((.left = x * tilerow, y) => {
    row.forEach((cell, x) => {
      if (cell === 1) {
        const wall = document.createElement("div");
        wall.style.position = "absolute";
        wall.styleSize + "px";
        y * tileSize + " = tileSize + "px        wall.style #ff4da6`;
        mazeWrapper.appendChild(wall);
      wall.style.top =px";
        wall.style.width = tileSize + "px";
        wall.style.height";
        wall.style.background = "#ff4da6";
        wall.style.boxSizing = "border-box";
.border = `${wallThickness}px solid }
      if (cell const finishImg = document.create === 2) {
       .src = "images/me.png";
        finishImg.style.position finishImg.style.width = tileSize + "px";
       .height = tileSize + "px";
        finishImg.style.left = x * tileSize + "px";
       .top = y * tileSize mazeWrapper.append      }
    });
 PLAYER =================
function createElement("img");
        finishImg = "absolute";
        finishImg.style finishImg.style + "px";
       Child(finishImg);
  });
}

// =================Player() {
  player = { x: 1, y: 1 };
  playerEl = document.src = "images/player.createElement("img");
  playerEl "absolute";
  player.png";
  playerEl.style.position =El.style.width = spriteSize + "px";
  playerEl.style.height = spriteSize + "px";
  playerEl.style.transition = "0.1s";
  document.getElementById("maze-wrapper").append}
function updatePlayer() {
  playerChild(playerEl);
El.style.left = player.x * tileSize + (tileSize - spriteSize)/2 + "px";
  playerEl.style.top = player.y * tileSize + (tileSize - spriteSize)/2 + "px";
}

// ================= ENEMY =================.createElement("
function createEnemy() {
  enemy = { x: 12, y: 1 };
  enemyEl = documentdiv");
  enemyEl.style.position = "absolute";
  enemyEl.style.width = spriteSize + "px.height = spriteSize + "px";
  enemyEl.style.background = "black";
  enemy = "50%";
  enemy";
  enemyEl.styleEl.style.borderRadius.getElementById("maze-wrapper").appendSize)/2 + "px";
 = enemy.y * tile - spriteSize)/2isses() {
  constEl.style.zIndex = "1000";
  documentChild(enemyEl);
}
function updateEnemy() {
  enemyEl.style.left = enemy.x * tileSize + (tileSize - sprite  enemyEl.style.topSize + (tileSize + "px";
}

// ================= KISSES =================
function placeK mazeWrapper = document.getElementById("maze-wrapper");
  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      if        const kiss (cell === 0 && Math.random() < 0.2) {
Element("img");
";
        kiss.style = document.create        kiss.src = "images/kiss.png.position = "absolute + "px";
        kiss.style.left (tileSize - kiss.top = y * tileSizeSize)/2 + "px";
";
        kiss.style.height = kissSize kiss.style.width = "auto";
        = x * tileSize +Size)/2 + "px";
        kiss.style + (tileSize - kiss        kiss.style mazeWrapper.append.zIndex = "1";
        kisses.push({ x, y, el: kiss });
      }
    });
 =================
document.addEvent", (e) => {
  if (gamePage.classList.contains("hidden")) return;
  let;
  let newY = playerChild(kiss);
         });
}

// ================= PLAYER MOVEMENTListener("keydown newX = player.x.y;
  if (e.key === "ArrowUp") newY--;
  if (e.key === "ArrowDown") newY++;
  if (e.key === "ArrowLeft").key === "ArrowRight newX--;
  if (e 1) {
    player});

// ================= COLLISIONS =================
function checkColl = kisses.filter(kiss => {
    if.x && kiss.y ===      score++;
      updateScore();
      playerEl.src") newX++;
  if (maze[newY] && maze[newY][newX] !==.x = newX;
    player.y = newY;
    updatePlayer();
    checkCollisions();
  }
isions() {
  kisses (kiss.x === player player.y) {
      kiss.el.remove();
"; }, 1000);
      = "images/player-kissed.png";
      setTimeout(() => { playerEl.src = "images/player.png return false;
    }
    return true[player.y][player.x] === 2 && kisses;
  });

  if (maze    playerEl.src    clearInterval setTimeout(() => {
      gamePagehidden");
      final.length === 0) {
 = "images/us.png";
    clearInterval(enemyInterval);
(gameTimer);
   .classList.add(" 1500);
  }

  if.x && enemy.y ===Interval);
    clearInterval(gameTimer);
    initGame();

function updateScore() {
  scoreEl.querySelectorPage.classList.remove("hidden");
    }, (enemy.x === player player.y) {
    clearInterval(enemy  }
}

// ================= SCORE =================("span").textContent
function moveEnemy  const queue = [{ Array(maze.length = score;
}

// ================= ENEMY AI =================TowardsPlayer() {
 x: enemy.x, y: enemy.y, path: [] }];
  const visited =).fill(0).map(()));
  visited[enemy => Array(maze[0].length).fill(false.y][enemy.x] = true;
  const directions = [
    { dx: 0 dx: 0, dy: 1 },
: 0 },
    { dx: 1, dy: 0 },
  ];
, dy: -1 },
    {    { dx: -1, dy  while (queue.length) {
    const current = queue.shift();
    if (current.x === player.x &&.y) {
      if (current.path.length > 0) {
        enemy.x = current.path.y = current.path(d => {
      const nx = current.x + d.dy;
      if ( current.y === player[0].x;
        enemy[0].y;
      }
      return;
    }
    directions.forEach d.dx;
      const ny = current.y +][nx]) {
       : [...current.pathmaze[ny] && maze[ny][nx] !== 1 && maze[ny][nx] !== 2 && !visited[ny visited[ny][nx] = true;
        queue.push({ x: nx, y: ny, path    });
  }
}

// ENEMY LOOP =================(enemyInterval);
  enemyInterval =("hidden")) return;
    moveEnemyTowardsEnemy();
    checkCollisions();
    200) enemySpeedSpeed);
}

// ================= TIMER =================, { x: nx, y: ny }] });
      }
 =================
function startEnemy() {
  clearInterval setInterval(() => {
    if (gamePage.classList.containsPlayer();
    update if (enemySpeed > -= 1;
  }, enemy ${timeLeft}s`;

function startTimer() {
  gameTimer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time:    if (timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(enemyInterval);
      initGame();
    }
  }, 1000);
}

setupBlackTiles
setupBlackTiles();
