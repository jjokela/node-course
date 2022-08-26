
const userName = 'Reiska'
const age = 12

const user = {
    userName,
    age
}

console.log(user)

const product = {
    label: 'rara',
    qty: 10
}

let {label, qty, price = 20} = product

console.log(label)
console.log(qty)
console.log(price)