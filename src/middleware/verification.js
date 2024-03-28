import jwt from 'jsonwebtoken'

export function VerifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.cookies['x-access-token'] || req.headers['x-access-token'];
    try {
        console.log('token: ', token)
        jwt.verify(token, 'Secret-Key-Here-Later');
        next()
    } catch (err) {
        console.log('err: ', err)
        res.status(401).send("Unauthorized");
    }
}