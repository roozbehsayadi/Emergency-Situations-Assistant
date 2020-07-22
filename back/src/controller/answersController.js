const express = require('express');
const router = express.Router();
const answers = require('../logic/answers')
const users = require('../logic/users')
const { json } = require('express');
var logger = require ('../logger')


exports.add = (req, res) => {
    let {id} = req.params;
    username = req.user['https://example.com/email']


    users.getUserRole(username).then ((role) => {
        if(role == "field_agent"){
            try {
                answers.insertToAnswers(req.body , username , id);
                logger.log(
                    `post request for ${req.originalUrl}`
                )
                res.status(200).send({
                    message : "added."
                })
            }catch(err) {
                logger.log(
                    `post request for ${req.originalUrl} faced the following error :  ${err}`
                )
                res.send({
                    message : "problem adding new answers to database."
                })
            }
        }
        else {
            logger.log(
                `access denied for post request ${req.originalUrl} for user ${username}`
            )
            res.status(403).send({
                message : "access denied"
            })
        }
    })

}

exports.getOne = (req , res) => {
    let { id } = req.params

    answers
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

