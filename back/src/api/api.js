const express = require('express');
const router = express.Router();
const transferData = require('../logic/answers.js');
const users = require('../logic/users.js');
const { json } = require('express');

////////////////////////////////////////////////////////auth
// const jwt = require('express-jwt')
// const jwtAuthz = require('express-jwt-authz')
// const jwksRsa = require('jwks-rsa')
// const checkJwt = jwt({
// 	// Dynamically provide a signing key
// 	// based on the kid in the header and
// 	// the signing keys provided by the JWKS endpoint.
// 	secret: jwksRsa.expressJwtSecret({
// 		cache: true,
// 		rateLimit: true,
// 		jwksRequestsPerMinute: 5,
// 		jwksUri: `https://${process.env.domain}/.well-known/jwks.json`,
// 	}),

// 	// Validate the audience and the issuer.
// 	audience: process.env.api_identifier,
// 	issuer: `https://${process.env.domain}/`,
// 	algorithms: ['RS256'],
// })

// router.get('/azin', checkJwt, (req, res) => {
// 	res.json({
// 		message: 'salam man azinam',
// 	})
// })
///////////////////////////////////////////////////////auth

//tested on postman and front
router.get('/user/:name/role', (req, res) => {
    let {name} = req.params;

    users.getUserRole(name)
        .then ((role) => {
            res.status(200).send(role)
        })
        .catch((err) => {
            res.status(404).send(
                {message : 'user with name ' + name + ' not found.'})
        })
})
//tested on postman
router.post('/admin/forms', express.json(), (req, res) => {

    transferData.insertToForms(req.body).then((val) => {
        res.json({
            message : "the new form was successfully added."
        })
    }).catch((err) => {
        res.json({
            message : "was not able to add the form to the database."
        })
    })
});

//tested on postman
router.get('/forms', (req, res) => {
    transferData.getAllForms().then ((result) => {
        res.status(200).send(result)
    } ).catch((err) => {
        res.status(404).send({
            message : "forms not found"
        })
    })
});
//tested on postman
router.get('/user/:name/forms/:id(\\d+)', (req, res) => {
    let { id } = req.params;
    transferData.getForm(id)
        .then ((record) => {
            if (record === null ) {
                res.status(404).send(
                    {message : 'form with id ' + id + ' does not exist.'})
            }
            else {
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            res.status(404).send(
                {message : 'form with id ' + id + ' does not exist.'})
        })
});
//recieves answers and for each Location field it finds all of the areas
//that location is inside and store that name of the polygons in the ares field in database
router.post('/user/:name/forms/:id(\\d+)/post_form',express.json(), (req, res) => {
    let {name , id} = req.params;
    try {
        transferData.insertToAnswers(req.body , name , id);
        res.status(200).send({
            message : "added."
        })
    }catch {
        res.send({
            message : "problem adding new answers to database."
        })
    }
})
//tested on postman
router.get('/control-center/:name/forms/:id(\\d+)', (req, res) => {
    let {id} = req.params;
    transferData.getAnswers(id)
        .then ((record) => {
            if (record === null ) {
                res.status(404).send(
                    {message : 'answers for id ' + id + ' does not exist.'})
            }
            else {
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            res.status(404).send(
                {message :  'answers for id '  + id + ' does not exist.'})
        })
});

module.exports = router;