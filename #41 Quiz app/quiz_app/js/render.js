import quizData from './data.js';

const questionText = document.querySelector('.question-text');
const aOption = document.querySelector('li#a');
const bOption = document.querySelector('li#b');
const cOption = document.querySelector('li#c');
const li = document.querySelectorAll('li[data-option-answer]');
const questionNumber = document.querySelector('.question-number');
const btnNext = document.querySelector('#btn-next');
const btnRetry = document.querySelector('#btn-retry');
const correct = document.querySelector('.correct');
const wrong = document.querySelector('.wrong');
const questionContainer = document.querySelector('.question-container');

function render() {
   let correctScore = 0;
   let wrongScore = 0;
   let index = 0;

   renderScore();
   questionShow(index);

   li.forEach((el) => {
      btnNext.addEventListener('click', () => {
         if (el.classList.contains('active')) {
            const getAnswer = el.id;
            const quizQuestion = quizData[index].answer;

            if (quizQuestion == getAnswer) {
               correctScore++;
            } else if (quizQuestion !== getAnswer) {
               wrongScore++;
            }
            index++;
         }

         if (index >= quizData.length) {
            questionContainer.innerHTML = `<div class="final-score">
               <h1>Score kamu 🎉🎉🎉 </h1>
              <div class="score">
               <div class="final-correct"><strong> Correct </strong> ${correctScore}</div>
               <div class="final-wrong"><strong> Wrong </strong> ${wrongScore}</div>
              </div>
            </div>
            `;
            btnNext.style.display = 'none';
            btnRetry.style.display = '';
            correct.style.display = 'none';
            wrong.style.display = 'none';
         } else {
            questionShow(index);
            renderScore(correctScore, wrongScore);
         }
      });
   });

   btnRetry.style.display = 'none';
}

function questionShow(index) {
   if (index <= quizData.length) {
      questionNumber.innerHTML = `<p>Question ${
         index < quizData.length ? index + 1 : index
      }</p>`;
      questionText.innerHTML = quizData[index].question;
      aOption.innerHTML = `<span class="option">A</span>${quizData[index].a}`;
      bOption.innerHTML = `<span class="option">B</span>${quizData[index].b}`;
      cOption.innerHTML = `<span class="option">C</span>${quizData[index].c}`;
   }
}

function tryAgain(index) {
   btnRetry.addEventListener('click', () => {
      index = 0;
      render();
   });
}

function renderScore(correctScore = 0, wrongScore = 0) {
   correct.innerHTML = `${correctScore} Correct`;
   wrong.innerHTML = `${wrongScore} Wrong`;
}

console.log(quizData.length);

export { render, tryAgain };
