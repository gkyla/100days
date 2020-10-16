import { getData } from './app.js'
import { productTemplate, uniqueCityList } from './template.js'

const filterLowestRatingProduct = async () => {
    const restaurants = await getData()
    restaurants.sort((a, b) => a.rating - b.rating)
    productTemplate(restaurants)
}

const filterHighestRatingProduct = async () => {
    const restaurants = await getData()
    restaurants.sort((a, b) => b.rating - a.rating)
    productTemplate(restaurants)
}

const filterAtoZ = async () => {
    const restaurants = await getData()
    restaurants.sort((a, b) => a.name.localeCompare(b.name))
    productTemplate(restaurants)
}

const filterZtoA = async () => {
    const restaurants = await getData()
    restaurants.sort((a, b) => b.name.localeCompare(a.name))
    productTemplate(restaurants)
}

const avaibleRestaurantCityList = async () => {
    const restaurants = await getData()
    const cityArray = restaurants.map((restaurant) => restaurant.city)
    const uniqueValueCity = [... new Set(cityArray)]
    uniqueCityList(uniqueValueCity)
}

const showChoosenCity = async (choosenCityButton) => {
    const restaurants = await getData()
    const showChoosenCityArray = restaurants.filter((restaurant) => restaurant.city === `${choosenCityButton}`)
    productTemplate(showChoosenCityArray)
}

export { filterLowestRatingProduct, filterHighestRatingProduct, filterAtoZ, filterZtoA, avaibleRestaurantCityList, showChoosenCity }