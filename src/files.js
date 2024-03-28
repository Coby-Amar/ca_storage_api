import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { DB } from './db.js'
import { STATUSES } from './consts.js'

const router = Router()

router.get('/', (req, res) => {
    res.send(DB.data.files)
})
router.get('/:fileId', (req, res) => {
    const fileId = req.params['fileId']
    if (typeof fileId !== 'string' || fileId.length < 1) {
        res.status(400).send("invalid id given")
        return
    }
    const foundFile = DB.data.files.find(({ id }) => fileId == id)
    if (!foundFile) {
        res.status(404).send('Not Found')
        return
    }
    res.send(foundFile)
})
router.post('/', (req, res) => {
    const {
        category = null,
        tags = [],
        name,
        seasons = 1,
        currentSeason = 0,
        episodes = 1,
        currentEpisode = 0,
        status = STATUSES.WATCHING,
    } = req.body
    if (typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid name given")
        return
    }
    const newFile = {
        id: uuid(),
        category,
        tags,
        name,
        seasons,
        currentSeason,
        episodes,
        currentEpisode,
        status,
    }
    DB.update(({ files }) => files.push(newFile))
    res.status(201).send(newFile)
})
router.delete('/:fileId', (req, res) => {
    const fileId = req.params['fileId']
    if (typeof fileId !== 'string' || fileId.length < 1) {
        res.status(400).send("invalid id given")
        return
    }
    DB.update(({ files }) => {
        const foundIdIndex = files.findIndex(({ id }) => fileId == id)
        if (foundIdIndex < 0) {
            res.status(404).send('Not Found')
            return
        }
        const deleted = files.splice(foundIdIndex, 1)
        res.status(202).send(deleted)
    })
})
router.put('/', (req, res) => {
    const {
        category = null,
        tags = [],
        name,
        seasons = 1,
        currentSeason = 0,
        episodes = 1,
        currentEpisode = 0,
        status = STATUSES.WATCHING,
    } = req.body
    if (typeof id !== 'string' || id.length < 3 || typeof name !== 'string' || name.length < 3) {
        res.status(400).send("invalid category given")
        return
    }
    DB.update(({ files }) => {
        const foundFile = files.find((file) => file.id == id)
        if (!foundFile) {
            res.sendStatus(404)
            return
        }
        const newFile = {
            id,
            category,
            tags,
            name,
            seasons,
            currentSeason,
            episodes,
            currentEpisode,
            status,
        }
        foundFile = newFile
        console.log('files: ', files)
        res.sendStatus(204)
    })
})

export default router;