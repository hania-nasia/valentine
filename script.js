const envelopePage = document.getElementById('envelope-page');
const letterPage = document.getElementById('letter-page');
const gamePage = document.getElementById('game-page');
const finalPage = document.getElementById('final-page');

const openBtn = document.getElementById('open-envelope');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const container = document.getElementById('button-container');

openBtn.addEventListener('click', () => {
  envelopePage.style.display = 'none';
  letterPage.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
  letterPage.style.display = 'none';
  gamePage.style.display = 'block';
});

const originalX = noBtn.offsetLeft;
const originalY = noBtn.offsetTop;

container.addEventListener('mousemove'), (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const rect = noBtn.getBoundingClientRect();
  const btnX = rect.left + rect.width /2;
  const btnY = rect.top + rect.height /2;

  const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

  if (distance < 100) {
    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
  } else {
    noBtn.style.left = originalX + 'px';
    noBtn.style.top = originalY + 'px';
  }
});
