import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

// console.log(process.env)

function getWeather(coordinates) {

    const weatherStackUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${coordinates}`

    axios
        .get(weatherStackUrl, { responseType: 'json' })
        .then(res => {
            // console.log(`statusCode: ${res.status}`)
            //console.log(res)
            // console.log(res.data)
            // console.log(`current JSON string: ${JSON.stringify(res.data.current)}`)
            getWeatherSuccess(res)
        })
        .catch(error => {
            console.log(`Error! ${error}`)
        })
}


function geocode(location) {

    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MAPBOX_KEY}`

    axios
        .get(mapBoxUrl, { responseType: 'json' })
        .then(res => {
            geocodeSuccess(res)
            getWeather(res.data.features[0].center.join())
        })
        .catch(error => {
            console.log(`Error! ${error}`)
        })
}


function geocodeSuccess(res) {
    let features = res.data.features[0]
    console.log(`Place: ${features.place_name}, Coordinates: ${features.center.join()}`)
}

function getWeatherSuccess(res) {
    let current = res.data.current
    console.log(`Weather now is ${current.weather_descriptions.join()}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
}

geocode('The Hague')
