import { render } from './render.js';

const listOption = document.querySelectorAll('li');

listOption.forEach((list) => {
   list.addEventListener('click', () => {
      listOption.forEach((li) => li.classList.remove('active'));
      list.classList.add('active');
   });

   list.addEventListener('keypress', (e) => {
      if (e.key == 'Enter') {
         listOption.forEach((li) => li.classList.remove('active'));
         list.classList.add('active');
      }
   });
});

render();
