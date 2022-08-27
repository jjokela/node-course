import dotenv from 'dotenv'
import { getWeatherAsync } from './utils/forecast.js'
import { geocodeAsync } from './utils/geocode.js'

dotenv.config()

// console.log(process.env)

// with promises
// geocode('The Hague')
//     .then((res) => {
//         let features = res.data.features[0]
//         console.log(`Place: ${features.place_name}, Coordinates: ${features.center.join()}`)
//         return getWeather(features.center.join())
//     }).then((res) => { // this is for getWeather
//         let current = res.data.current
//         console.log(`Weather now is ${current.weather_descriptions.join()}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
//     }).catch(error => {
//         console.log(error.message)
//     })

// same with async-await
try {
    let geocodeResult = await geocodeAsync('The Hague')
    let features = geocodeResult.data.features[0]
    console.log(`Place: ${features.place_name}, Coordinates: ${features.center.join()}`)

    let coords = `${features.center[1]},${features.center[0]}`
    let weatherResult = await getWeatherAsync(coords)
    let current = weatherResult.data.current
    console.log(`Weather now is ${current.weather_descriptions.join()}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
} catch (error) {
    console.log(error.message)
}
