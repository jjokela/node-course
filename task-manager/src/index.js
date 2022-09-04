import dotenv from 'dotenv'
import express from 'express'
import './db/mongoose.js'
import { userRouter } from './routes/user.js'
import { taskRouter } from './routes/task.js'
import { connect } from './db/mongoose.js'

dotenv.config()

connect()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

