import CONFIG from '../data/config.js';
import { saveStorageAndRender } from '../data/storage.js';
import noteToObject from './data-format.js';

const input = document.querySelector('input');
const textArea = document.querySelector('textarea');

function submitNoteData(e) {
   e.preventDefault();

   const inputValue = input.value;
   const textAreaValue = textArea.value;

   if (inputValue == null || inputValue == '') return;
   if (textAreaValue == null || textAreaValue == '') return;

   const getNoteArray = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME));
   const dataLength = getNoteArray.length; // Get Data Array length

   let uniqueId = 0;
   while (uniqueId <= dataLength) {
      uniqueId++; // Increment every submit form to get unique id
   }

   const getNote = noteToObject(uniqueId, inputValue, textAreaValue);
   saveStorageAndRender(getNote);
   this.reset();
}

export { submitNoteData };
