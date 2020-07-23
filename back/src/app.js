const express = require('express')
var cors = require('cors')
const app = express()
const router = require('./api/api')
const adminRouter = require('./api/adminApi')
const port = 9000
const db = require('./database/db.js')
const path = require('path')

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

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'build')));
	// Handle React routing, return all requests to React app
	app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
}

app.listen(process.env.PORT, () =>
	console.log(`App listening at http://localhost:${process.env.port}`)
)
db.connect()