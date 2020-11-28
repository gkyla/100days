import {
   createAsideContent,
   createColorLightPreview,
   createCardArticle,
   createColorDarkenPreview,
} from './createHelper.js';

// Run function

document.addEventListener('DOMContentLoaded', () => {
   createColorLightPreview(10);
   createCardArticle(3);
   createColorDarkenPreview(10);
   createAsideContent();
});
