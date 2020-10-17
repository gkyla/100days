import { showList } from './app.js';

const filterDone = (listNotes) => {
   if (listNotes == undefined || listNotes == null) {
      return;
   }

   const done = listNotes.filter((note) => note.done === 'saved');
   showList(done);
};

const filterAll = (listNotes) => {
   showList(listNotes);
};

const filterNotYet = (listNotes) => {
   if (listNotes == undefined || listNotes == null) {
      return;
   }

   const notYet = listNotes.filter((note) => note.done === 'not');
   showList(notYet);
};

export { filterAll, filterDone, filterNotYet };
