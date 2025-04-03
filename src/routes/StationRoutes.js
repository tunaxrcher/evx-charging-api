/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const StationController = require('../controllers/StationController');

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
router.get('/', AuthMiddleware.jwtValidate, HandleBadRequest, StationController.getAllStations);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, StationController.getStation);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, StationController.updateStation);

module.exports = router;
