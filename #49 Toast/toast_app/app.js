const sendData = document.querySelector('#open-toast');
sendData.addEventListener('click', toastNotification);
const setQuery = window.matchMedia('(min-width:900px)');

function toastNotification() {
   const createEl = document.createElement('div');

   createEl.innerHTML = `      
    <div class="toast-content">
        <img src="./img/checklist.png" alt="checklist" />
        <p>Data sent succesfully</p>
    </div>
    <button id="close" class="close">x</button>
    `;

   document.body.appendChild(createEl);
   createEl.classList.add('toast', 'open');
   const toasts = document.querySelectorAll('.toast');
   const closeBtn = document.querySelectorAll('#close');
   toasts.forEach((toast, index) => {
      let bottomOffset = index * 70;

      if (setQuery.matches) {
         toast.style.bottom = bottomOffset;
      } else {
         toast.style.bottom = '0';
      }

      setTimeout(() => {
         toast.classList.remove('open');
      }, 2000);
      setTimeout(() => {
         toast.remove();
      }, 2500);
   });

   closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
         btn.parentElement.remove();
      });
   });
}
