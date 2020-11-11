const buttons = document.querySelectorAll('button');
const show = document.querySelector('.show-chosen-number');
const historyOperator = document.querySelector('.history-operator');

const calculator = {
   // Base value for calculator object

   defaultNumber: 0,
   displayedNumber: '',
   firstNumber: null,
   secondNumber: null,
   mathOperator: null,
   lastMathOperator: null,
   currentTotal: null,
   beforeTotal: null,
   afterCalculation: null,
   command: '',
   pressNumber: false,
};

function reset() {
   // Reset all object value

   calculator.defaultNumber = 0;
   calculator.displayedNumber = '';
   calculator.currentTotal = null;
   calculator.afterCalculation = null;
   calculator.firstNumber = null;
   calculator.secondNumber = null;
   calculator.mathOperator = null;
   calculator.lastMathOperator = null;
   calculator.pressNumber = false;
   calculator.command = '';
   historyOperator.innerHTML = '';
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

         // Change to true

         calculator.pressNumber = true;
      }
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

   if (calculator.currentTotal) {
      calculator.firstNumber = '';
      calculator.secondNumber = '';
   }

   checkingNumber(this);
}

function checkOperator(target) {
   if (!calculator.mathOperator || calculator.mathOperator === '') {
      calculator.mathOperator = target;
   } else {
      displayNum(calculator.defaultNumber);
   }

   if (calculator.currentTotal) {
      // Reset firstNumber & secondNumber after getting currentTotal
      calculator.firstNumber = '';
      calculator.secondNumber = '';

      calculator.afterCalculation = calculator.displayedNumber;
   } else {
      if (calculator.firstNumber === null) {
         calculator.firstNumber = calculator.displayedNumber;
      } else {
         calculator.secondNumber = calculator.displayedNumber;
      }
   }

   switch (target) {
      case '=':
         calculation();
         break;
   }
   displayHistoryOperator();
}

function checkCommand(command) {
   if (calculator.command === '') {
      calculator.command = command;
   }

   switch (calculator.command) {
      case 'DEL':
         if (calculator.afterCalculation) {
            deleteCharacter(calculator.afterCalculation);
         } else {
            deleteCharacter(calculator.displayedNumber);
         }
         break;
      case 'C':
         reset();
         break;
   }
}

function deleteCharacter(str) {
   const deleted = str.substring(0, str.length - 1);
   if (calculator.afterCalculation) {
      calculator.afterCalculation = deleted;
      calculator.displayedNumber = deleted;
   } else {
      calculator.displayedNumber = deleted;
   }
   displayNum(deleted);
}

function checkingNumber(el) {
   let {
      displayedNumber,
      defaultNumber,
      mathOperator,
      currentTotal,
   } = calculator;

   if (displayedNumber === null || displayedNumber === '') {
      if (currentTotal && mathOperator === '') {
         displayNum(currentTotal);
      } else {
         displayNum(defaultNumber);
      }
   } else {
      if (mathOperator === null) {
         displayNum(displayedNumber);
      } else {
         if (
            !el.classList.contains('operator') &&
            !el.classList.contains('command')
         ) {
            if (calculator.currentTotal) {
               if (
                  calculator.afterCalculation === null ||
                  calculator.afterCalculation === ''
               ) {
                  calculator.afterCalculation = el.innerText;
               } else {
                  calculator.afterCalculation += el.innerText;
               }
               displayNum(calculator.afterCalculation);
            } else {
               if (calculator['secondNumber'] === null) {
                  calculator['secondNumber'] = el.innerText;
               } else {
                  calculator['secondNumber'] += el.innerText;
               }
               displayNum(calculator['secondNumber']);
            }
         }
      }
   }
}

function calculation() {
   let total;

   let {
      firstNumber,
      secondNumber,
      mathOperator,
      currentTotal,
      afterCalculation,
   } = calculator;

   const parsedFirst = parseFloat(firstNumber);
   const parsedSecond = parseFloat(secondNumber);
   const parsedTotal = parseFloat(currentTotal);
   const parsedAfter = parseFloat(afterCalculation);

   if (calculator.currentTotal) {
      switch (mathOperator) {
         case '*':
            total = defineOperator['*'](parsedTotal, parsedAfter);
            break;
         case '+':
            total = defineOperator['+'](parsedTotal, parsedAfter);
            break;
         case '-':
            total = defineOperator['-'](parsedTotal, parsedAfter);
            break;
         case '/':
            total = defineOperator['/'](parsedTotal, parsedAfter);
            break;
      }
   } else {
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
   }

   // Check Operator
   calculator.currentTotal = total;

   // Save currentTotal to beforeTotal
   calculator.beforeTotal = currentTotal;

   // Save mathOperator to LastMathoperator
   calculator.lastMathOperator = calculator.mathOperator;

   // Reset
   calculator.mathOperator = '';
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
   if (num === undefined || isNaN(num)) {
      show.innerHTML = 'Error Operator :(';
   } else if (num === null) {
      show.innerHTML = 'Cannot delete total number';
   } else {
      show.innerHTML = num;
   }
}

function displayHistoryOperator() {
   const {
      firstNumber,
      mathOperator,
      lastMathOperator,
      secondNumber,
      currentTotal,
      afterCalculation,
      beforeTotal,
   } = calculator;

   if (calculator.secondNumber === null) {
      historyOperator.innerHTML = `${firstNumber} ${mathOperator}`;
   } else if (firstNumber && secondNumber) {
      historyOperator.innerHTML = `${firstNumber} ${lastMathOperator} ${secondNumber} = ${currentTotal}`;
   } else if (currentTotal && !afterCalculation) {
      historyOperator.innerHTML = `${currentTotal} ${mathOperator}`;
   } else if (currentTotal && afterCalculation) {
      historyOperator.innerHTML = `${beforeTotal} ${lastMathOperator} ${afterCalculation} = ${currentTotal}`;
   } else {
      historyOperator.innerHTML = `${firstNumber} ${lastMathOperator} ${secondNumber}`;
   }
}

checkingNumber();
