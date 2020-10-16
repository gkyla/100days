import CONFIG from "../config.js"

const container = document.querySelector('#content')
const cityDropDown = document.querySelector('.avaible-city')

const resetContainer = () => {
    container.innerHTML = ''
}

const productTemplate = (restaurants) => {
    restaurants.forEach((restaurant) => {
        container.innerHTML +=
            `
        <div class="col-sm-4 d-flex justify-content-center mt-2 mb-2">
            <div class="card" style="width: 18rem; min-height: 400px">
                <img src="${CONFIG.API_IMG}/${restaurant.pictureId}" class="card-img-top" alt="${restaurant.name}">
                <div class="card-body">
                    <h5 class="card-title">${restaurant.name}</h5>
                    <p class="card-text cs-text">${restaurant.description}</p>
                    <p class="card-text">Rating : ${restaurant.rating}</p>
                    <p class="card-text">City : ${restaurant.city}</p>
                </div>
            </div>
        </div>
        `
    })
}

const uniqueCityList = (uniqueList) => {
    let listItem = '';
    let currentNumber = 1
    uniqueList.forEach((list) => {
        listItem +=
            `
        <option value="${currentNumber}" id="${list}">${list}</option>
        `
        currentNumber++
    })
    cityDropDown.innerHTML += listItem
}

export { productTemplate, uniqueCityList, resetContainer }