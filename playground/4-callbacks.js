

function geocode(address, callback) {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }

        callback(data)
    }, 200)
}


geocode('Pönkerö', (data) => {
    console.log(`Data from callback: ${JSON.stringify(data)}`)
})


function sum(x, y, callback) {
    setTimeout(() => {
        let result = x + y
        callback(result)
    }, 200)
}

sum(1, 2, (result) => {
    console.log(result)
})