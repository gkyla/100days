import CONFIG from './config.js';
import { buttonAction } from './button.js';

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

const resetContainer = (container) => {
   container.innerHTML = '';
};

const showList = (data) => {
   resetContainer(todoLists);

   let current = 0;
   data.forEach((item) => {
      todoLists.innerHTML += `
        <div class="list-item" data-note-value="${current}">
            <div class="plan-and-date">
                <p class="date">${item.id}</p>
                <h2 class="note-value">${item.note}</h2>
            </div>
            <div class="done-and-delete">
                <button class="btn done" id="done">Done</button>
                <button class="btn delete" id="delete">Delete</button>
            </div>
        </div>
        `;

      // Check object if there is included "saved" value at current index.
      // If its included, add class "done-true" to every items that include "saved" value at current index.
      // "data" in here means "array" in argument function passed to the showList function as an parameter.
      if (Object.values(data[current]).includes('saved')) {
         const allListItems = document.querySelectorAll('.list-item')[current];
         allListItems.classList.toggle('done-true');
      }
      current++;
   });
};

removeAllBtn.addEventListener('click', () => {
   listNotes = [];
   console.log(listNotes);
   saveDataStorage(listNotes);
   buttonAction(listNotes);
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

   if (inputValue === '' || inputValue == null) {
      return;
   }

   // Return Note object
   const historyPlan = createNoteObject(inputValue);

   listNotes.push(historyPlan); // Push the data to array
   saveDataStorage(listNotes); // save to local storage
   showList(listNotes);

   // Reset Form after submit data
   form.reset();
});

const noteDone = (index) => {
   listNotes[index].done = 'saved';
};

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
            }
         } else {
            listNotes[valueIndex].done = 'not';

            // if press done button on "done" option, the list will be displayed to none
            if (valueOption === 'done') {
               targetedElement.style.display = 'none';
            }
         }
         saveDataStorage(listNotes);
      }
   } else if (e.target.id === 'delete') {
      noteDelete(valueIndex);
      saveDataStorage(listNotes);
   }
});

// Default will only displaying All list items on array listNotes
showList(listNotes);
buttonAction(listNotes);

export { showList, saveDataStorage };

// Need to change buttonAction function name to be general name
