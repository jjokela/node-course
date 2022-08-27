import dotenv from 'dotenv'
import { getWeather } from './utils/forecast.js'
import { geocode } from './utils/geocode.js'

dotenv.config()

// console.log(process.env)

geocode('The Hague')
    .then((res) => {
        let features = res.data.features[0]
        console.log(`Place: ${features.place_name}, Coordinates: ${features.center.join()}`)
        return getWeather(features.center.join())
    }).then((res) => { // this is for getWeather
        let current = res.data.current
        console.log(`Weather now is ${current.weather_descriptions.join()}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
    }).catch(error => {
        console.log(error.message)
    })