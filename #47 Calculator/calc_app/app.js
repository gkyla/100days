const buttons = document.querySelectorAll('button');
const show = document.querySelector('.show-chosen-number');

const calculator = {
   defaultNumber: 0,
   displayedNumber: null,
   firstNumber: null,
   secondNumber: null,
   operator: null,
   pressNumber: false,
};

function reset() {
   calculator.defaultNumber = 0;
   calculator.displayedNumber = null;
   calculator.firstNumber = null;
   calculator.secondNumber = null;
   calculator.operator = null;
   calculator.pressNumber = false;
}

const defineOperator = {
   '*': (first, second) => {
      return first * second;
   },
   '+': (first, second) => {
      return first + second;
   },
   '-': (first, second) => {
      return first - second;
   },
   '/': (first, second) => {
      return first / second;
   },
};

function displayNum(num) {
   show.innerHTML = num;
}

function total() {
   let total;
   const { firstNumber, secondNumber, operator } = calculator;
   const parsedFirst = parseInt(firstNumber);
   const parsedSecond = parseInt(secondNumber);

   switch (operator) {
      case '*':
         total = defineOperator['*'](parsedFirst, parsedSecond);
         break;
      case '+':
         total = defineOperator['+'](parsedFirst, parsedSecond);
         break;
      case '-':
         total = defineOperator['-'](parsedFirst, parsedSecond);
         break;
      case '/':
         total = defineOperator['/'](parsedFirst, parsedSecond);
         break;
   }

   displayNum(total);
}

function checkingNumber(el) {
   if (calculator.displayedNumber === null) {
      show.innerHTML = calculator.defaultNumber;
   } else {
      if (calculator.operator === null) {
         show.innerHTML = calculator.displayedNumber;
      } else {
         if (!el.classList.contains('operator')) {
            if (calculator.secondNumber === null) {
               calculator.secondNumber = el.innerText;
            } else {
               calculator.secondNumber += el.innerText;
            }
            displayNum(calculator.secondNumber);
         }
      }
   }
}

function checkOperator(target) {
   if (calculator.firstNumber == null) {
      calculator.firstNumber = calculator.displayedNumber;
   } else {
      calculator.secondNumber = calculator.displayedNumber;
   }

   if (calculator.operator === null) {
      calculator.operator = target;
   } else {
      if (calculator.operator === target) {
         alert('Kamu sudah menentukan operator');
      }
   }

   switch (target) {
      case '=':
         total();
         break;
      case 'C':
         reset();
         break;
   }
   calculator.displayedNumber = '';
}

function userPressHandler() {
   const target = this.innerText;

   if (calculator.pressNumber === false) {
      if (this.classList.contains('operator')) {
         displayNum(calculator.defaultNumber);
      } else {
         calculator.displayedNumber = target;
      }

      // Change to true
      calculator.pressNumber = true;
   } else {
      if (this.classList.contains('operator')) {
         checkOperator(target);
      } else {
         calculator.displayedNumber += target;
      }
   }

   checkingNumber(this);
   console.log(calculator);
}

buttons.forEach((btn) => {
   btn.addEventListener('click', userPressHandler);
});

checkingNumber();
