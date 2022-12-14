import express from 'express'
import { User } from '../models/user.js'
import { auth } from '../middleware/auth.js'
import multer from 'multer'
import { sendWelcomeEmail } from '../emails/account.js'


const router = new express.Router()

const upload = multer({
    limits: {
        fileSize: 1024000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpge|png)$/)) {
            return cb(new Error('Please upload a jpg, jpeg or png file'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (err) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        // automatically login user by storing the auth
        const token = await user.generateAuthToken()
        user.tokens = user.tokens.concat({ token })
        await user.save()

        sendWelcomeEmail(user.email, user.name)

        res.status(201).send({ user, token })
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (user) {
            res.send(user)
        }
        res.status(404).send()
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)

    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (user) {
            return res.send(user)
        }
        req.status(404).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        user.tokens = user.tokens.concat({ token })
        await user.save()

        res.send({ user, token })
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
})

export { router as userRouter }
