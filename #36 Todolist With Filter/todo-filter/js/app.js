import CONFIG from './config.js';
import { displayList } from './display-list.js';
import { filterNotYet } from './filter.js';

const form = document.querySelector('form');
const input = document.querySelector('#plan');
const todoLists = document.querySelector('#todo-lists');
const removeAllBtn = document.querySelector('#remove-all');
const filterOption = document.querySelector('#filter-note');

// Check if Local Storage item available & use it (if available).
// if there is no item available, replace with empty array
let listNotes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME)) || [];

const saveDataStorage = (arrayContainer) => {
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(arrayContainer));
};

removeAllBtn.addEventListener('click', () => {
   listNotes = [];
   saveDataStorage(listNotes);
   displayList(listNotes);
});

const createNoteObject = (inputValue, save = false) => {
   return {
      id: new Date().toDateString(),
      note: inputValue,
      done: save,
   };
};

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const inputValue = input.value;

   if (inputValue === '' || inputValue == null) {
      return;
   }

   const sameAsData = listNotes.find((item) => item.note == inputValue);
   if (sameAsData) {
      alert('You cannot enter the same name value !');
      return;
   }

   // Return Note object
   const historyPlan = createNoteObject(inputValue);

   listNotes.push(historyPlan); // Push the data to array
   saveDataStorage(listNotes); // save to local storage
   displayList(listNotes);

   // Reset Form after submit data
   form.reset();
});

const noteDone = (index) => {
   listNotes[index].done = true;
};

// Need fix delete button
const noteDelete = (index) => {
   listNotes.splice(index, 1);
};

todoLists.addEventListener('click', (e) => {
   const targetedElement = e.target.parentElement.parentElement;
   const checkClass = targetedElement.classList.contains('list-item');
   const valueOption = filterOption.selectedOptions[0].value;

   // Only if targeting done / delete button
   if (e.target.id == 'done' || e.target.id == 'delete') {
      // Get innerText list & get index array of object
      const getNoteContent = targetedElement.children[0].children[1].innerText;
      const index = listNotes.map((item) => item.note).indexOf(getNoteContent);

      if (e.target.id === 'done') {
         if (checkClass) {
            targetedElement.classList.toggle('done-true');

            if (targetedElement.classList.contains('done-true')) {
               noteDone(index);

               if (valueOption === 'not-yet') {
                  targetedElement.style.display = 'none';
               } else {
                  targetedElement.style.display = 'flex';
               }
            } else {
               listNotes[index].done = false;

               // if press done button on "done" option, the list will be displayed to none
               if (valueOption === 'done') {
                  targetedElement.style.display = 'none';
               } else {
                  targetedElement.style.display = 'flex';
               }
            }
            saveDataStorage(listNotes);
            displayList(listNotes);
         }
      } else if (e.target.id === 'delete') {
         noteDelete(index);
         saveDataStorage(listNotes);
         displayList(listNotes);
      }
   }
});

// Default will only displaying All list items on array listNotes
displayList(listNotes);
