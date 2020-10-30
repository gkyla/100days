// Define Media Query width , matchMedia will return an a object
const setWidth = window.matchMedia('(max-width:768px)');

function handleChange(mediaWidth) {
   // Check matches property, If less than or equal to 768px it will return true value
   if (mediaWidth.matches) {
      // If matches then do ...
      document.body.style.backgroundColor = '#fcf876';
      document.body.style.color = '#1c2b2d';
   } else {
      // Otherwise do ...
      document.body.style.color = '#fff';
      document.body.style.backgroundColor = '#1c2b2d';
   }
}

// Pass an argument to function
handleChange(setWidth);

// Listen onChange
setWidth.addEventListener('change', handleChange);
