const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');
var logger = require ('../logger')



//tested on postman
router.get('/forms', (req, res) => {
    transferData.getAllForms().then ((result) => {
        logger.log(`get request for /forms` )
        res.status(200).send(result)
    } ).catch((err) => {
        logger.log(`get request for /forms faced the following error :  ${err}` )
        res.status(404).send({
            message : "forms not found"
        })
    })
});

//tested on postman
router.get('/control-center/:name/forms/:id(\\d+)', (req, res) => {
    let {id} = req.params;
    transferData.getAnswers(id)
        .then ((record) => {
            if (record === null ) {
                logger.log(`get request for /control-center/${name}/forms/${id} returned null record` )
                res.status(404).send(
                    {message : 'answers for id ' + id + ' does not exist.'})
            }
            else {
                logger.log(`get request for /control-center/${name}/forms/${id} ` )
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            logger.log(`get request for /control-center/${name}/forms/${id} faced the following error :  ${err}` )
            res.status(404).send(
                {message :  'answers for id '  + id + ' does not exist.'})
        })
});


router.get('/user/:name/role', (req, res) => {

    let {name} = req.params;

    transferData.getUserRole(name)
        .then ((role) => {
            logger.log(`get request for /user/${name}/role` )
            res.status(200).send(role)
        })
        .catch((err) => {
            logger.log(`get request for /user/${name}/role faced the following error :  ${err}` )
            res.status(404).send(
                {message : 'user with name ' + name + ' not found.'})
        })
})

//tested on postman
router.get('/user/:name/forms/:id(\\d+)', (req, res) => {
    let { name , id } = req.params;

    transferData.getForm(id)
        .then ((record) => {
            if (record === null ) {
                logger.log(`get request for /user/${name}/forms/${id} returned null record` )
                res.status(404).send(
                    {message : 'form with id ' + id + ' does not exist.'})
            }
            else {
                logger.log(`get request for /user/${name}/forms/${id}` )
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            logger.log(`get request for /user/${name}/forms/${id} faced the following error :  ${err}` )
            res.status(404).send(
                {message : 'form with id ' + id + ' does not exist.'})
        })
});

//tested on postman
router.post('/user/:name/forms/:id(\\d+)/post_form',express.json(), (req, res) => {
    let {name , id} = req.params;

    transferData.insertToAnswers(req.body , name , id).then((val) => {
        logger.log(`post request for /user/${name}/forms/${id}/post_form` )
        res.status(200).json({
            message : "added."
        })
    }).catch((err) => {
        logger.log(`post request for /user/${name}/forms/${id}/post_form faced the following error :  ${err}` )
        res.json({
            message : "problem adding new answers to database."
        })
    })

})



module.exports = router;