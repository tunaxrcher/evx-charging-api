/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const DepositController = require('../controllers/DepositController');

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
router.get('/', AuthMiddleware.jwtValidate, HandleBadRequest, DepositController.getAllDeposit);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, DepositController.getDeposit);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, DepositController.updateDeposit);

module.exports = router;
