const express = require('express')
const router = express.Router()
const transferData = require('../logic/answers.js')
const users = require('../logic/users.js')
const userController = require('../controller/usersController')
const formController = require('../controller/formsController.js')
const answerController = require('../controller/answersController')
<<<<<<< HEAD
const { json } = require('express')

=======
const { json } = require('express');
>>>>>>> e9f694c800be8de235f04427f03ce34fc844fdc9
var logger = require('../logger')
require('dotenv').config()
const jwt = require('express-jwt')
const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa');
const { SigningKeyNotFoundError } = require('jwks-rsa');

const checkJwt = jwt({

	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
	}),

	audience: process.env.api_identifier,
	issuer: `https://${process.env.domain}/`,
	algorithms: ['RS256'],
})

router.get('/forms', checkJwt, formController.getAll)
///////////////////////////////////////////////unit test
describe('GET /films-list', () => {
    it('should return a list of films when called', done => {
      chai
        .request(app)
        .get('/films-list')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.deep.equal(starwarsFilmListMock);
          done();
        });
    });
  });
//////////////////////////////////////////////unit test

router.get('/role', checkJwt, userController.getRole)

router.post('/forms/:id(\\d+)', checkjwt ,express.json(), answerController.add)

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
<<<<<<< HEAD

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
=======
module.exports = router
>>>>>>> e9f694c800be8de235f04427f03ce34fc844fdc9
