const buttonContainer = document.querySelector('.button-container');
const showChosenNumber = document.querySelector('.show-chosen-number');
const historyOperator = document.querySelector('.history-operator');

function showNumber(number) {
   console.log(number);
   showChosenNumber.innerHTML += number;
}

function calcHandler(e) {
   const chosen = e.target;
   if (chosen.classList.contains('number')) {
      const number = parseInt(chosen.textContent);
      showNumber(number);
   }
}

buttonContainer.addEventListener('click', calcHandler);
