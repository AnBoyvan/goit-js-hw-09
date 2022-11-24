const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.setAttribute('disabled', 'disabled');
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
