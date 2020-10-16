import { getData } from './app.js'
import { productTemplate, uniqueCityList } from './template.js'
import { resetContainer } from './template.js'

const filterLowestRatingProduct = async () => {
    resetContainer()
    const restaurants = await getData()
    restaurants.sort((a, b) => a.rating - b.rating)
    productTemplate(restaurants)
}

const filterHighestRatingProduct = async () => {
    resetContainer()
    const restaurants = await getData()
    restaurants.sort((a, b) => b.rating - a.rating)
    productTemplate(restaurants)
}

const avaibleRestaurantCityList = async () => {
    resetContainer()
    const restaurants = await getData()
    const cityArray = restaurants.map((restaurant) => restaurant.city)
    const uniqueValueCity = [... new Set(cityArray)]
    uniqueCityList(uniqueValueCity)
}

const filterLowestRatingProductAndCity = async (choosenCityButton) => {
    resetContainer()
    const restaurants = await getData()
    const filteredRatingAndCity = restaurants.filter((restaurant) => restaurant.city === `${choosenCityButton}`).sort((a, b) => a.rating - b.rating)
    productTemplate(filteredRatingAndCity)
}

const filterHighestRatingProductAndCity = async (choosenCityButton) => {
    resetContainer()
    const restaurants = await getData()
    const filteredRatingAndCity = restaurants.filter((restaurant) => restaurant.city === `${choosenCityButton}`).sort((a, b) => b.rating - a.rating)
    productTemplate(filteredRatingAndCity)
}

const showChoosenCity = async (choosenCityButton) => {
    resetContainer()
    const restaurants = await getData()
    const showChoosenCityArray = restaurants.filter((restaurant) => restaurant.city === `${choosenCityButton}`)
    productTemplate(showChoosenCityArray)
}

export { filterLowestRatingProduct, filterHighestRatingProduct, avaibleRestaurantCityList, showChoosenCity, filterLowestRatingProductAndCity, filterHighestRatingProductAndCity }