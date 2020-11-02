const modalToggle = {
   openModal(modalEl) {
      modalEl.forEach((element) => {
         element.classList.add('open');
      });
   },
   closeModal(modalEl) {
      modalEl.forEach((element) => {
         element.classList.remove('open');
      });
   },
};

function modalHandler() {
   const openModalBtn = document.querySelectorAll('.open-edit');
   const closeModalBtn = document.querySelectorAll('.close-modal');
   const modalEl = document.querySelectorAll('.modal');

   openModalBtn.forEach((openEl) => {
      openEl.addEventListener('click', () => {
         modalToggle.openModal(modalEl);
      });
   });
   closeModalBtn.forEach((closeEl) => {
      closeEl.addEventListener('click', () => {
         modalToggle.closeModal(modalEl);
      });
   });
}

export { modalHandler };
