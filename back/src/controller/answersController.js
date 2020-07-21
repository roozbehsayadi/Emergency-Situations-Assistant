const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');
var logger = require ('../logger')


exports.add = (req, res) => {
    let {name , id} = req.params;

    transferData.insertToAnswers(req.body , name , id).then((val) => {
        logger.log(`post request for ${req.originalUrl}` )
        res.status(200).json({
            message : "added."
        })
    }).catch((err) => {
        logger.log(`post request for ${req.originalUrl} faced the following error :  ${err}` )
        res.json({
            message : "problem adding new answers to database."
        })
    })
}

exports.getOne = (req , res) => {
    transferData
        .getAnswers(id)
        .then((record) => {
            if (record === null) {
                logger.log(
                    `get request for ${req.originalUrl} returned null record`
                )
                res.status(404).send({
                    message: 'answers for id ' + id + ' does not exist.',
                })
            } else {
                logger.log(
                    `get request for ${req.originalUrl} `
                )
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            logger.log(
                `get request for ${req.originalUrl} faced the following error :  ${err}`
            )
            res.status(404).send({
                message: 'answers for id ' + id + ' does not exist.',
            })
        })

}