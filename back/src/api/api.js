const express = require('express');
const router = express.Router();
const transferData = require('../logic/answers.js');
const users = require('../logic/users.js');
const { json } = require('express');

var logger = require('../logger')
require('dotenv').config()
////////////////////////////////////////////////////////auth
const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')
const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: process.env.api_identifier,
	issuer: `https://${process.env.domain}/`,
	algorithms: ['RS256'],

})

router.get('/azin', checkJwt, (req, res) => {
	res.json({
		message: 'salam man azinam',
	})
})
///////////////////////////////////////////////////////auth
//tested on postman
router.get('/forms', checkJwt, (req, res) => {
	transferData
		.getAllForms()
		.then((result) => {
			logger.log(`get request for /forms`)
			res.status(200).send(result)
		})
		.catch((err) => {
			logger.log(
				`get request for /forms faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'forms not found',
			})
		})
})


//tested on postman

router.get('/control-center/:name/forms/:id(\\d+)',(req, res) => {
	let { id } = req.params
	transferData
		.getAnswers(id)
		.then((record) => {
			if (record === null) {
				logger.log(
					`get request for /control-center/${name}/forms/${id} returned null record`
				)
				res.status(404).send({
					message: 'answers for id ' + id + ' does not exist.',
				})
			} else {
				logger.log(
					`get request for /control-center/${name}/forms/${id} `
				)
				res.status(200).send(record)
			}
		})
		.catch((err) => {
			logger.log(
				`get request for /control-center/${name}/forms/${id} faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'answers for id ' + id + ' does not exist.',
			})
		})
})

router.get('/user/:name/role', checkJwt, (req, res) => {

	// console.log('email:' + req.user['https://example.com/email'])
    let { name } = req.params
    console.log(name)

	transferData
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
})

//tested on postman

router.get('/user/:name/forms/:id(\\d+)', (req, res) => {
	let { name, id } = req.params

	transferData
		.getForm(id)
		.then((record) => {
			if (record === null) {
				logger.log(
					`get request for /user/${name}/forms/${id} returned null record`
				)
				res.status(404).send({
					message: 'form with id ' + id + ' does not exist.',
				})
			} else {
				logger.log(`get request for /user/${name}/forms/${id}`)
				res.status(200).send(record)
			}
		})
		.catch((err) => {
			logger.log(
				`get request for /user/${name}/forms/${id} faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'form with id ' + id + ' does not exist.',
			})
		})
})
//recieves answers and for each Location field it finds all of the areas
//that location is inside and store that name of the polygons in the ares field in database
router.post('/user/:name/forms/:id(\\d+)/post_form',express.json(), (req, res) => {
    let {name , id} = req.params;
    try {
        transferData.insertToAnswers(req.body , name , id);
        logger.log(
            `post request for /user/${name}/forms/${id}/post_form`
        )
        res.status(200).send({
            message : "added."
        })
    }catch(err) {
        logger.log(
            `post request for /user/${name}/forms/${id}/post_form faced the following error :  ${err}`
        )
        res.send({
            message : "problem adding new answers to database."
        })
    }
})



module.exports = router
