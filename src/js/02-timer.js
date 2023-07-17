import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
timer.style.cssText = `
display: flex;
column-gap: 24px;
margin-top: 24px;`;

const divField = document.querySelectorAll('.field');
divField.forEach(element => {
  element.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;`;
});

const spanValue = document.querySelectorAll('.value');
spanValue.forEach(element => {
  element.style.cssText = `
  font-size: 78px;
  color: blue;`;
});

const dateTimePicker = document.querySelector('#datetime-picker');

dateTimePicker.style.marginTop = '40px';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let countdownInterval;

let options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Notiflix.Notify.failure('Будь ласка, виберіть дату у майбутньому');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateCountdownUI(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// function startCountdown() {
//   const selectedDate = new Date(dateTimePicker.value);
//   const currentDate = new Date();
//   let timeDifference = selectedDate.getTime() - currentDate.getTime();

//   if (timeDifference <= 0) {
//     clearInterval(countdownInterval);
//     updateCountdownUI(0, 0, 0, 0);
//     Notiflix.Notify.success('Відлік завершено');
//     return;
//   }

//   countdownInterval = setInterval(() => {
//     const { days, hours, minutes, seconds } = convertMs(timeDifference);
//     updateCountdownUI(days, hours, minutes, seconds);
//     timeDifference -= 1000;

//     if (timeDifference < 1000) {
//       clearInterval(countdownInterval);
//       Notiflix.Notify.success('Відлік завершено');
//     }
//   }, 1000);
// }

function startCountdown() {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();
  let timeDifference = selectedDate.getTime() - currentDate.getTime();

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    updateCountdownUI(0, 0, 0, 0);
    Notiflix.Notify.success('Відлік завершено');
    return;
  }

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateCountdownUI(days, hours, minutes, seconds);
    timeDifference -= 1000;

    if (timeDifference < 1) {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Відлік завершено');
    }
  }, 1000);
}
startBtn.addEventListener('click', startCountdown);
