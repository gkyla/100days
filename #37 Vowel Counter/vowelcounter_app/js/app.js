const form = document.querySelector('form');
const input = document.querySelector('#vowels-input');
const display = document.querySelector('.counter-display');

form.addEventListener('submit', (e) => {
   e.preventDefault();
   checkVowels();
   addAnimationBack();
});

const checkVowels = () => {
   const inputValue = input.value;
   const trimInput = inputValue.trim();
   const inputToLowerCase = trimInput.toLowerCase();

   if (inputToLowerCase == '' || inputToLowerCase == null) {
      display.innerHTML = `Cannot count empty input`;
      return;
   }
   // If there is no Vowels the value will be null
   const vowelsCounter = inputToLowerCase.match(/[aiueo]/g);

   // check if VowelsCounter not equal to null then we want to display how many vowels do we have
   if (vowelsCounter !== null) {
      display.innerHTML = `${vowelsCounter.length} Vowels Found`;
   } else {
      display.innerHTML = 'No Vowels Found ';
   }
   // Reset form after submmiting
   form.reset();
};

const addAnimationBack = () => {
   // Add
   display.classList.add('add-animation');

   // Remove it after 1 second
   setTimeout(() => {
      display.classList.remove('add-animation');
   }, 500);
};

// Remove it after 1 second on the first idle
setTimeout(() => {
   display.classList.remove('add-animation');
}, 500);
