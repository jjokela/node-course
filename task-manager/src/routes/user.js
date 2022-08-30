import express from 'express'
import { User } from '../models/user.js'

const router = new express.Router()

router.get('/users', async (req, res) => {

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
        await user.save()
        res.status(201).send(user)
    } catch (err) {
        res.status(400).send(err)
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

router.patch('/users/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (user) {
            res.send(user)
        }
        res.status(404).send()

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

export { router as userRouter }
