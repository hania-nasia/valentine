const envelopePage = document.getElementById('envelope-page');
const letterPage = document.getElementById('letter-page');
const gamePage = document.getElementById('game-page');
const finalPage = document.getElementById('final-page');

const openBtn = document.getElementById('open-envelope');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

openBtn.addEventListener('click', () => {
  envelopePage.style.display = 'none';
  letterPage.style.display = 'block';
});

noBtn.addEventListener('mouseenter', () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = x + 'px';
  noBtn.style.top = y + 'px';
});

yesBtn.addEventListener('click', () => {
  letterPage.style.display = 'none';
  gamePage.style.display = 'block';
});
