const express = require('express');
const router = express.Router();
const transferData = require('../logic/answers.js');
const users = require('../logic/users.js');
const userController = require('../controller/usersController');
const formController = require('../controller/formsController.js')
const answerController = require('../controller/answersController')
const { json } = require('express');
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

router.get('/forms/:id(\\d+)' ,checkJwt, (req, res) => {

    username = req.user['https://example.com/email']

    users
        .getUserRole(username)
        .then ((role) => {
            if (role == "control_center") {
                answerController.getOne(req , res);
            }
            else if (role == "field_agent"){
                formController.getOne(req , res) ;
            }
            else {
                logger.log(
                    `access denied for get request ${req.originalUrl} for user ${username}`
                )
                res.status(403).send({
                    message : "access denied"
                })
            }
    })

})
module.exports = router