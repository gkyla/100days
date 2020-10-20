import CONFIG from './config.js';

const todoLists = document.querySelector('#todo-lists');
const filterOption = document.querySelector('#filter-note');

const resetContainer = (container) => {
   container.innerHTML = '';
};

const render = (data) => {
   resetContainer(todoLists);
   const selectedValue = filterOption.selectedOptions[0].value;

   if (Object.entries(data).length == 0) {
      switch (selectedValue) {
         case 'all':
            todoLists.innerHTML = `<h2> No Plan has been created :( </h2>`;
            break;
         case 'done':
            todoLists.innerHTML = `<h2> No Plan has been finished :( </h2>`;
            break;
         case 'not-yet':
            const checkLocalItem = JSON.parse(
               localStorage.getItem(CONFIG.STORAGE_NAME)
            );

            // Check localStorage , if item not equal to 0 and then "not-yet" option has no item inside it
            // Then we know that either the item has been marked done or there is no item inside the data.
            if (!Object.entries(checkLocalItem).length == 0) {
               todoLists.innerHTML = `<h2> Yey looks like you finished your all plan :D!</h2>`;
            } else {
               todoLists.innerHTML = `<h2> No Plan has been created & finished :( </h2>`;
            }
            break;
         default:
            console.error('Something gone wrong ');
            break;
      }
   }

   let currentIndex = 0;
   data.forEach((item) => {
      todoLists.innerHTML += `
         <div class="list-item" data-note-value="${currentIndex}">
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
      // "data" in here means "array" in argument function passed to the render function as an parameter.
      if (Object.values(data[currentIndex]).includes(true)) {
         const allListItemsCurrent = document.querySelectorAll('.list-item')[
            currentIndex
         ];
         allListItemsCurrent.classList.toggle('done-true');
      }
      currentIndex++;
   });
};

export { render };
