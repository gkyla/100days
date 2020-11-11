window.addEventListener('keydown', soundFeedBack);

function soundFeedBack(e) {
   const drum = document.querySelector(`.drum[data-sound="${e.code}"]`);
   const audio = document.querySelector(`audio[data-sound="${e.code}"]`);

   // If no audio stop function
   if (!audio) return;
   audio.currentTime = 0;
   audio.play();
   drum.classList.add('sound-on');
}

const drums = document.querySelectorAll('.drum');
drums.forEach((drum) => {
   drum.addEventListener('transitionend', remove);
});
function remove() {
   this.classList.remove('sound-on');
}
