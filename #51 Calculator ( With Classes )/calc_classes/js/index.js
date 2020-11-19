class Calculator {
   constructor(currentShow, previousShow) {
      this.currentShow = currentShow;
      this.previousShow = previousShow;

      this.previousNumber = '';
      this.currentNumber = '';
      this.operator = '';
      this.totalCompute = '';
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
         alert('Insert some number before choosing operator');
         return;
      }
      this.operator = operator;

      if (this.operator && this.equalByOperator) {
         this.compute();
         // this.currentShow.innerText = this.previousNumber;
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
         case '/':
            total = parsedPreviousNumber / parsedCurrentNumber;
            break;
      }

      // if (this.currentNumber === '') {
      //    this.currentNumber = this.previousNumber;
      // }

      this.currentNumber = total;
      this.totalCompute = total.toString();
      this.equalByOperator = false;
   }

   reset() {
      this.previousNumber = '';
      this.currentNumber = '';
      this.operator = '';
   }

   printLog() {
      console.log(this);
   }

   updateCalculator() {
      this.currentShow.innerText = this.previousNumber;

      if (this.equalByOperator) {
         this.previousShow.innerText = `${this.previousNumber} ${this.operator} ${this.currentNumber}`;
      } else {
         this.previousShow.innerText = `${this.currentNumber} ${this.operator}`;
         this.currentShow.innerText = this.currentNumber;
      }
   }
}

const numberButton = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('.operator');
const commands = document.querySelectorAll('.command');
const currentShow = document.querySelector('.current-show');
const previousShow = document.querySelector('.previous-show');
const equal = document.querySelector('.equal');

const calculator = new Calculator(currentShow, previousShow);

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
