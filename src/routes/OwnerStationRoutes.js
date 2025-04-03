/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const OwnerStationController = require('../controllers/OwnerStationController');

/*==============================
helper
==============================*/
const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

/*==============================
Middleware
==============================*/
// -

/*==============================
Router
==============================*/
router.get('/', AuthMiddleware.jwtValidate, HandleBadRequest, OwnerStationController.getAllOwnerStations);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, OwnerStationController.getOwnerStation);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, OwnerStationController.updateOwnerStation);

module.exports = router;
