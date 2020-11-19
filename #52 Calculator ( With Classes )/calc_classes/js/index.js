class Calculator {
   constructor(currentDisplayShow, previousDisplayShow) {
      this.currentDisplayShow = currentDisplayShow;
      this.previousDisplayShow = previousDisplayShow;

      this.previousNumber = '';
      this.currentNumber = '';
      this.operator = '';
      this.totalCompute = null;
      this.command = '';
      this.equalByOperator = false;
   }

   addNumber(number) {
      if (number === '.' && this.currentNumber.includes('.')) return;
      this.currentNumber = this.currentNumber + number; // Concatination (string + string)
   }

   commandHandler(command) {
      switch (command) {
         case 'DEL':
            // Only delete if currentNumber is not empty
            if (this.currentNumber.length > 0) {
               const deleted = this.currentNumber.slice(0, -1);
               this.currentNumber = deleted;
            }
            break;
         case 'C':
            this.reset();
            break;
         default:
            return;
      }
   }

   operatorHandler(operator) {
      if (isNaN(this.currentNumber) || this.currentNumber === '') {
         // Overwrite Operator
         this.operator = operator;
         return;
      } else if (this.currentNumber && this.operator && this.previousNumber) {
         if (this.operator !== operator) {
            // If previous Operator is not same then overwrite operator
            this.operator = operator;
            return;
         }
      }
      this.operator = operator;

      if (this.operator && this.equalByOperator) {
         this.compute();
      }
      this.equalByOperator = true;
      this.previousNumber = this.currentNumber.toString();
      this.currentNumber = '';
   }

   compute() {
      if (
         this.operator === '' ||
         this.previousNumber === '' ||
         this.currentNumber === ''
      )
         return;

      let total;
      let parsedCurrentNumber = parseFloat(this.currentNumber);
      let parsedPreviousNumber = parseFloat(this.previousNumber);

      switch (this.operator) {
         case '+':
            total = parsedPreviousNumber + parsedCurrentNumber;
            break;
         case '-':
            total = parsedPreviousNumber - parsedCurrentNumber;
            break;
         case '*':
            total = parsedPreviousNumber * parsedCurrentNumber;
            break;
         case '÷':
            total = parsedPreviousNumber / parsedCurrentNumber;
            break;
      }

      this.currentNumber = total;
      this.totalCompute = total;
      this.equalByOperator = false;
   }

   reset() {
      this.previousNumber = '';
      this.currentNumber = '';
      this.operator = '';
      this.totalCompute = null;
   }

   printLog() {
      // For checking purpose
      console.log(this);
   }

   updateCalculator() {
      if (this.equalByOperator === true) {
         this.previousDisplayShow.innerText = `${this.previousNumber} ${this.operator} ${this.currentNumber}`;
         if (this.totalCompute === null) {
            this.currentDisplayShow.innerText = this.currentNumber;
         } else {
            this.currentDisplayShow.innerText = this.totalCompute;
         }
      } else {
         this.previousDisplayShow.innerText = `${this.currentNumber} ${this.operator}`;
         this.currentDisplayShow.innerText = this.currentNumber;
      }

      // Reset After Update
      this.totalCompute = null;
   }
}

const numberButton = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('.operator');
const commands = document.querySelectorAll('.command');
const currentDisplayShow = document.querySelector('.current-show');
const previousDisplayShow = document.querySelector('.previous-show');
const equal = document.querySelector('.equal');

const calculator = new Calculator(currentDisplayShow, previousDisplayShow);

numberButton.forEach((button) => {
   button.addEventListener('click', () => {
      calculator.addNumber(button.innerText);
      calculator.updateCalculator();
   });
});

commands.forEach((command) => {
   command.addEventListener('click', () => {
      calculator.commandHandler(command.innerText);
      calculator.updateCalculator();
   });
});

operators.forEach((operator) => {
   operator.addEventListener('click', () => {
      calculator.operatorHandler(operator.innerText);
      calculator.updateCalculator();
   });
});

equal.addEventListener('click', () => {
   calculator.compute();
   calculator.updateCalculator();
});

document.querySelector('#debug').addEventListener('click', () => {
   calculator.printLog();
});
