const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');

function showModal() {
   modal.classList.add('open');
}

function closeModal() {
   modal.classList.remove('open');
}

openBtn.addEventListener('click', showModal);
closeBtn.addEventListener('click', closeModal);
