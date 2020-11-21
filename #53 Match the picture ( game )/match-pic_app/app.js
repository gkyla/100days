class MatchPicture {
   constructor({ firstImgUrl, secondImgUrl, container }) {
      this.firstImgUrl = firstImgUrl;
      this.secondImgUrl = secondImgUrl;
      this.container = container;

      this.numberOfPicutre = 12;
      this.howManyForEachPicture = this.numberOfPicutre / 2;
   }

   randomizeImgPlacement() {
      let itemContainer = this.container;
      let i;
      for (i = itemContainer.children.length; i >= 0; i--) {
         itemContainer.appendChild(
            itemContainer.children[(Math.random() * i) | 0]
         );
      }
   }

   createImage() {
      let idForFirstImg = 'first';
      let idForSecondImg = 'second';

      for (let i = 1; i <= this.howManyForEachPicture; i++) {
         const div = document.createElement('div');
         const img = document.createElement('img');

         div.classList.add('match-item', 'closed');
         img.src = this.firstImgUrl;
         img.id = idForFirstImg;

         div.appendChild(img);
         this.container.appendChild(div);
      }
      for (let i = 1; i <= this.howManyForEachPicture; i++) {
         const div = document.createElement('div');
         const img = document.createElement('img');

         div.classList.add('match-item', 'closed');
         img.src = this.secondImgUrl;
         img.id = idForSecondImg;

         div.appendChild(img);

         this.container.appendChild(div);
      }
   }

   checkWinner(selectedElement) {
      const checkingElement = document.querySelectorAll(
         `[${selectedElement}=true]`
      );
      if (checkingElement.length === this.numberOfPicutre) {
         this.container.innerHTML = `
         Selamat boskuhhh
         `;
      }
   }

   _matchOnClick() {
      const matchItems = document.querySelectorAll('.match-item');
      let counter = 0;
      let firstId = null;
      let secondId = null;

      matchItems.forEach((item) => {
         item.addEventListener('click', () => {
            // Targeting to img
            const child = item.children[0];
            item.setAttribute('id', 'selected');
            counter++;

            switch (counter) {
               case 1:
                  firstId = child.id;
                  break;
               case 2:
                  secondId = child.id;

                  // while counter 2 , define selected element
                  const selected = document.querySelectorAll('#selected');

                  // If its same then hidden it from browser
                  if (firstId === secondId) {
                     setTimeout(() => {
                        selected.forEach((selectEl) => {
                           selectEl.style.visibility = 'hidden';
                           selectEl.setAttribute('data-matching', 'true');
                           selectEl.removeAttribute('id');
                        });
                        this.checkWinner('data-matching');
                     }, 1000);
                  } else {
                     // Otherwise remove "selected" id / id attribute
                     setTimeout(() => {
                        selected.forEach((selectEl) => {
                           selectEl.removeAttribute('id');
                           selectEl.classList.add('closed');
                        });
                     }, 1000);
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
            console.log({ firstId, secondId, counter });

            item.classList.remove('closed');
         });
      });
   }

   renderGame() {
      this.createImage();
      this.randomizeImgPlacement();
      this._matchOnClick();
   }
}

let matchPicture = new MatchPicture({
   firstImgUrl: './img/garox.jpg', // Path to first img
   secondImgUrl: './img/fearless.jpg', // Path to second img
   container: document.querySelector('.container'), // Container for items
});

matchPicture.renderGame();

// Reffrence
// matchPicture.gameLevel('')
