const buttons = document.querySelectorAll('button');
const show = document.querySelector('.show-chosen-number');

const calculator = {
   defaultNumber: 0,
   displayedNumber: null,
   firstNumber: null,
   secondNumber: null,
   mathOperator: null,
   command: '',
   pressNumber: false,
};

function reset() {
   calculator.defaultNumber = 0;
   calculator.displayedNumber = null;
   calculator.firstNumber = null;
   calculator.secondNumber = null;
   calculator.mathOperator = null;
   calculator.pressNumber = false;
   calculator.command = '';
}

buttons.forEach((btn) => {
   btn.addEventListener('click', userPressHandler);
});

function userPressHandler() {
   const target = this.innerText;
   const targetClass = this.classList;

   if (calculator.pressNumber === false) {
      if (targetClass.contains('operator') || targetClass.contains('command')) {
         displayNum(calculator.defaultNumber);
      } else {
         calculator.displayedNumber = target;
      }

      // Change to true
      calculator.pressNumber = true;
   } else {
      if (targetClass.contains('operator')) {
         checkOperator(target);

         // empty displayedNumber after pressing operator
         calculator.displayedNumber = '';
      } else if (targetClass.contains('command')) {
         checkCommand(target);

         calculator.command = '';
      } else {
         calculator.displayedNumber += target;
      }
   }

   checkingNumber(this);
   console.log(calculator);
}

function checkOperator(target) {
   if (calculator.mathOperator === null) {
      calculator.mathOperator = target;
   }

   if (calculator.firstNumber === null) {
      calculator.firstNumber = calculator.displayedNumber;
   } else {
      calculator.secondNumber = calculator.displayedNumber;
   }

   switch (target) {
      case '=':
         calculation();
         break;
   }
}

function checkCommand(command) {
   if (calculator.command === null) calculator.command = command;

   switch (command) {
      case 'DEL':
         deleteCharacter(show.innerHTML);
         break;
      case 'C':
         reset();
         break;
   }
}

function deleteCharacter(str) {
   const deleted = str.substring(0, str.length - 1);
   calculator.displayedNumber = deleted;
   displayNum(deleted);
}

function checkingNumber(el) {
   let {
      displayedNumber,
      defaultNumber,
      mathOperator,
      secondNumber,
   } = calculator;

   if (displayedNumber === null) {
      displayNum(defaultNumber);
   } else {
      if (mathOperator === null) {
         displayNum(displayedNumber);
      } else {
         if (!el.classList.contains('operator')) {
            if (secondNumber === null) {
               secondNumber = el.innerText;
            } else {
               secondNumber += el.innerText;
            }
            displayNum(secondNumber);
         }
      }
   }
}

function calculation() {
   let total;
   const { firstNumber, secondNumber, mathOperator } = calculator;
   const parsedFirst = parseInt(firstNumber);
   const parsedSecond = parseInt(secondNumber);

   // Check Operator
   switch (mathOperator) {
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

checkingNumber();
// case 'C':
//    reset();
//    break;
// case 'DEL':
//    deleteCharacter(show.innerHTML);
//    break;
