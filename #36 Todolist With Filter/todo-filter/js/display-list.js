import { filterAll, filterDone, filterNotYet } from './filter.js';

const filterOption = document.querySelector('#filter-note');

const displayList = (listNotes) => {
   if (filterOption.selectedOptions[0].value == 'done') {
      filterDone(listNotes);
   } else if (filterOption.selectedOptions[0].value == 'not-yet') {
      filterNotYet(listNotes);
   } else {
      filterAll(listNotes);
   }

   filterOption.addEventListener('change', () => {
      const selectedValue = filterOption.selectedOptions[0].value;
      switch (selectedValue) {
         case 'all':
            filterAll(listNotes);
            break;
         case 'done':
            filterDone(listNotes);
            break;
         case 'not-yet':
            filterNotYet(listNotes);
            break;
         default:
            console.error('looks like something gone wrong !');
      }
   });
};

export { displayList };
