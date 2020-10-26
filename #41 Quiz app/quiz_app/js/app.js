const li = document.querySelectorAll('li');

li.forEach((el) => {
   el.addEventListener('click', (e) => {
      let current = 0;
      while (current < li.length) {
         if (li[current].classList.contains('active')) {
            li[current].classList.remove('active');
         }
         console.log(li[current]);
         current++;
      }
      e.target.classList.add('active');
   });
});

console.log(li.length);
