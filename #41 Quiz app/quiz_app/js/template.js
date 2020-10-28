import quizData from './data.js';

const correctPanel = document.querySelector('.correct');
const wrongPanel = document.querySelector('.wrong');
const questionText = document.querySelector('.question-text');
const questionNumber = document.querySelector('.question-number');
const aOption = document.querySelector('li#a');
const bOption = document.querySelector('li#b');
const cOption = document.querySelector('li#c');

const finalScoreTemplate = (correctScore, wrongScore) => {
   let emojiScore;

   if (correctScore > wrongScore) {
      emojiScore = '😎';
   } else {
      emojiScore = '😭';
   }

   return `<div class="final-score">
            <h1>Score kamu </h1>
            <h1>${emojiScore}</h1>
                <div class="score">
                    <div class="final-correct"><strong> Correct </strong> ${correctScore}</div>
                    <div class="final-wrong"><strong> Wrong </strong> ${wrongScore}</div>
                </div>
            </div>
    `;
};

const renderScore = (correctScore = 0, wrongScore = 0) => {
   correctPanel.innerHTML = `${correctScore} Correct`;
   wrongPanel.innerHTML = `${wrongScore} Wrong`;
};

const questionShow = (index) => {
   if (index <= quizData.length) {
      questionNumber.innerHTML = `<p>Question ${
         index < quizData.length ? index + 1 : index
      }</p>`;
      questionText.innerHTML = quizData[index].question;
      aOption.innerHTML = `<span class="option">A</span>${quizData[index].a}`;
      bOption.innerHTML = `<span class="option">B</span>${quizData[index].b}`;
      cOption.innerHTML = `<span class="option">C</span>${quizData[index].c}`;
   }
};

export { finalScoreTemplate, renderScore, questionShow };
