import { filterLowestRatingProduct, filterHighestRatingProduct, showChoosenCity, filterHighestRatingProductAndCity, filterLowestRatingProductAndCity } from "./filter.js"
import { resetContainer } from './template.js'
import { showTheRestaurant } from './app.js'

const buttonSearch = document.querySelector('#button-search')
const ratingSelect = document.querySelector('.rating-select')
const citySelect = document.querySelector('.city-select')
const clear = document.querySelector('#button-clear')

const buttonAction = () => {
    let optionRating;
    let optionCity;

    clear.addEventListener('click', () => {
        citySelect.selectedIndex = 0
        ratingSelect.selectedIndex = 0
        resetContainer()
        showTheRestaurant()
    })

    citySelect.addEventListener('change', () => {
        optionCity = citySelect.selectedOptions[0].id
        if (citySelect.selectedIndex === 0) {
            optionCity = undefined
        }
    })

    ratingSelect.addEventListener('change', () => {
        optionRating = ratingSelect.selectedOptions[0].id
        if (ratingSelect.selectedIndex === 0) {
            optionRating = undefined
        }
    })

    buttonSearch.addEventListener('click', async () => {
        if (optionRating === 'highest' && optionCity !== undefined) {
            await filterHighestRatingProductAndCity(optionCity)
        } else if (optionRating === 'lowest' && optionCity !== undefined) {
            await filterLowestRatingProductAndCity(optionCity)
        } else if (optionRating === 'highest' && optionCity === undefined) {
            await filterHighestRatingProduct()
        } else if (optionRating === 'lowest') {
            await filterLowestRatingProduct()
        } else if (optionCity !== undefined) {
            await showChoosenCity(optionCity)
        } else {
            resetContainer()
            showTheRestaurant()
        }
    })
}

export default buttonAction