const openModal = document.querySelector('.open-btn-modal');
const modal = document.querySelector('.modal');

function showModalContent() {
   modal.classList.add('open');
}

function closeModalContent(e) {
   const elClass = e.target.classList;
   if (elClass.contains('close-btn-modal') || elClass.contains('modal')) {
      modal.classList.remove('open');
   }
   e.preventDefault();
}

modal.addEventListener('click', closeModalContent);
openModal.addEventListener('click', showModalContent);
