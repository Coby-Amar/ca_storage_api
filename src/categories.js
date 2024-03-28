import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { DB } from './db.js'

const router = Router()

router.get('/', (req, res) => {
    res.send(DB.data.categories)
})
router.post('/', (req, res) => {
    const { name } = req.body
    if (typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid category name given")
        return
    }
    const newCat = { id: uuid(), name }
    DB.update(({ categories }) => categories.push(newCat))
    res.status(201).send(newCat)
})
router.delete('/:catId', (req, res) => {
    const catId = req.params['catId']
    if (typeof catId !== 'string' || catId.length < 1) {
        res.status(400).send("invalid category id given")
        return
    }
    DB.update(({ categories }) => {
        const foundIdIndex = categories.findIndex(({ id }) => catId == id)
        if (foundIdIndex < 0) {
            res.status(404).send('category id not fouund')
            return
        }
        const deleted = categories.splice(foundIdIndex, 1)
        res.status(202).send(deleted)
    })
})
router.put('/', (req, res) => {
    const { id, name } = req.body
    if (typeof id !== 'string' || id.length < 3 || typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid category given")
        return
    }
    DB.update(({ categories }) => {
        const foundCat = categories.find((cat) => cat.id == id)
        if (!foundCat) {
            res.sendStatus(404)
            return
        }
        foundCat.name = name
        res.sendStatus(204)
    })
})

export default router;