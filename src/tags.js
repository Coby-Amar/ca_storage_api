import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { DB } from './db.js'

const router = Router()

router.get('/', (req, res) => {
    res.send(DB.data.tags)
})
router.get('/:tagId', (req, res) => {
    const tagId = req.params['tagId']
    if (typeof tagId !== 'string' || tagId.length < 1) {
        res.send(400, "invalid category id given")
        return
    }
    const foundTag = DB.data.tags.find(({ id }) => tagId == id)
    if (!foundTag) {
        res.status(404).send('tag id not fouund')
        return
    }
    res.send(foundTag)
})
router.post('/', (req, res) => {
    const { name } = req.body
    if (typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid tag name given")
        return
    }
    const newTag = { id: uuid(), name }
    DB.update(({ tags }) => tags.push(newTag))
    res.status(201).send(newTag)
})
router.delete('/', (req, res) => {
    const tagId = req.params['tagId']
    if (typeof tagId !== 'string' || tagId.length < 1) {
        res.send(400, "invalid category id given")
        return
    }
    const foundTag = DB.data.tags.find(({ id }) => tagId == id)
    if (!foundTag) {
        res.status(404).send('tag id not fouund')
        return
    }
    DB.update(({ tags }) => {
        const foundIdIndex = tags.findIndex(({ id }) => catId == id)
        if (foundIdIndex < 0) {
            res.status(404).send('tags id not fouund')
            return
        }
        const deleted = tags.splice(foundIdIndex, 1)
        res.status(202).send(deleted)
    })

})
router.put('/', (req, res) => {
    const { id, name } = req.body
    if (typeof id !== 'string' || id.length < 3 || typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid tag given")
        return
    }
    DB.update(({ tags }) => {
        const foundTag = tags.find((tag) => tag.id == id)
        if (!foundTag) {
            res.sendStatus(404)
            return
        }
        foundTag.name = name
        res.sendStatus(204)
    })

})

export default router;