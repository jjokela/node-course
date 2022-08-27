new Promise((resolve, reject) => setTimeout(() => resolve(1), 100))
    .then((result) => {
        console.log(result)
        return result * 2
    }).then((result) => {
        console.log(result)
        return result * 3
    }).then((result) => {
        console.log(`Final result ${result}`)
    })

function foo() {
    return new Promise((resolve, reject) => setTimeout(() => resolve(1), 100))
        .then((result) => {
            console.log(result)
            return new Promise((resolve, reject) => setTimeout(() => resolve(result * 2), 100))
        }).then((result) => {
            console.log(result)
            return new Promise((resolve, reject) => setTimeout(() => reject(result * 2), 100))
        }).then(
            (result) => { },
            (error) => { console.log(`error: ${error}`) }
        )
}

foo()