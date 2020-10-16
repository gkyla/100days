import { filterLowestRatingProduct, filterHighestRatingProduct, filterAtoZ, filterZtoA, showChoosenCity } from "./filter.js"
import { resetContainer } from './template.js'

const buttonHighestRating = document.querySelector('#highest')
const buttonLowestRating = document.querySelector('#lowest')
const buttonAtoZ = document.querySelector('#alphabet')
const buttonZtoA = document.querySelector('#reverseAlphabet')
const dropDownCity = document.querySelector('#avaible-city')



const buttonAction = () => {
    buttonHighestRating.addEventListener('click', async () => {
        resetContainer()
        await filterHighestRatingProduct()
    })

    buttonLowestRating.addEventListener('click', async () => {
        resetContainer()
        await filterLowestRatingProduct()
    })

    buttonAtoZ.addEventListener('click', async () => {
        resetContainer()
        await filterAtoZ()
    })

    buttonZtoA.addEventListener('click', async () => {
        resetContainer()
        await filterZtoA()
    })

    dropDownCity.addEventListener('click', async (event) => {
        resetContainer()
        const choosenCityButton = event.target.textContent
        await showChoosenCity(choosenCityButton)
    })


}

export default buttonAction