import '../task-manager/src/db/mongoose.js'
import { Task } from '../task-manager/src/models/task.js'

// this requires .env file with MONGO_PWD file
Task.findByIdAndDelete('630b732cd36f72f89a1c0cc2')
    .then((task) => {
        console.log(task)
        return Task.countDocuments({ completed: false })
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err))



