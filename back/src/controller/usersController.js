const express = require('express');
const router = express.Router();
// const transferData = require('../logic/transferData.js');
const users = require('../logic/users')
const { json } = require('express');
var logger = require ('../logger')


exports.getRole = (req, res) => {

    name = req.user['https://example.com/email']
	users
		.getUserRole(name)
		.then((role) => {
			logger.log(`get request for /user/${name}/role`)
			res.status(200).send(role)
		})
		.catch((err) => {
			logger.log(
				`get request for /user/${name}/role faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'user with name ' + name + ' not found.',
			})
		})
}