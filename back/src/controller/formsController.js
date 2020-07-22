const express = require('express')
const router = express.Router()

const forms = require('../logic/forms.js')
const { json } = require('express')
var logger = require('../logger')

exports.add = (req, res) => {
	forms
		.insertToForms(req.body)
		.then((val) => {
			logger.log(`post request for ${req.originalUrl}`)
			res.json({
				message: 'the new form was successfully added.',
			})
		})
		.catch((err) => {
			logger.log(
				`post request for ${req.originalUrl} faced the following error :  ${err}`
			)
			res.json({
				message: 'was not able to add the form to the database.',
			})
		})
}

exports.getAll = (req, res) => {

    username = req.user['https://example.com/email']
	forms
		.getAllForms(username)
		.then((result) => {
			logger.log(`get request for ${req.originalUrl}`)
			res.status(200).send(result)
		})
		.catch((err) => {
			logger.log(
				`get request for ${req.originalUrl} faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'forms not found',
			})
		})
}

exports.getOne = (req, res) => {
	let id = req.params.id
	forms
		.getForm(id)
		.then((record) => {
			if (record === null) {
				logger.log(
					`get request for ${req.originalUrl} returned null record`
				)
				res.status(404).send({
					message: 'form with id ' + id + ' does not exist.',
				})
			} else {
				logger.log(`get request for ${req.originalUrl}`)
				res.status(200).send(record)
			}
		})
		.catch((err) => {
			logger.log(
				`get request for ${req.originalUrl} faced the following error :  ${err}`
			)
			res.status(404).send({
				message: 'form with id ' + id + ' does not exist.',
			})
		})
}

exports.update = (req, res) => {
	let { id } = req.params
	forms
		.replaceForm(id, req.body)
		.then((modifiedCount) => {
			if (modifiedCount == 0) {
				logger.log(
					`put request for ${req.originalUrl} was not able to find the record to replace `
				)
				res.status(404).send({
					message: `form with id ${id} was not found`,
				})
			} else {
				logger.log(`put request for ${req.originalUrl}`)
				res.status(200).send({
					message: 'new record has been successfully replaced .',
				})
			}
		})
		.catch((err) => {
			logger.log(
				`put request for ${req.originalUrl} faced the following error :  ${err}`
			)
			res.send({
				message: err,
			})
		})
}

exports.delete = (req, res) => {
	let { id } = req.params
	forms
		.deleteForm(id)
		.then((deletedCount) => {
			if (deletedCount == 0) {
				logger.log(
					`delete request for ${req.originalUrl} was not able to find the record to delete `
				)
				res.status(404).send({
					message: `form with id ${id} was not found`,
				})
			} else {
				logger.log(`delete request for ${req.originalUrl}`)
				res.status(200).send({
					message: 'the record has been successfully deleted .',
				})
			}
		})
		.catch((err) => {
			rej(err)
		})
}
