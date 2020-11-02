import { renderSave } from '../data/storage.js';

const modalButtonAction = {
   openModal(modalEl, i) {
      modalEl[i].classList.add('open');
   },
   closeModal(modalEl) {
      modalEl.forEach((element) => {
         element.classList.remove('open');
      });
   },
   editModal(modalEl) {
      console.log(modalEl[0]);
   },
};

function modalHandler(noteData) {
   const items = document.querySelectorAll('.item');
   const modalEl = document.querySelectorAll('.modal');

   items.forEach((item) => {
      item.addEventListener('click', (e) => {
         const getUniqueId = item.getAttribute('data-id-note');

         const getIndex = noteData.findIndex((el) => el.id == getUniqueId);
         const inputs = document.querySelector(`#title-modal-${getIndex}`);
         const textArea = document.querySelector(`#edit-${getIndex}`);
         const saveModalBtn = document.querySelectorAll('.save-modal')[
            getIndex
         ];
         const currentStatus = document.querySelectorAll(`.current-status`)[
            getIndex
         ];

         const target = e.target.id; // Get target id

         switch (target) {
            case 'open-edit':
               modalButtonAction.openModal(modalEl, getIndex);

               // If User not pressing "Edit" user can't press Save
               saveModalBtn.style.pointerEvents = 'none';
               saveModalBtn.style.color = '#fff';

               break;
            case 'close-modal':
               // Set Timeout 500ms to go back to default style after press close
               setTimeout(() => {
                  inputs.setAttribute('disabled', '');
                  textArea.setAttribute('disabled', '');
                  currentStatus.innerText = 'Read-Only';

                  // When user press "Edit" and changing input/textarea but not Saving the Note
                  // the input will return to what it was before changing

                  inputs.value = noteData[getIndex].title;
                  textArea.value = noteData[getIndex].title;
               }, 200);

               modalButtonAction.closeModal(modalEl);
               break;
            case 'edit-modal':
               // Remove Attribute "disabled"
               // Now user can type in input & textarea inside modal
               inputs.removeAttribute('disabled');
               textArea.removeAttribute('disabled');
               currentStatus.innerText = 'Edit-Mode';
               saveModalBtn.style.pointerEvents = '';
               saveModalBtn.style.color = '';

               modalButtonAction.editModal(modalEl);
               break;
            case 'save-modal':
               // Get Input & textarea Value
               // Overwrite Current Index Object with the value
               noteData[getIndex].title = inputs.value;
               noteData[getIndex].text = textArea.value;

               // After that render & save
               renderSave();

               break;
         }
      });
   });
}

export { modalHandler };
