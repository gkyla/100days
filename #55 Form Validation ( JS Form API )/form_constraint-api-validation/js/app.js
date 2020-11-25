const form = document.getElementById('form');
const phoneInput = document.querySelector('#phone');
const inputs = document.querySelectorAll('input');
const firstPassword = document.querySelector('#password');
const secondPassword = document.querySelector('#re-password');

const namePattern = /\S[a-z A-Z]+\S/;
const phonePattern = /\+(62)\d+/;

form.addEventListener('submit', (e) => {
   // Check all input
   inputs.forEach((input) => {
      const validate = input.validity;

      if (!validate.valid) {
         input.nextElementSibling.innerHTML = `Please fill ${input.previousElementSibling.textContent}`;
         input.className = 'invalid';
      } else {
         input.className = 'valid';
      }

      // If input type is not match and value is not empty
      if (validate.typeMismatch && !validate.valueMissing) {
         input.nextElementSibling.innerHTML = 'Please fill the right format';
         input.className = 'invalid';
      }
   });

   if (secondPassword.validity.valueMissing) {
      secondPassword.className = 'invalid';
   } else {
      // If first password not equal to second password
      if (firstPassword.value !== secondPassword.value) {
         secondPassword.nextElementSibling.innerHTML =
            'Your second password must be same like the first one';
         secondPassword.className = 'invalid';
      } else {
         secondPassword.className = 'valid';
      }
   }

   e.preventDefault();
});

inputs.forEach((inputElement) => {
   const validate = inputElement.validity;
   const nextEl = inputElement.nextElementSibling;

   inputElement.addEventListener('input', () => {
      if (inputElement.getAttribute('id') === 'phone') {
         // Value only from phone number input
         // Regex Pattern Matching
         const testPhone = phonePattern.test(inputElement.value);

         if (validate.valueMissing) {
            inputElement.className = 'phone invalid';
         } else {
            if (testPhone) {
               inputElement.className = 'phone valid';
               nextEl.innerHTML = '';
            } else {
               nextEl.innerHTML = 'Please fill the right format';
               inputElement.className = 'phone invalid';
            }
         }
      } else {
         // These inputs not from Phone's input
         const prevEl = inputElement.previousElementSibling;

         if (validate.valueMissing) {
            nextEl.innerHTML = `Please fill ${prevEl.textContent}`;
            inputElement.className = 'invalid';
         } else if (validate.typeMismatch && !validate.valueMissing) {
            nextEl.innerHTML = 'Please fill the right format';
            inputElement.className = 'invalid';
         } else {
            nextEl.innerHTML = '';
            inputElement.className = 'valid';
         }
      }
   });
});

// Todo Add Name Patern
