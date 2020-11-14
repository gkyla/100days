const testDiv = document.querySelectorAll('.image');

const cat = async () => {
   const response = await fetch('https://api.thecatapi.com/v1/images/search');
   const data = await response.json();
   return data;
};

const dataCat = cat();
dataCat.then((data) => {
   testDiv.forEach((div) => (div.innerHTML = `<img src="${data[0].url}">`));
});
