const envelopePage = document.getElementById("envelope-page");
const letterPage = document.getElementById("letter-page");
const gamePage = document.getElementById("game-page");
const finalPage = document.getElementById("final-page");
const openBtn = document.getElementById("open-envelope");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const container = document.getElementById("button-container");

openBtn.addEventListener("click", () => {
    envelopePage.style.display = "none";
    letterPage.style.display = "block";
});

yesBtn.addEventListener("click", () => {
    letterPage.style.display = "none";
    gamePage.style.display = "block";
});

noBtn.style.left = noBtn.offsetLeft + "px";
noBtn.style.top = noBtn.offsetTop + "px";
let originalX = noBtn.offsetLeft;
let originalY = noBtn.offsetTop;

container.addEventListener("mousemove", (e) => {
    
    const rect = noBtn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 100) {
        
        const containerRect = container.getBoundingClientRect();
        const maxX = containerRect.width - noBtn.offsetWidth;
        const maxY = containerRect.height - noBtn.offsetHeight;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noBtn.style.position = "absolute";
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    }
});
