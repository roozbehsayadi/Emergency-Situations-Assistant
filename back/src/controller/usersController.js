const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');
var logger = require ('../logger')


exports.getRole = (req, res) => {

    let {name} = req.params;

    transferData.getUserRole(name)
        .then ((role) => {
            logger.log(`get request for ${req.originalUrl}` )
            res.status(200).send(role)
        })
        .catch((err) => {
            logger.log(`get request for ${req.originalUrl} faced the following error :  ${err}` )
            res.status(404).send(
                {message : 'user with name ' + name + ' not found.'})
        })
}