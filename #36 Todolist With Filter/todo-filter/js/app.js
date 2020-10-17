import CONFIG from './config.js';
import { buttonAction } from './button.js';

const form = document.querySelector('form');
const input = document.querySelector('#plan');
const todoLists = document.querySelector('#todo-lists');
const removeAllBtn = document.querySelector('#remove-all');

// Check if Local Storage item available & use it (if available).
// if there is no item available, replace with empty array
let listNotes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME)) || [];

const saveDataStorage = (arrayContainer) => {
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(arrayContainer));
};

const resetContainer = (container) => {
   container.innerHTML = '';
};

const showList = (listNotes) => {
   resetContainer(todoLists);

   let current = 0;
   listNotes.forEach((note) => {
      todoLists.innerHTML += `
        <div class="list-item" data-note-value="${current}">
            <div class="plan-and-date">
                <p class="date">${note.id}</p>
                <h2 class="note-value">${note.note}</h2>
            </div>
            <div class="done-and-delete">
                <button class="btn done" id="done">Done</button>
                <button class="btn delete" id="delete">Delete</button>
            </div>
        </div>
        `;

      // Check object if there is included "saved" value at current index.
      // If its included, add class "done-true" to every items that include "saved" value at current index.
      if (Object.values(listNotes[current]).includes('saved')) {
         const allListItems = document.querySelectorAll('.list-item')[current];
         allListItems.classList.add('done-true');
         console.log(allListItems);
      }
      current++;
   });
};

removeAllBtn.addEventListener('click', () => {
   listNotes = [];
   localStorage.removeItem(CONFIG.STORAGE_NAME);
   showList();
});

const createNoteObject = (inputValue, save = 'not') => {
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

   // Return Note object
   const historyPlan = createNoteObject(inputValue);

   listNotes.push(historyPlan);
   saveDataStorage(listNotes);
   showList();

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

   if (e.target.id === 'done') {
      if (checkAttribute) {
         targetedElement.classList.add('done-true');

         if (targetedElement.classList.contains('done-true')) {
            noteDone(valueIndex);
         } else {
            listNotes[valueIndex].done = 'not';
         }
         saveDataStorage(listNotes);
      }
   } else if (e.target.id === 'delete') {
      noteDelete(valueIndex);
      showList();
   }
});

// Need to check
showList(listNotes);
buttonAction(listNotes);

export { showList };
