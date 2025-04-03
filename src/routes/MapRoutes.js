/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const MapController = require('../controllers/MapController');

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
// router.post('/getEVStation', HandleBadRequest, MapController.getStation);
router.get('/getEvStationDetailMap', HandleBadRequest, MapController.getEvStationDetailMap); 


module.exports = router;
