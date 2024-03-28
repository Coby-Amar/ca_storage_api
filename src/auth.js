import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { DB } from './db.js'

const router = Router()

router.post('/login', (req, res) => {
    const { username = null, password = null } = req.body
    if (typeof username !== 'string' || username.length < 1 && typeof password !== 'string' || password.length < 1) {
        res.send(400, "bad user info")
        return
    }
    const foundUser = DB.data.users.find((user) => password == user.password)
    if (!foundUser) {
        res.statusCode = 401
        res.send("login not ok")
        return
    }
    const token = jwt.sign(foundUser, "Secret-Key-Here-Later", { expiresIn: "7d" })
    res.cookie('x-access-token', token, { secure: false, httpOnly: true })
    res.send("login good")
})

router.post('/logout', (req, res) => {
    res.cookie('x-access-token', null)
    res.send("logout good")
})

export default router;