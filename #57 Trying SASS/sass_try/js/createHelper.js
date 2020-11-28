import {
   templateArticle,
   templateColorPreview,
   templateAsideContent,
   templateColorDarkenPreview,
} from './template.js';

const article = document.querySelector('article');
const colorLighten = document.querySelector('.color-lighten');
const colorDarken = document.querySelector('.color-darken');
const aside = document.querySelector('aside');

const createCardArticle = (amount) => {
   for (let i = 1; i <= amount; i++) {
      article.innerHTML += templateArticle();
   }
};

const createColorLightPreview = (amount) => {
   for (let i = 1; i <= amount; i++) {
      colorLighten.innerHTML += templateColorPreview();
   }
};

const createColorDarkenPreview = (amount) => {
   for (let i = 1; i <= amount; i++) {
      colorDarken.innerHTML += templateColorDarkenPreview();
   }
};

const createAsideContent = () => {
   aside.innerHTML = templateAsideContent();
};

export {
   createCardArticle,
   createColorLightPreview,
   createAsideContent,
   createColorDarkenPreview,
};
