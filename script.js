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
        else if (percent < 99) percent += Math.random() * 0.4;

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
    document.body.appendChild(flash);

    setTimeout(() => {
        flash.style.transition = "opacity 0.15s";
        flash.style.opacity = "1";
    }, 500);

    setTimeout(() => {

        clearInterval(shakeInterval);

        crashPage.style.transform = "none";
        crashPage.style.filter = "none";

        overlay.remove();
        flash.remove();

        crashPage.classList.add("hidden");

        const blackReveal = document.getElementById("black-reveal");
        blackReveal.style.display = "grid";

        // Stay fully black for 1.5 seconds
        setTimeout(() => {
            startGlitchReveal();
        }, 1500);

    }, 5000);
}

// ================= BLACK REVEAL =================

function startGlitchReveal() {

    const blackReveal = document.getElementById("black-reveal");

    // Show empty game page behind black screen
    gamePage.classList.remove("hidden");

    const columns = 20;
    const rows = 12;

    blackReveal.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    blackReveal.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const tiles = [];

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement("div");
        tile.classList.add("reveal-tile");
        blackReveal.appendChild(tile);
        tiles.push(tile);
    }

    tiles.sort(() => Math.random() - 0.5);

    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("revealed");
        }, index * 20);
    });

    // AFTER reveal finishes → remove overlay → start game
    setTimeout(() => {
        blackReveal.innerHTML = "";
        blackReveal.style.display = "none";

        initGame(); // 🔥 GAME STARTS HERE (timer begins now)

    }, tiles.length * 20 + 500);
}

// ================= FULL PACMAN VALENTINE GAME =================

// (Everything below is unchanged from your original code)

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
const wallThickness = 4;
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

// (Rest of your game code remains EXACTLY the same)
