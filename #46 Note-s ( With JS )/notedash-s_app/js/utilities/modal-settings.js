const modalSettings = {
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

export default modalSettings;
