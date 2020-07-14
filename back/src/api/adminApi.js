const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');
var logger = require ('../logger')

router.post('/forms', express.json(), (req, res) => {

    transferData.insertToForms(req.body).then((val) => {
        logger.log(`post request for /admin/forms` )
        res.json({
            message : "the new form was successfully added."
        })
    }).catch((err) => {
        logger.log(`post request for /admin/forms faced the following error :  ${err}` )
        res.json({
            message : "was not able to add the form to the database."
        })
    })
});

router.get('/forms' , (req , res) => {

    transferData.getAllForms().then ((result) => {
        logger.log(`get request for /admin/forms` )
        res.status(200).send(result)
    } ).catch((err) => {
        logger.log(`get request for /admin/forms faced the following error :  ${err}` )
        res.status(404).send({
            message : "forms not found"
        })
    })
})

router.get('/forms/:id' , (req , res) => {
    let { name , id } = req.params;

    transferData.getForm(id)
        .then ((record) => {
            if (record === null ) {
                logger.log(`get request for /admin/forms/${id} returned null record` )
                res.status(404).send(
                    {message : 'form with id ' + id + ' does not exist.'})
            }
            else {
                logger.log(`get request for /admin/forms/${id}` )
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            logger.log(`get request for /admin/forms/${id} faced the following error :  ${err}` )
            res.status(404).send(
                {message : 'form with id ' + id + ' does not exist.'})
        })
})

router.put('/forms/:id' ,express.json(), (req , res) => {
    let { id } = req.params;
    transferData.replaceForm(id , req.body).then ((modifiedCount) =>{
        if(modifiedCount == 0 ){
            logger.log(`put request for /forms/${id} was not able to find the record to replace `)
            res.status(404).send({
                message : `form with id ${id} was not found`
            })
        }
        else {
            logger.log(`put request for /forms/${id}`)
            res.status(200).send({
                message : "new record has been successfully replaced ."
            })
        }

    }).catch((err) => {
        logger.log(`put request for /forms/${id} faced the following error :  ${err}`)
        res.send ({
            message : err
        })
    })
})

router.delete('/forms/:id' , (req , res) => {
    let { id } = req.params;
    transferData.deleteForm(id).then ((deletedCount) => {
        if(deletedCount == 0 ){
            logger.log(`delete request for /forms/${id} was not able to find the record to delete `)
            res.status(404).send({
                message : `form with id ${id} was not found`
            })
        }
        else {
            logger.log(`delete request for /forms/${id}`)
            res.status(200).send({
                message : "the record has been successfully deleted ."
            })
        }
    }).catch((err) => {
        rej(err)
    })
})




module.exports = router;