import { JSONFilePreset } from 'lowdb/node'

export const DB = await JSONFilePreset('db.json', {
    users: [],
    categories: [],
    tags: [],
    files: []
})


