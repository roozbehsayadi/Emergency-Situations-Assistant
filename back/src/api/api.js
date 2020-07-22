const express = require('express')
const router = express.Router()
const transferData = require('../logic/answers.js')
const users = require('../logic/users.js')
const userController = require('../controller/usersController')
const formController = require('../controller/formsController.js')
const answerController = require('../controller/answersController')
const { json } = require('express')

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

///////////////////////////////////////////////////////auth

router.get('/forms', checkJwt, formController.getAll)

router.get('/forms/:id(\\d+)', checkJwt, (req, res) => {
	username = req.user['https://example.com/email']

	users.getUserRole(username).then((role) => {
		if (role == 'control_center') {
			answerController.getOne(req, res)
		} else if (role == 'field_agent') {
			formController.getOne(req, res)
		} else {
			logger.log(
				`access denied for get request ${req.originalUrl} for user ${username}`
			)
			res.status(403).send({
				message: 'access denied',
			})
		}
	})
})

router.get('/role', checkJwt, userController.getRole)

//recieves answers and for each Location field it finds all of the areas
//that location is inside and store that name of the polygons in the ares field in database
router.post(
	'/user/:name/forms/:id(\\d+)/post_form',
	express.json(),
	(req, res) => {
		let { name, id } = req.params
		try {
			transferData.insertToAnswers(req.body, name, id)
			logger.log(`post request for /user/${name}/forms/${id}/post_form`)
			res.status(200).send({
				message: 'added.',
			})
		} catch (err) {
			logger.log(
				`post request for /user/${name}/forms/${id}/post_form faced the following error :  ${err}`
			)
			res.send({
				message: 'problem adding new answers to database.',
			})
		}
	}
)

module.exports = router
