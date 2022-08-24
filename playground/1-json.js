import fs from 'fs'


// const book = {
//     title: 'Päiväni Ernona',
//     author: 'Erno Perälä'
// }

// const bookJson = JSON.stringify(book)

// const parsedData = JSON.parse(bookJson)

// // console.log(parsedData.title)
// // console.log(parsedData.author)

// // fs.writeFileSync('1-json.json', bookJson)

// const dataBuffer = fs.readFileSync('1-json.json')
// console.log(dataBuffer)

// const data = JSON.parse(dataBuffer)
// console.log(data)

const data = fs.readFileSync('1-json.json')
var jansson = JSON.parse(data)

jansson.name = "Jarmo Jokela"
jansson.age = 43
jansson.location = "Urth"

console.log(jansson)

fs.writeFileSync('1-json.json', JSON.stringify(jansson))