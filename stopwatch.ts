let timerId: number | undefined;
let time = 0;
const timerDisplay = document.getElementById('timer') as HTMLDivElement;
const startStopBtn = document.getElementById('startStopBtn') as HTMLButtonElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

function updateTimeDisplay() {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000) % 60;
  const hours = Math.floor(time / 3600000);
  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (!timerId) {
    timerId = setInterval(() => {
      time += 1000;
      updateTimeDisplay();
    }, 1000);
    startStopBtn.textContent = 'Stop';
  } else {
    clearInterval(timerId);
    timerId = undefined;
    startStopBtn.textContent = 'Start';
  }
}

function resetTimer() {
  clearInterval(timerId);
  timerId = undefined;
  time = 0;
  updateTimeDisplay();
  startStopBtn.textContent = 'Start';
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimeDisplay();
