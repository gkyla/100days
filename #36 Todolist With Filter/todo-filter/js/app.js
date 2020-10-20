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

const noteDelete = (index) => {
   listNotes.splice(index, 1);
};

todoLists.addEventListener('click', (e) => {
   const targetedElement = e.target.parentElement.parentElement;
   const containsListItem = targetedElement.classList.contains('list-item');
   const valueOption = filterOption.selectedOptions[0].value;
   const targetedIdElement = e.target.id;

   // Only if targeting done / delete button , then do ..
   if (targetedIdElement == 'done' || targetedIdElement == 'delete') {
      // Get innerText list & get index array of object
      const getNoteContent = targetedElement.children[0].children[1].innerText; // note value
      const index = listNotes.map((item) => item.note).indexOf(getNoteContent);

      switch (targetedIdElement) {
         case 'done':
            if (containsListItem) {
               // add if no class done-true
               targetedElement.classList.toggle('done-true');

               if (targetedElement.classList.contains('done-true')) {
                  // If contains class "done-true " change "note" property value to "true"
                  listNotes[index].done = true;

                  // if press done button at "Not Yet" option, the list will be displayed to none
                  if (valueOption === 'not-yet') {
                     targetedElement.style.display = 'none';
                  } else {
                     targetedElement.style.display = 'flex';
                  }
               } else {
                  // If not contains class "done-true" change "note" property value to "false"
                  listNotes[index].done = false;

                  // if press done button at "done" option, the list will be displayed to none
                  if (valueOption === 'done') {
                     targetedElement.style.display = 'none';
                  } else {
                     targetedElement.style.display = 'flex';
                  }
               }
               saveDataStorage(listNotes);
               displayList(listNotes);
            }
            break;
         case 'delete':
            noteDelete(index);
            saveDataStorage(listNotes);
            displayList(listNotes);
            break;
         default:
            console.log('Something gone wrong !');
      }
   }
});

// Default will only displaying All list items on array listNotes
displayList(listNotes);
