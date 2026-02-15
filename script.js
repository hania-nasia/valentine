const envelopePage = document.getElementById("envelope-page");
const letterPage = document.getElementById("letter-page");
const gamePage = document.getElementById("game-page");
const crashPage = document.getElementById("crash-page");
const finalPage = document.getElementById("final-page");
const openBtn = document.getElementById("open-envelope");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const container = document.getElementById("button-container");

// 🔥 Speed variables
let moveDistance = 120;   // starting jump distance
const maxSpeed = 350;     // prevents it from becoming impossible

openBtn.addEventListener("click", () => {
    envelopePage.style.display = "none";
    letterPage.style.display = "block";
});

yesBtn.addEventListener("click", () => {
    letterPage.style.display = "none";
    crashPage.classList.remove("hidden");

    startGlitch();
});

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

        // 🔥 Gradually increase speed (smooth growth)
        if (moveDistance < maxSpeed) {
            moveDistance *= 1.01;   // increase by 7% each move
        }
    });

function startGlitch() {

    const progressBar = document.getElementById("loading-progress");
    const percentText = document.getElementById("loading-percent");

    let percent = 0;

    const loadInterval = setInterval(() => {

        if (percent < 99) {
            percent += Math.random() * 8;
            percent = Math.min(percent, 99);

            progressBar.style.width = percent + "%";
            percentText.textContent = Math.floor(percent) + "%";
        } 
        else {
            clearInterval(loadInterval);
            triggerCrashEffect();
        }

    }, 150);
}


function triggerCrashEffect() {

    const overlay = document.createElement("div");
    overlay.classList.add("glitch-overlay");
    crashPage.appendChild(overlay);

    let shakeAmount = 0;

    const shakeInterval = setInterval(() => {

        shakeAmount += 2;

        crashPage.style.transform =
            `translate(${Math.random() * shakeAmount - shakeAmount/2}px,
                       ${Math.random() * shakeAmount - shakeAmount/2}px)`;

    }, 50);

    setTimeout(() => {
        clearInterval(shakeInterval);
        crashPage.style.transform = "translate(0,0)";
        crashPage.classList.add("hidden");
        gamePage.classList.remove("hidden");
    }, 1500);
}
