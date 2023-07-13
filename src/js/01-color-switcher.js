const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  if ((this.click, true)) {
    startBtn.setAttribute('disabled', true);
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  if ((this.click, true)) {
    startBtn.removeAttribute('disabled');
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}