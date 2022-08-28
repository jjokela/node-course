import mongoose from 'mongoose'
import validator from 'validator'

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email address')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        validate(value) {
            if (value.toLowerCase() === 'password') {
                throw new Error("Password can't be 'password'")
            }
        }
    }
})

export { User }