const express = require('express')
var cors = require('cors')
const app = express()
const router = require('./api/api')
const port = 9000
const db = require('./database/db.js')
var { logger } = require('./logger')
require('dotenv').config()

app.use(cors())

app.use((req, res, next) => {
	logger.info('info', 'error')
	next()
})
app.use('/', router)
app.listen(port, () =>
	console.log(`App listening at http://localhost:${process.env.port}`)
)
db.connect()
