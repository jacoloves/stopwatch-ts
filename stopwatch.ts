let timerId: number | undefined;
let elapsed: number = 0;
let startTime: number | undefined;
let lastLapTime: number = 0;
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
    startTime = performance.now();
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

function addLap() {
  const now = performance.now();
  const totalElapsed = elapsed + (startTime ? now - startTime : 0);
  const lapTime = totalElapsed - lastLapTime;
  lastLapTime = totalElapsed;

  const lapTableBody = document.querySelector('#lapTable tbody') as HTMLTableSectionElement;

  const lapRow = lapTableBody.insertRow();
  lapRow.className = "border-b";

  const lapCell = lapRow.insertCell();
  lapCell.className = "px-4 py-2 border";

  const lapTimeCell = lapRow.insertCell();
  lapTimeCell.className = "px-4 py-2 border"

  const totalTimeCell = lapRow.insertCell();
  totalTimeCell.className = "px-4 py-2 border"

  lapCell.textContent = String(lapTableBody.rows.length);
  lapTimeCell.textContent = formatTime(lapTime);
  totalTimeCell.textContent = formatTime(totalElapsed);
}

function formatTime(milliseconds: number) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((seconds / 60) % 60);
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds % 1000).padStart(3, '0')}`;
}

startStopBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

updateTimeDisplay();

window.onload = () => {
  lapBtn.disabled = true;
};
