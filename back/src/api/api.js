const express = require('express');
const router = express.Router();
const transferData = require('../logic/transferData.js')

router.get('/user/:name/role', (req, res) => {
    let {name} = req.params;

    transferData.getUserRole(name)
        .then ((role) => {
            res.status(200).send(role)
        })
        .catch((err) => {
            res.status(404).send(
                'user with name ' + name + ' not found.')
        })
})



module.exports = router;