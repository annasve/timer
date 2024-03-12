'use strict';

const audioElm = document.querySelector('audio');
const inputsElm = document.querySelectorAll('input');
const secondsElm = document.querySelector('#seconds');
const minutesElm = document.querySelector('#minutes');
const hoursElm = document.querySelector('#hours');

const DOMDigits = (hr, min, sec) => {
  hoursElm.value = String(hr).padStart(2, '0');
  minutesElm.value = String(min).padStart(2, '0');
  secondsElm.value = String(sec).padStart(2, '0');
};

//---validace vstupů, které uživatel píše
const validateInputs = (evt) => {
  if (!isPositiveNumber(evt.target.value) || Number(evt.target.value) > 59) {
    evt.target.value = '';
    alert('Zadávejte pouze číslice 0-59.');
  }
};

function isPositiveNumber(value) {
  return /^\d+$/.test(value);
}

//---akce tlačítka ve formuláři
const startCountdown = (evt) => {
  evt.preventDefault();

  let hours = Number(hoursElm.value);
  let minutes = Number(minutesElm.value);
  let seconds = Number(secondsElm.value);

  //--kontrola, aby uživatel nespustil časovač, když je vše 0 / ""
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return;
  }

  inputsElm.forEach((input) => {
    input.disabled = true;
  });
  document.querySelector('.btn--start').disabled = true;

  //--první nastavení v DOM (ihned po stisknutí tlačítka "start")
  DOMDigits(hours, minutes, seconds);

  //---funkce na odpočet
  const countdown = () => {
    //--snižování sekund
    seconds -= 1;

    //--snižování minut
    if (seconds === -1) {
      minutes -= 1;
      seconds = 59;
    }

    //snižování hodin
    if (minutes === -1) {
      hours -= 1;
      minutes = 59;
    }

    //---vypsání hodnot do DOM
    DOMDigits(hours, minutes, seconds);

    //--zazvonění budíku a vypnutí
    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(count);
      audioElm.play();

      inputsElm.forEach((input) => {
        input.value = '';
        input.disabled = false;
      });
      document.querySelector('.btn--start').disabled = false;
    }
  };

  // spuštění fce countdown nastává de facto v tomto kroku
  const count = setInterval(countdown, 1000);
};

document.querySelector('form').addEventListener('submit', startCountdown);

inputsElm.forEach((input) => {
  input.addEventListener('input', validateInputs);
});

//--F5 vynutí vymazání obsahu ve všech prvcích input
document.addEventListener('keyup', (evt) => {
  evt.preventDefault();
  if (evt.key === 'F5') {
    inputsElm.forEach((input) => {
      input.value = '';
    });
  }
});
