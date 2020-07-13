const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js');
const { json } = require('express');

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

router.post('/admin/forms', express.json(), (req, res) => {

    transferData.insertToForms(req.body).then ((res) => {
        res.status(200).send({
            message : "the new form was successfully added."
        })
    })
});

module.exports = router;