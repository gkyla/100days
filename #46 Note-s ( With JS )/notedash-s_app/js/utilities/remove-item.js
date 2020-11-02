import CONFIG from '../data/config.js';
import { saveStorageAndRender } from '../data/storage.js';

function deleteItem(uniqueId, data) {
   data.splice(0, 1);
   saveStorageAndRender(data);
}

function deleteHandler(noteData) {
   const removeEl = document.querySelectorAll('.delete-item');

   removeEl.forEach((element) => {
      element.addEventListener('click', () => {
         const getUniqueId = element.parentElement.getAttribute('data-id-note');
         const asd = getUniqueId.toString();
         const storage = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME));
         const index = storage.map((element) => element.id).indexOf(asd);

         console.log(index);
      });
   });
}

export { deleteHandler };
