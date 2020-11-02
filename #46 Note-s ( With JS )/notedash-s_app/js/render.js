import { createItemNote } from './template/template-creator.js';
import { modalHandler } from './utilities/modal-settings.js';
import { deleteHandler } from './utilities/remove-item.js';
const noteContainer = document.querySelector('.note-container');

function render(noteData) {
   noteContainer.innerHTML = ''; // Reset Container First

   let currentIndex = 0;
   noteData.forEach((note) => {
      noteContainer.innerHTML += createItemNote(note, currentIndex);
      currentIndex++;
   });

   // Call handler every render new note item
   modalHandler();
   deleteHandler(noteData);
}

export { render };
