import { setLocalStorageAndRender } from './data/storage.js';
import { submitNoteData } from './utilities/form-handle.js';
import modalSettings from './utilities/modal-settings.js';

setLocalStorageAndRender(); // Set Local Storage & Render Available Data

const openModalBtn = document.querySelectorAll('.open-edit');
const closeModalBtn = document.querySelectorAll('.close-modal');
const deleteItem = document.querySelectorAll('.delete-item');
const items = document.querySelectorAll('.item');
const form = document.querySelector('form');
const modalEl = document.querySelectorAll('.modal');

openModalBtn.forEach((openEl) => {
   openEl.addEventListener('click', () => {
      modalSettings.openModal(modalEl);
   });
});
closeModalBtn.forEach((closeEl) => {
   closeEl.addEventListener('click', () => {
      modalSettings.closeModal(modalEl);
   });
});

form.addEventListener('submit', submitNoteData);
