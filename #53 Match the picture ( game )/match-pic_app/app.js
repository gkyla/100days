class MatchPicture {
   constructor({ pathToFirstPic, pathToSecondPic, container }) {
      this.pathToFirstPic = pathToFirstPic;
      this.pathToSecondPic = pathToSecondPic;
      this.container = container;

      const numberOfPicutre = 8;
      this.howManyForEachPicture = numberOfPicutre / 2;
   }

   _randomPicPlacement() {
      // For now just 6
      // 2 represent to PathToFirstPic and PathToSecondPic
      // now each picture have 4 items
   }

   createImage() {
      let idForFirstImg = 'first';
      let idForSecondImg = 'second';

      for (let i = 1; i <= this.howManyForEachPicture; i++) {
         const div = document.createElement('div');
         const img = document.createElement('img');

         div.classList.add('.closed');
         img.src = this.pathToFirstPic;
         img.id = idForFirstImg;

         div.appendChild(img);
         this.container.appendChild(div);
      }
      for (let i = 1; i <= this.howManyForEachPicture; i++) {
         const div = document.createElement('div');
         const img = document.createElement('img');

         div.classList.add('.closed');
         img.src = this.pathToSecondPic;
         img.id = idForSecondImg;

         div.appendChild(img);
         this.container.appendChild(div);
      }
   }

   render() {
      this.createImage();
   }
}

let matchPicture = new MatchPicture({
   pathToFirstPic: './img/garox.jpg',
   pathToSecondPic: './img/fearless.jpg',
   container: document.querySelector('.container'),
});

// Find how to random an array dude

matchPicture.render();

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(6));
