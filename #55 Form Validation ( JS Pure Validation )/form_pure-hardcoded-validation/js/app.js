const form = document.getElementById('form');
const inputs = document.querySelectorAll('input');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');

// As per the HTML5 Specification
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// ID Phone number pattern
const phonePattern = /\+(62)\d+/;

const msg = {
   pwLessThanSix: 'Please fill Atleast 6 length of password',
   pwNotSame: 'Second password must be same like the first one',
   wrongFormat: 'Please fill the right format',
   noValue(text) {
      return `Please fill ${text}`;
   },
};

form.addEventListener('submit', (e) => {
   //  get All Elements that have class of contains valid
   const allValid = document.querySelectorAll('.valid');

   inputs.forEach((input) => {
      const nextEl = input.nextElementSibling;
      const prevEl = input.previousElementSibling;

      if (input.value.length === 0) {
         nextEl.innerHTML = msg.noValue(prevEl.textContent);
         input.className = 'invalid';
      }

      if (input === password || input === confirmPassword) {
         passwordValidate(password, confirmPassword);
      }
   });

   if (allValid.length === inputs.length) {
      alert('Data submitted !');

      inputs.forEach((input) => {
         // Reset Form
         form.reset();
         input.classList.remove('valid'); // Remove Valid Class
         input.previousElementSibling.removeAttribute('data-is-valid'); // Remove data is valid
      });
   }

   e.preventDefault();
});

// Tracking input user
inputs.forEach((inputEl) => {
   const nextEl = inputEl.nextElementSibling;
   const prevEl = inputEl.previousElementSibling;

   inputEl.addEventListener('input', () => {
      const emailMatch = emailPattern.test(inputEl.value);
      const phoneMatch = phonePattern.test(inputEl.value);

      switch (inputEl.getAttribute('id')) {
         case 'phone':
            // Validate user input with pattern test form phoneMatch
            logicValidate(phoneMatch, inputEl, nextEl, prevEl);
            break;
         case 'password':
         case 'confirm-password':
            passwordValidate(password, confirmPassword); // Password Validate Matching
            break;
         case 'email':
            // Validate user input with pattern test form emailMatch
            logicValidate(emailMatch, inputEl, nextEl, prevEl);
            break;
         default:
            if (inputEl.value.length === 0) {
               nextEl.innerHTML = msg.noValue(prevEl.textContent);
               inputEl.className = 'invalid';
            } else {
               nextEl.innerHTML = '';
               inputEl.className = 'valid';
            }
            break;
      }

      if (inputEl.classList.contains('valid')) {
         prevEl.setAttribute('data-is-valid', '');
      } else {
         prevEl.removeAttribute('data-is-valid');
      }
   });
});

function passwordValidate(password, confirmPassword) {
   // Selecting Value length
   const pwLength = password.value.length;
   const confirmPwLength = confirmPassword.value.length;

   // Selecting Element
   const confirmPrevious = confirmPassword.previousElementSibling;
   const confirmNext = confirmPassword.nextElementSibling;
   const pwNextElement = password.nextElementSibling;

   if (pwLength >= 6) {
      password.className = 'valid';
      pwNextElement.innerHTML = '';

      if (confirmPwLength >= 6) {
         if (password.value !== confirmPassword.value) {
            confirmPassword.className = 'invalid';
            confirmNext.innerHTML = msg.pwNotSame; // msg : Password not same
            confirmPrevious.removeAttribute('data-is-valid');
         } else {
            confirmPassword.className = 'valid';
            confirmNext.innerHTML = '';
            confirmPrevious.setAttribute('data-is-valid', '');
         }
      } else {
         confirmPassword.className = 'invalid';
         confirmNext.innerHTML = msg.pwLessThanSix; // msg : password less than six
      }
   } else if (confirmPwLength >= 6 && pwLength < 6) {
      password.className = 'invalid';
      pwNextElement.innerHTML = msg.pwLessThanSix; // msg : password less than six

      confirmPassword.className = 'invalid';
      confirmNext.innerHTML = msg.pwNotSame; // msg : Password not same
      confirmPrevious.removeAttribute('data-is-valid');
   } else {
      password.className = 'invalid';
      pwNextElement.innerHTML = msg.pwLessThanSix; // msg: password less than six
   }
}

function logicValidate(patternMatch, input, nextEl, prevEl) {
   if (input.value.length === 0) {
      nextEl.innerHTML = msg.noValue(prevEl.textContent);
      input.className = 'invalid';
   } else {
      if (patternMatch) {
         nextEl.innerHTML = '';
         input.className = 'valid';
      } else {
         nextEl.innerHTML = msg.wrongFormat; // msg: wrong format input
         input.className = 'invalid';
      }
   }
}
