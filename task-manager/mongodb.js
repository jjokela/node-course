import { ObjectID } from 'bson'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const url = `mongodb+srv://dev-user:${process.env.MONGO_PWD}@mongocluster.rchnsme.mongodb.net/test`
const client = new mongodb.MongoClient(url)
const dbName = 'task-manager'

console.log(url)

async function connect() {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    // insert one
    // await db.collection('users').insertOne({
    //     name: 'Jarmo',
    //     age: 69
    // })

    // insert many
    await db.collection('tasks').insertMany([
        {
            description: 'Buy stuff',
            completed: false
        },
        {
            description: 'Do stuff',
            completed: true
        }
    ])

    return 'Done'
}

async function readUser(userName) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('users').findOne({
        name: userName
    })
}

async function findTaskById(id) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('tasks').findOne({
        _id: new ObjectID(id)
    })
}

async function findAllTasksByCompleted(completed) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('tasks').find({
        completed: completed
    }).toArray()
}

async function updateUserNameById(id, name) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('users').updateOne({
        _id: new ObjectID(id)
    }, {
        $set: {
            name: name
        }
    })
}

async function updateAllTasksAsDone() {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('tasks').updateOne({
        completed: false
    }, {
        $set: {
            completed: true
        }
    })
}

async function createNewTask(description, completed) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    await db.collection('tasks').insertOne({
        description: description,
        completed: completed
    })
}

async function deleteTaskById(id) {
    await client.connect()
    console.log('Connected to server successfully')
    const db = client.db(dbName)

    return await db.collection('tasks').deleteOne({
        _id: new ObjectID(id)
    })
}

// deleteTaskById("630b2669bf02e1dbcce86add")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// createNewTask('new task', false)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// updateAllTasksAsDone()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// updateUserNameById('630b14260d85376a8a16b3d4', 'Rane')
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// connect()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// readUser('Jarmo')
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })

// findTaskById("630b14b8f8b531aeafb7e686")
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })


// findAllTasksByCompleted(false)
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => {
//         client.close()
//         console.log('Client closed')
//     })