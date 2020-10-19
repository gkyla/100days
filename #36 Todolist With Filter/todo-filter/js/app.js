import CONFIG from './config.js';
import { displayList } from './display-list.js';

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

const createNoteObject = (inputValue, save = 'not') => {
   return {
      id: new Date().toDateString(),
      note: inputValue,
      done: save,
   };
};

form.addEventListener('submit', (e) => {
   filterOption.selectedIndex = 0;
   e.preventDefault();

   const inputValue = input.value;

   if (
      inputValue === '' ||
      inputValue == null ||
      inputValue == 'saved' ||
      inputValue == 'not'
   ) {
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
   listNotes[index].done = 'saved';
};

// Need fix delete button
const noteDelete = (index) => {
   listNotes.splice(index, 1);
};

todoLists.addEventListener('click', (e) => {
   const targetedElement = e.target.parentElement.parentElement;
   const checkAttribute = targetedElement.hasAttribute('data-note-value');
   const valueIndex = targetedElement.getAttribute('data-note-value');
   const valueOption = filterOption.selectedOptions[0].value;

   if (e.target.id === 'done') {
      if (checkAttribute) {
         targetedElement.classList.toggle('done-true');

         if (targetedElement.classList.contains('done-true')) {
            noteDone(valueIndex);

            if (valueOption === 'not-yet') {
               targetedElement.style.display = 'none';
            } else {
               targetedElement.style.display = 'flex';
            }
         } else {
            listNotes[valueIndex].done = 'not';

            // if press done button on "done" option, the list will be displayed to none
            if (valueOption === 'done') {
               targetedElement.style.display = 'none';
            } else {
               targetedElement.style.display = 'flex';
            }
         }
         saveDataStorage(listNotes);
      }
   } else if (e.target.id === 'delete') {
      console.log(listNotes);
      noteDelete(valueIndex);
      saveDataStorage(listNotes);
      displayList(listNotes);
   }
});

// Default will only displaying All list items on array listNotes
displayList(listNotes);
