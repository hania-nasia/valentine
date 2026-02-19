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

            // 🔥 Glitch loading bar
            let glitchCount = 0;
            const glitchInterval = setInterval(() => {

                progressBar.style.transform =
                    `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)`;

                progressBar.style.background =
                    `hsl(${Math.random()*360}, 100%, 50%)`;

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

    const blackReveal = document.getElementById("black-reveal");

    let shakeAmount = 0;

    const shakeInterval = setInterval(() => {
        shakeAmount += 3;

        crashPage.style.transform =
            `translate(${Math.random()*shakeAmount - shakeAmount/2}px,
                       ${Math.random()*shakeAmount - shakeAmount/2}px)
             rotate(${Math.random()*6 - 3}deg)`;
    }, 40);

    // Shake lasts 1 second
    setTimeout(() => {

        clearInterval(shakeInterval);
        crashPage.style.transform = "none";

        // 🔥 SHOW BLACK FIRST (prevents pink flash)
        blackReveal.style.display = "block";
        blackReveal.style.background = "black";
        blackReveal.style.inset = "0";
        blackReveal.style.position = "fixed";
        blackReveal.style.zIndex = "20000";

        // THEN hide crash page
        crashPage.classList.add("hidden");

        // EXACT 1.5 seconds full black
        setTimeout(() => {
            startGlitchReveal();
        }, 1500);

    }, 1000);
}

// ================= BLACK GLITCH REVEAL =================

function startGlitchReveal() {

    const blackReveal = document.getElementById("black-reveal");

    // Show game behind black
    gamePage.classList.remove("hidden");

    const columns = 30;
    const rows = 18;

    blackReveal.innerHTML = "";
    blackReveal.style.display = "grid";
    blackReveal.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    blackReveal.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const tiles = [];

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement("div");
        tile.style.background = "black";
        tile.style.opacity = "1";
        tile.style.transition = "opacity 0.3s ease";
        blackReveal.appendChild(tile);
        tiles.push(tile);
    }

    // Shuffle tiles randomly
    tiles.sort(() => Math.random() - 0.5);

    // Total reveal duration ~1 second
    const revealDuration = 1000;
    const intervalTime = revealDuration / tiles.length;

    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.style.opacity = "0";
        }, index * intervalTime);
    });

    // After reveal completes
    setTimeout(() => {

        blackReveal.style.display = "none";
        blackReveal.innerHTML = "";

        initGame(); // 🔥 TIMER STARTS HERE

    }, revealDuration + 100);
}
