const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');

//tested on postman and front
router.get('/user/:name/role', (req, res) => {
    let {name} = req.params;

    transferData.getUserRole(name)
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
//tested on postman
router.post('/user/:name/forms/:id(\\d+)/post_form',express.json(), (req, res) => {
    let {name , id} = req.params;

    transferData.insertToAnswers(req.body , name , id).then((val) => {
        res.json({
            message : "added."
        })
    }).catch((err) => {
        res.json({
            message : "problem adding new answers to database."
        })
    })
	res.status(200).send('Form retrieved successfully')
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