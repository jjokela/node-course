import express from 'express'
import { Task } from '../models/task.js'

const router = new express.Router()

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (task) {
            res.send(task)
        } else {
            res.status(404).send()
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch('/tasks/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])        
        await task.save()

        if (task) {
            res.send(task)
        }
        res.status(404).send()

    } catch (err) {
        res.status(400).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (task) {
            return res.send(task)
        }
        req.status(404).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

export { router as taskRouter }