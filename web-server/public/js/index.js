console.log('Hello from index.js!')

// fetch('http://localhost:3000/weather?address=den%20haag')
//     .then((res) => {
//         res.json().then((data) => {
//             console.log(data)
//         })
//     })

async function fetchData(location) {
    let weatherResponse = await fetch(`http://localhost:3000/weather?address=${location}`)
    let responseJson = await weatherResponse.json()

    var res = document.getElementById("result");
    var err = document.getElementById("error");
    var loc = document.getElementById("location");
    var forecast = document.getElementById("forecast");
    var errorInput = document.getElementById("errorInput");

    if (responseJson.error) {
        console.log(responseJson.error)
        res.style.display = "none";
        err.style.display = "block";

        loc.value = ''
        forecast.val = ''
        errorInput = responseJson.error
    } else {
        console.log(responseJson)
        err.style.display = "none";
        res.style.display = "block";

        loc.value = responseJson.location
        forecast.value = responseJson.forecast
        errorInput = ''
    }
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(search.value)
    fetchData(search.value)
})