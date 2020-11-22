class MatchPicture {
   constructor({ firstImgUrl, secondImgUrl, container, levelEl, startEl }) {
      this.firstImgUrl = firstImgUrl;
      this.secondImgUrl = secondImgUrl;
      this.container = container;
      this.levelEl = levelEl;
      this.startEl = startEl;

      // Default Value
      this.totalPic = 8;
      this.totalForEachPicturePair = this.totalPic / 2;
   }

   #level() {
      this.levelEl.addEventListener('change', () => {
         const countElement = document.querySelectorAll('#counter');
         countElement.forEach((counter) => counter.remove());

         this.startEl.style.display = '';
         let diff = this.levelEl.selectedOptions[0].value;
         this.container.setAttribute('data-diff', diff);

         switch (diff) {
            case 'easy':
               this.totalPic = 8;
               this.totalForEachPicturePair = this.totalPic / 2;
               break;
            case 'medium':
               this.totalPic = 20;
               this.totalForEachPicturePair = this.totalPic / 2;
               break;
            case 'hard':
               this.totalPic = 32;
               this.totalForEachPicturePair = this.totalPic / 2;
               break;
            case 'expert':
               this.totalPic = 40;
               this.totalForEachPicturePair = this.totalPic / 2;
         }
         this.container.removeAttribute('data-win');
         this.renderGame();
      });
   }

   #start(itemEl) {
      let duration = 3;
      const countElement = document.querySelector('#counter');

      this.startEl.addEventListener('click', () => {
         const timeOutEl = setInterval(() => {
            if (duration <= 0) {
               itemEl.forEach((item) => {
                  item.classList.add('closed');
                  this.container.style.pointerEvents = '';
               });
               countElement.remove();
               clearInterval(timeOutEl);
            } else {
               countElement.innerHTML = `<p>You have ${duration} Seconds to Remembering the picture</p>`;
            }
            duration -= 1;
         }, 1000);

         itemEl.forEach((item) => {
            item.classList.remove('closed');
         });
         this.startEl.style.display = 'none';
      });
   }

   #reset() {
      // Create Element for Reset Button
      const btn = document.createElement('button');
      btn.id = 'reset';
      btn.classList.add('btn');
      btn.innerText = 'Reset';

      this.container.appendChild(btn);
      btn.addEventListener('click', () => {
         this.container.setAttribute('data-win', 'false');

         // Displaying Start button
         this.startEl.style.display = '';

         this.renderGame();
      });
   }

   #randomizeImgPlacement() {
      let itemContainer = this.container;
      let i;
      for (i = itemContainer.children.length; i >= 0; i--) {
         itemContainer.appendChild(
            itemContainer.children[(Math.random() * i) | 0]
         );
      }
   }

   #createImage() {
      let i = 1;
      let x = 1;

      while (i <= this.totalForEachPicturePair) {
         i++;
         const div = document.createElement('div');
         div.classList.add('match-item', 'closed');
         div.innerHTML = `<img src=${this.firstImgUrl} id="first">`;
         this.container.appendChild(div);
      }
      while (x <= this.totalForEachPicturePair) {
         x++;
         const div = document.createElement('div');
         div.classList.add('match-item', 'closed');
         div.innerHTML = `<img src=${this.secondImgUrl} id="second">`;
         this.container.appendChild(div);
      }
   }

   #checkWinner(selectedElement) {
      const checkingElement = document.querySelectorAll(
         `[${selectedElement}=true]`
      );
      if (checkingElement.length === this.totalPic) {
         this.container.setAttribute('data-win', 'true');
         this.container.innerHTML = `
         <h1>Congratulations  !!!</h1>
         `;
         this.#reset();
      }
   }

   #matchOnClick() {
      const matchItems = document.querySelectorAll('.match-item');
      this.#start(matchItems);

      let counter = 0;
      let firstId = null;
      let secondId = null;

      matchItems.forEach((item) => {
         item.addEventListener('click', () => {
            // Targeting to img
            const child = item.children[0];
            item.setAttribute('id', 'selected');

            // Disable click event when clicking on targeted img
            item.style.pointerEvents = 'none';
            counter++;

            switch (counter) {
               case 1:
                  firstId = child.id;
                  break;
               case 2:
                  secondId = child.id;
                  // while counter is 2 , define selected element
                  const selected = document.querySelectorAll('#selected');
                  // If its same then hidden it from browser

                  if (firstId === secondId) {
                     setTimeout(() => {
                        selected.forEach((selectEl) => {
                           selectEl.style.visibility = 'hidden';
                           selectEl.setAttribute('data-matching', 'true');
                           selectEl.removeAttribute('id');
                        });
                        this.#checkWinner('data-matching');
                     }, 300);
                  } else {
                     // Otherwise remove "selected" id / id attribute
                     setTimeout(() => {
                        selected.forEach((selectEl) => {
                           selectEl.removeAttribute('id');
                           selectEl.classList.add('closed');

                           // Enable it again when 2 image are not match
                           selectEl.style.pointerEvents = '';
                        });
                     }, 300);
                  }

                  // Reset while counter is 2
                  counter = 0;
                  firstId = null;
                  secondId = null;
                  break;
               default:
                  console.error('ada error nich');
                  return;
            }

            item.classList.remove('closed');
         });
      });
   }

   renderGame() {
      // Reset Container & disable pointerEvents ( user cant click )
      this.container.innerHTML = '';
      this.container.style.pointerEvents = 'none';

      // Create Element for counter Element
      const countElement = document.createElement('div');
      countElement.id = 'counter';
      this.container.insertAdjacentElement('beforebegin', countElement);

      this.#createImage();
      this.#randomizeImgPlacement();
      this.#matchOnClick();
      this.#level();
   }
}

let matchPicture = new MatchPicture({
   firstImgUrl: './img/pic_1.jpg', // Path to first img
   secondImgUrl: './img/pic_2.jpg', // Path to second img
   container: document.querySelector('.container'), // Container element for items
   levelEl: document.querySelector('select[name="diff"]'), // Select element
   startEl: document.querySelector('#start'), // Button Element
});

// Start & Rendering Game
matchPicture.renderGame();
