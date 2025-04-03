/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const ChargePointController = require('../controllers/ChargePointController');

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
router.get('/', AuthMiddleware.jwtValidate, HandleBadRequest, ChargePointController.getAllChargePoints);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, ChargePointController.getChargePoint);
router.post('/status', AuthMiddleware.jwtValidate, HandleBadRequest, ChargePointController.getChargePointByStatus);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, ChargePointController.updateChargePoint);

module.exports = router;
