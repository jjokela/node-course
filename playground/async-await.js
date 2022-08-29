import '../task-manager/src/db/mongoose.js'
import { Task } from '../task-manager/src/models/task.js'

// this requires .env file with MONGO_PWD file
async function deleteTaskAndCount(id) {

    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

deleteTaskAndCount('630bc6fdfc300cae8ef31fdf')
    .then((count) => console.log(count))
    .catch((err) => console.log(err))
