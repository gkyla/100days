import { createItemNote } from './template/template-creator.js';
const noteContainer = document.querySelector('.note-container');

function render(noteStorage) {
   noteContainer.innerHTML = ''; // Reset Container First

   let currentIndex = 0;
   noteStorage.forEach((note) => {
      noteContainer.innerHTML += createItemNote(note, currentIndex);
      currentIndex++;
   });
}

export { render };
