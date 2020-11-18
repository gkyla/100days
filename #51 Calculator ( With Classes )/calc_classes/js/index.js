class Calculator {
   constructor(showChosenNumber, historyOperator) {
      this.showChosenNumber = showChosenNumber;
      this.historyOperator = historyOperator;

      this.previousNumber = '';
      this.currentNumber = '';
      this.operator = '';
      this.command = '';
   }

   addNumber(number) {
      if (number === '.' && this.currentNumber.includes('.')) return;
      this.currentNumber = this.currentNumber + number; // Concatination (string + string)
      this.updateCalculator();
   }

   commandHandler(command) {
      switch (command) {
         case 'DEL':
            const deleted = this.currentNumber.slice(0, -1);
            this.currentNumber = deleted;
            break;
         case 'C':
            this.reset();
            break;
         default:
            return;
      }

      this.updateCalculator();
   }

   operatorHandler(operator) {
      let total;
      let parsedCurrentNumber = parseFloat(this.currentNumber);
      let parsedPreviousNumber = parseFloat(this.previousNumber);

      switch (operator) {
         case '+':
            total = parsedCurrentNumber + parsedPreviousNumber;
            break;
         case '-':
            total = parsedCurrentNumber * parsedPreviousNumber;
            break;
         case '*':
            total = parsedCurrentNumber * parsedPreviousNumber;
            break;
         case '/':
            total = parsedCurrentNumber / parsedPreviousNumber;
            break;
      }
      this.currentNumber = total;
   }

   compute() {
      this.updateCalculator();
   }

   reset() {
      this.previousNumber = '';
      this.currentNumber = '';
   }

   updateCalculator() {
      console.log(this);
      this.showChosenNumber.innerText = this.currentNumber;
      this.historyOperator.innerText = this.previousNumber;
   }
}

const numberButton = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('.operator');
const commands = document.querySelectorAll('.command');
const showChosenNumber = document.querySelector('.current-show');
const historyOperator = document.querySelector('.previous-show');
const equal = document.querySelector('.equal');

const calculator = new Calculator(showChosenNumber, historyOperator);

numberButton.forEach((button) => {
   button.addEventListener('click', () => {
      calculator.addNumber(button.innerText);
   });
});

commands.forEach((command) => {
   command.addEventListener('click', () => {
      calculator.commandHandler(command.innerText);
   });
});

operators.forEach((operator) => {
   operator.addEventListener('click', () => {
      console.log(operator.innerText);
      calculator.operatorHandler(operator.innerText);
   });
});

equal.addEventListener('click', () => {
   calculator.compute();
});
