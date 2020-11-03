import { getStorage, saveItemAndRender } from '../data/storage.js';
import noteToObject from './data-format.js';

const input = document.querySelector('input');
const textArea = document.querySelector('textarea');

function submitNoteData(e) {
   e.preventDefault();

   const inputValue = input.value;
   const textAreaValue = textArea.value;

   // Trim Whitespace , user cant add note by only typing space inside input & textarea
   // (For checking user input purpose only)
   const checkInput = inputValue.trim();
   const checkTextArea = textAreaValue.trim();

   if (checkInput == null || checkInput == '') return;
   if (checkTextArea == null || checkTextArea == '') return;

   const storage = getStorage();
   const id = uniqueId(storage);
   const note = noteToObject(id, inputValue, textAreaValue);
   saveItemAndRender(note);

   this.reset();
}

function uniqueId(storage) {
   let newId;
   if (storage.length === 0) {
      // If storage 0 , id will be 1
      newId = 1;
   } else {
      storage.forEach((el, index) => {
         // get current id in current index
         // After that , increment by 1 to get unique id
         // When the item is deleted it will still get the current id + 1

         newId = storage[index].id + 1;
      });
   }

   return newId;
}

export { submitNoteData };
