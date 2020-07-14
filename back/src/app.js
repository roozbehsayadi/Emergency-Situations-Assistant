const express = require('express')
var cors = require('cors')
const app = express()
const router = require('./api/api')
const adminRouter = require('./api/adminApi')
const port = 9000
const db = require('./database/db.js')



var logger = require ('./logger')
require('dotenv').config()
app.use(cors())
logger.log(`Server started at ${(new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':')}`);
process.on('SIGINT', function() {
	logger.log(`Request for closing server at ${(new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':')}`);
	process.exit();
});

app.use('/', router)
app.use('/admin', adminRouter)
app.listen(port, () =>
	console.log(`App listening at http://localhost:${process.env.port}`)
)
db.connect()
