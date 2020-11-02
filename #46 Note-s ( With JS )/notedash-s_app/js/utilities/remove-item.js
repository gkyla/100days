import { renderSave } from '../data/storage.js';

function deleteHandler(noteData) {
   const removeEl = document.querySelectorAll('.delete-item');

   removeEl.forEach((element) => {
      element.addEventListener('click', () => {
         const getUniqueId = element.parentElement.getAttribute('data-id-note');
         const getIndex = noteData.findIndex((el) => el.id == getUniqueId);

         noteData.splice(getIndex, 1);
         renderSave(noteData);
      });
   });
}

export { deleteHandler };
