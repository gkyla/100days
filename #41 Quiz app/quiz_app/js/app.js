import { render, tryAgain } from './render.js';

const li = document.querySelectorAll('li');

li.forEach((list) => {
   list.addEventListener('click', (e) => {
      checkCurrentActive(li);
      e.target.classList.add('active');
   });

   list.addEventListener('keypress', (e) => {
      if (e.key == 'Enter') {
         checkCurrentActive(li);
         e.target.classList.add('active');
      }
   });
});

function checkCurrentActive(el) {
   let current = 0;
   while (current < li.length) {
      if (el[current].classList.contains('active')) {
         el[current].classList.remove('active');
      }
      current++;
   }
}

render();
tryAgain();
