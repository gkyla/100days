import CONFIG from "../config.js"
import buttonAction from "./button.js"
import { productTemplate } from "./template.js"
import { avaibleRestaurantCityList } from './filter.js'

const getData = async () => {
    const response = await fetch(CONFIG.API_DATA)
    const data = await response.json()
    return data.restaurants
}

const showTheRestaurant = async () => {
    const products = await getData()
    productTemplate(products)
}

showTheRestaurant()
avaibleRestaurantCityList()
buttonAction()

export { getData, showTheRestaurant }