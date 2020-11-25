const form = document.getElementById('form');
const inputs = document.querySelectorAll('input');
const firstPassword = document.querySelector('#password');
const secondPassword = document.querySelector('#re-password');

const namePattern = /\S[a-z A-Z]+\S/;
const phonePattern = /\+(62)\d+/;

form.addEventListener('submit', (e) => {
   // Check all input
   inputs.forEach((input) => {
      const validate = input.validity;

      // If input type is not match and value is not empty
      if (validate.typeMismatch && !validate.valueMissing) {
         input.nextElementSibling.innerHTML = 'Please fill the right format';
         input.className = 'invalid';
      }

      if (!validate.valid) {
         input.nextElementSibling.innerHTML = `Please fill ${input.previousElementSibling.textContent}`;
         input.className = 'invalid';

         // TODO If not matching with regex pattern border-bottom should red
         //  Or known as invalid
      } else {
         input.className = 'valid';
      }
   });

   if (secondPassword.validity.valueMissing) {
      secondPassword.className = 'invalid';
   } else {
      // If first password not equal to second password
      if (firstPassword.value.length >= 6 && secondPassword.value.length >= 6) {
         if (firstPassword.value !== secondPassword.value) {
            secondPassword.nextElementSibling.innerHTML =
               'Second password must be same like the first one';
            secondPassword.className = 'invalid';
         } else {
            secondPassword.className = 'valid';
         }
      } else {
         firstPassword.className = 'invalid';
         secondPassword.className = 'invalid';
      }
   }

   // TODO submitting only if all input valid

   e.preventDefault();
});

inputs.forEach((inputEl) => {
   const validate = inputEl.validity;
   const nextEl = inputEl.nextElementSibling;

   inputEl.addEventListener('input', () => {
      if (inputEl.getAttribute('id') === 'phone') {
         // Value only from phone number input
         // Regex Pattern Matching
         const testPhone = phonePattern.test(inputEl.value);

         if (validate.valueMissing) {
            inputEl.className = 'invalid';
         } else {
            if (testPhone) {
               inputEl.className = 'valid';
               nextEl.innerHTML = '';
            } else {
               nextEl.innerHTML = 'Please fill the right format';
               inputEl.className = 'invalid';
            }
         }
      } else if (inputEl === firstPassword || inputEl === secondPassword) {
         if (inputEl.value.length <= 6) {
            nextEl.innerHTML = 'Please fill Atleast 6 length of password';
            inputEl.className = 'invalid';
         } else {
            nextEl.innerHTML = '';
            inputEl.className = 'valid';
         }
      } else {
         // These inputs not from Phone's input
         const prevEl = inputEl.previousElementSibling;

         if (validate.valueMissing) {
            nextEl.innerHTML = `Please fill ${prevEl.textContent}`;
            inputEl.className = 'invalid';
         } else if (validate.typeMismatch && !validate.valueMissing) {
            nextEl.innerHTML = 'Please fill the right format';
            inputEl.className = 'invalid';
         } else {
            nextEl.innerHTML = '';
            inputEl.className = 'valid';
         }
      }

      if (inputEl.classList.contains('valid')) {
         inputEl.previousElementSibling.setAttribute('data-isvalid', '');
      } else {
         inputEl.previousElementSibling.removeAttribute('data-isvalid');
      }
   });
});

// Todo Add Name Patern
