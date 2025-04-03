/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

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
// Service
router.get('/history-serviced', AuthMiddleware.jwtValidate, HandleBadRequest, ReportController.getReportHistoryServiced);

// Booking
router.get('/booking', AuthMiddleware.jwtValidate, HandleBadRequest, ReportController.getReportBooking);

// Topup
router.get('/topup', AuthMiddleware.jwtValidate, HandleBadRequest, ReportController.getReportTopup);

module.exports = router;
