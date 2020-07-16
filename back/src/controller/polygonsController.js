const express = require('express');
const router = express.Router();
const polygons = require('../logic/polygons')
const { json } = require('express');
var logger = require ('../logger')

exports.add = (req, res) => {
    polygons
    .insertToPoly(req.body)
        .then((val) => {
            logger.log(`post request for ${req.originalUrl}` )
            res.json({
                message : "the new polygon was successfully added."
            })
        }).catch((err) => {
            logger.log(`post request for ${req.originalUrl} faced the following error :  ${err}` )
            res.json({
                message : "was not able to add the polygon to the database."
            })
        })
}

exports.getAll = (req , res) => {
    polygons
    .getAllPolys()
        .then ((result) => {
            //error
            logger.log(`get request for ${req.originalUrl}` )
            res.status(200).send(result)
        } ).catch((err) => {
            logger.log(`get request for ${req.originalUrl} faced the following error :  ${err}` )
            res.status(404).send({
                message : "polygons not found"
            })
        })
}

exports.getOne = (req , res) => {
    let  id  = req.params.id;
    polygons
    .getPoly(id)
        .then ((record) => {
            if (record === null ) {
                logger.log(`get request for ${req.originalUrl} returned null record` )
                res.status(404).send(
                    {message : 'polygon with id ' + id + ' does not exist.'})
            }
            else {
                logger.log(`get request for ${req.originalUrl}` )
                res.status(200).send(record)
            }
        })
        .catch((err) => {
            logger.log(`get request for ${req.originalUrl} faced the following error :  ${err}` )
            res.status(404).send(
                {message : 'polygon with id ' + id + ' does not exist.'})
        })
}

exports.update = (req , res) => {

    let { id } = req.params;
    polygons
    .replacePoly(id , req.body)
        .then ((modifiedCount) =>{
            if(modifiedCount == 0 ){
                logger.log(`put request for ${req.originalUrl} was not able to find the record to replace `)
                res.status(404).send({
                    message : `polygon with id ${id} was not found`
                })
            }
            else {
                logger.log(`put request for ${req.originalUrl}`)
                res.status(200).send({
                    message : "new record has been successfully replaced ."
                })
            }

        }).catch((err) => {
            logger.log(`put request for ${req.originalUrl} faced the following error :  ${err}`)
            res.send ({
                message : err
            })
        })
}

exports.delete = (req , res) => {

    let { id } = req.params;
    polygons
    .deletePoly(id).then ((deletedCount) => {
        if(deletedCount == 0 ){
            logger.log(`delete request for ${req.originalUrl} was not able to find the record to delete `)
            res.status(404).send({
                message : `polygon with id ${id} was not found`
            })
        }
        else {
            logger.log(`delete request for ${req.originalUrl}`)
            res.status(200).send({
                message : "the record has been successfully deleted ."
            })
        }
    }).catch((err) => {
        rej(err)
    })
}