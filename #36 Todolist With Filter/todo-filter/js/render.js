const todoLists = document.querySelector('#todo-lists');

const resetContainer = (container) => {
   container.innerHTML = '';
};

const render = (data) => {
   resetContainer(todoLists);

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
      if (Object.values(data[currentIndex]).includes('saved')) {
         const allListItemsCurrent = document.querySelectorAll('.list-item')[
            currentIndex
         ];
         allListItemsCurrent.classList.toggle('done-true');
      }
      currentIndex++;
   });
};

export { render };
