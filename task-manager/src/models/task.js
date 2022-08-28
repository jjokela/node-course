import mongoose from 'mongoose'

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

export { Task }