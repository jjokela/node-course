import express from 'express'
import './db/mongoose.js'
import { User } from './models/user.js'
import { Task } from './models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => res.send(user))
        .catch((err) => { 
            res.status(400)
            res.send(err) 
        })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    task.save()
        .then(() => res.send(task))
        .catch((err) => { 
            res.status(400)
            res.send(err) 
        })
})