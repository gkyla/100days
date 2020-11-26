const inputs = document.querySelectorAll('input');
const form = document.querySelector('form');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

const msg = {
   pwNotSame: 'Confirm password must be same like the first one',
   wrongFormat: 'Please fill the right format',
   noValue(text) {
      return `Please fill ${text}`;
   },
   inputLessThanRequired(input) {
      return `Pleast fill atleast ${input.minLength} characters , ${
         input.minLength - input.value.length
      } left characters `;
   },
};

form.addEventListener('submit', (e) => {
   // Get all valid elements
   const allValid = document.querySelectorAll('.valid');

   inputs.forEach((input) => {
      const nextEl = input.nextElementSibling;
      const prevEl = input.previousElementSibling;

      if (input.validity.valueMissing) {
         nextEl.innerHTML = msg.noValue(prevEl.textContent);
         input.className = 'invalid';
      } else if (input.validity.typeMismatch) {
         nextEl.innerHTML = msg.wrongFormat;
         input.className = 'invalid';
      }
   });

   // If the elements who have class of valid are equal to the length of inputs ( all inputs are valid )
   // Then we want to submit the data (just example)
   if (allValid.length === inputs.length) {
      alert('Data Submitted !');
      inputs.forEach((input) => {
         input.classList.remove('valid');
         input.previousElementSibling.removeAttribute('data-is-valid');
      });
      form.reset();
   }

   e.preventDefault();
});

inputs.forEach((input) => {
   // Tracking on user inputs
   input.addEventListener('input', () => {
      const nextEl = input.nextElementSibling;
      const prevEl = input.previousElementSibling;

      //  if inputs value are tooShort ( based on = input minlength attribute)
      if (input.validity.tooShort) {
         input.className = 'invalid';

         if (input === password || input === confirmPassword) {
            nextEl.innerHTML = msg.inputLessThanRequired(input);
         } else {
            //  input.minglength based on the input attribute minlength in the HTML input tag
            nextEl.innerHTML = msg.inputLessThanRequired(input);
         }
      } else {
         // Validate password
         passwordValidate(input, nextEl);
      }

      //  If No value on the input ( based on = input required attribute )
      if (input.validity.valueMissing) {
         input.className = 'invalid';
         nextEl.innerHTML = msg.noValue(prevEl.textContent);
      } else if (!input.validity.valueMissing) {
         // If there is value inside inputs
         // and if the type of the inputs are wrong or inputs pattern are wrong
         if (input.validity.typeMismatch || input.validity.patternMismatch) {
            nextEl.innerHTML = msg.wrongFormat;
            input.className = 'invalid';
         }
      } else {
         input.className = 'valid';
         nextEl.innerHTML = '';
      }

      // If input has valid class , then we want to set attribute 'data-is-valid' to label
      if (input.classList.contains('valid')) {
         prevEl.setAttribute('data-is-valid', '');
      } else {
         prevEl.removeAttribute('data-is-valid');
      }
   });
});

function passwordValidate(input, nextEl) {
   // If the input either password or confirmPassword
   // then we need to check input
   if (input === password || input === confirmPassword) {
      password.className = 'valid';
      password.nextElementSibling.innerHTML = '';

      if (password.value !== confirmPassword.value) {
         confirmPassword.className = 'invalid';
         confirmPassword.nextElementSibling.innerHTML = msg.pwNotSame;
      } else {
         nextEl.innerHTML = '';
         confirmPassword.nextElementSibling.innerHTML = '';
         confirmPassword.className = 'valid';
      }
   } else {
      input.className = 'valid';
      nextEl.innerHTML = '';
   }
}
