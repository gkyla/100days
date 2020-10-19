import { filterAll, filterDone, filterNotYet } from './filter.js';

const filterOption = document.querySelector('#filter-note');

const buttonAction = (listNotes) => {
   filterOption.addEventListener('change', () => {
      let selectedValue = filterOption.selectedOptions[0].value;

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

export { buttonAction };
