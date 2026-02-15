const envelopePage = document.getElementById("envelope-page");
const letterPage = document.getElementById("letter-page");
const gamePage = document.getElementById("game-page");
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
    gamePage.style.display = "block";
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
    }
});
