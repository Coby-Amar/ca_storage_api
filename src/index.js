import express from 'express'
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { VerifyToken } from './middleware/verification.js';

import auth from './auth.js'
import categories from './categories.js'
import tags from './tags.js'
import files from './files.js'


const app = express()
const port = 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', auth)
app.use(VerifyToken)

// app.use(categories)
app.use('/categories', categories)
app.use('/tags', tags)
app.use('/files', files)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app;