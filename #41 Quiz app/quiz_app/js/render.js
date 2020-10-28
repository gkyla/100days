import quizData from './data.js';
import { finalScoreTemplate, renderScore, questionShow } from './template.js';

const li = document.querySelectorAll('li[data-option-answer]');
const questionContainer = document.querySelector('.question-container');
const showScore = document.querySelector('.show-score');
const btnNext = document.querySelector('#btn-next');
const btnRetry = document.querySelector('#btn-retry');

function render() {
   // Base Score & Index
   let correctScore = 0;
   let wrongScore = 0;
   let index = 0;

   renderScore();
   questionShow(index);

   li.forEach((el) => {
      btnNext.addEventListener('click', () => {
         // If list clicked -> active , if active then do ..
         if (el.classList.contains('active')) {
            const answerOption = el.id;
            const quizQuestion = quizData[index].answer;

            if (quizQuestion == answerOption) {
               correctScore++;
            } else if (quizQuestion !== answerOption) {
               wrongScore++;
            }
            index++;

            // Remove class active after click button
            li.forEach((li) => li.classList.remove('active'));
         }

         if (index >= quizData.length) {
            questionContainer.innerHTML = finalScoreTemplate(
               correctScore,
               wrongScore
            );

            showScore.style.visibility = 'hidden';
            btnRetry.style.display = 'block';

            // Remove button 'Answer Question' if quiz over
            btnNext.remove();
         } else {
            questionShow(index);
            renderScore(correctScore, wrongScore);
         }
      });
   });
   btnRetry.style.display = 'none';
}

btnRetry.addEventListener('click', () => {
   window.location.href = 'index.html';
});

export { render };
