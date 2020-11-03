import { render } from '../render.js';
import CONFIG from './config.js';

const getStorage = () => {
   return JSON.parse(localStorage.getItem(CONFIG.STORAGE_NAME)) || [];
};

let noteData = getStorage();

const saveStorage = () => {
   localStorage.setItem(CONFIG.STORAGE_NAME, JSON.stringify(noteData));
};

const setLocalStorageAndRender = () => {
   saveStorage();
   render(noteData);
};

const saveItemAndRender = (item) => {
   noteData.push(item);
   saveStorage();
   render(noteData);
};

export { setLocalStorageAndRender, saveItemAndRender, getStorage };
