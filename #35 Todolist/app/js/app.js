import CONFIG from './config.js';

const form = document.querySelector('form');
const input = document.querySelector('#plan');
const todoLists = document.querySelector('#todo-lists');
const removeAllBtn = document.querySelector('#remove-all');

// Check if Local Storage item available & use it.
// if there is no item available, replace with empty array
let listNotes = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME)) || [];

const saveDataStorage = (arrayContainer) => {
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(arrayContainer));
};

const resetContainer = (container) => {
   container.innerHTML = '';
};

const showList = () => {
   resetContainer(todoLists);

   const data = listNotes;
   let current = 0;
   data.forEach((data) => {
      todoLists.innerHTML += `
        <div class="list-item" data-note-value="${current}">
            <div class="plan-and-date">
                <p class="date">${data.id}</p>
                <h2 class="note-value">${data.note}</h2>
            </div>
            <div class="done-and-delete">
                <button class="btn done" id="done">Done</button>
                <button class="btn delete" id="delete">Delete</button>
            </div>
        </div>
        `;
      current++;
   });
};

removeAllBtn.addEventListener('click', () => {
   listNotes = [];
   localStorage.removeItem(CONFIG.STORAGE_NAME);
   showList();
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

   // Return Note object
   const historyPlan = createNoteObject(inputValue);

   listNotes.push(historyPlan);
   saveDataStorage(listNotes);
   showList();

   // Reset Form after submit data
   form.reset();
});

const noteDone = (index) => {
   listNotes[index].done = true;
};

const noteDelete = (index) => {
   listNotes.splice(index, 1);
};

todoLists.addEventListener('click', (e) => {
   const targetedElement = e.target.parentElement.parentElement;
   const checkAttribute = targetedElement.hasAttribute('data-note-value');

   if (e.target.id === 'done') {
      if (checkAttribute) {
         const valueIndex = targetedElement.getAttribute('data-note-value');
         noteDone(valueIndex);
         saveDataStorage(listNotes);
      }
   } else if (e.target.id === 'delete') {
      const valueIndex = targetedElement.getAttribute('data-note-value');
      noteDelete(valueIndex);
      showList();
   }
});

showList();
