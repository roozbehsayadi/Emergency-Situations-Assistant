const express = require('express');
const router = express.Router();

const formController = require('../controller/formsController.js')
const polygonsController = require('../controller/polygonsController')

const { json } = require('express');


router.post('/forms', express.json(), formController.add )

router.get('/forms' , formController.getAllAdmin)

router.get('/forms/:id' , formController.getOne)

router.put('/forms/:id' ,express.json(), formController.update)

router.delete('/forms/:id' , formController.delete)

router.post('/polygons', express.json(), polygonsController.add )

router.get('/polygons' , polygonsController.getAll)

router.get('/polygons/:id' , polygonsController.getOne)

router.put('/polygons/:id' ,express.json(), polygonsController.update)

router.delete('/polygons/:id' , polygonsController.delete)


module.exports = router;