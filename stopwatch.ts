let timerId: number | undefined;
let elapsed: number = 0;
let startTime: number | undefined;
const timerDisplay = document.getElementById('timer') as HTMLDivElement;
const startStopBtn = document.getElementById('startStopBtn') as HTMLButtonElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
const lapBtn = document.getElementById('lapBtn') as HTMLButtonElement;

function updateTimeDisplay() {
  const now = performance.now();
  const time = elapsed + (startTime ? now - startTime : 0);

  const milliseconds = time % 1000;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / 60000) % 60);
  const hours = Math.floor((time / 3600000));
  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function startTimer() {
  if (!startTime) {
    startTime = performance.now() - elapsed;
    timerId = requestAnimationFrame(updateTime);
    startStopBtn.textContent = 'Stop';
    resetBtn.disabled = true;
    lapBtn.disabled = false;
  } else {
    elapsed += performance.now() - startTime;
    cancelAnimationFrame(timerId);
    startTime = undefined;
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = false;
    lapBtn.disabled = true;
  }
}

function updateTime() {
  updateTimeDisplay();
  timerId = requestAnimationFrame(updateTime);
}

function resetTimer() {
  cancelAnimationFrame(timerId);
  startTime = undefined;
  elapsed = 0;
  updateTimeDisplay();
  startStopBtn.textContent = 'Start';
  resetBtn.disabled = false;
  lapBtn.disabled = true;
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimeDisplay();

window.onload = () => {
  lapBtn.disabled = true;
};
