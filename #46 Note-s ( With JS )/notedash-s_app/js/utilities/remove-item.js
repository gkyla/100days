import { setLocalStorageAndRender } from '../data/storage.js';

function deleteHandler(noteData) {
   const removeEl = document.querySelectorAll('.delete-item');

   removeEl.forEach((element) => {
      element.addEventListener('click', () => {
         const getUniqueId = element.parentElement.getAttribute('data-id-note');
         const index = noteData.findIndex((el) => el.id == getUniqueId);

         noteData.splice(index, 1);
         setLocalStorageAndRender(noteData);
      });
   });
}

export { deleteHandler };
