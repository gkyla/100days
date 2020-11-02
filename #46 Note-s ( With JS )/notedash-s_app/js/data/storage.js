import { render } from '../render.js';
import CONFIG from './config.js';

let noteData = JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME)) || [];

const setLocalStorageAndRender = () => {
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(noteData));
   render(noteData);
};

const saveStorageAndRender = (item) => {
   noteData.push(item);
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(noteData));
   render(noteData);
};

export { setLocalStorageAndRender, saveStorageAndRender };