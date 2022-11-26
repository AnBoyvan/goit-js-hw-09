import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtnRef: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};

let chosenTime = 0;

refs.startBtnRef.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenTime = selectedDates[0].getTime();
    if (chosenTime < Date.now()) {
      Notiflix.Report.failure('Please choose a date in the future');
      return;
    }
    refs.startBtnRef.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalID: null,
  isActive: false,

  onStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const currentDate = Date.now();
    let counter = chosenTime - currentDate;

    this.intervalID = setInterval(() => {
      const timerComponents = convertMs(counter);
      if (counter < 0) {
        clearInterval(this.intervalID);
        return convertMs(0);
      } else {
        counter -= 1000;
        updateTimerDisplay(timerComponents);
      }
    }, 100);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addDoubleZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addDoubleZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addDoubleZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addDoubleZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addDoubleZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  refs.daysRef.textContent = `${days}`;
  refs.hoursRef.textContent = `${hours}`;
  refs.minutesRef.textContent = `${minutes}`;
  refs.secondsRef.textContent = `${seconds}`;
}

function onStartBtnClick() {
  timer.onStart();
}

refs.startBtnRef.addEventListener('click', onStartBtnClick);
