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

   const getNote = noteToObject(0, inputValue, textAreaValue);
   saveStorageAndRender(getNote);

   this.reset();
}

export { submitNoteData };
