const inputs = document.querySelectorAll('input');
const img = document.querySelector('img');

inputs.forEach((input) => input.addEventListener('change', changeEffect));
inputs.forEach((input) => input.addEventListener('mousemove', changeEffect));

function changeEffect() {
   const suffix = this.dataset.change || '';

   // Style only on img
   img.style.setProperty(`--${this.name}`, this.value + suffix);

   // HTML Doc
   //    document.documentElement.style.setProperty(
   //       `--${this.name}`,
   //       this.value + suffix
   //    );
}
