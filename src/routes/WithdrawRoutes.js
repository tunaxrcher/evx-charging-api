/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const WithdrawController = require('../controllers/WithdrawController');

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
router.get('/', AuthMiddleware.jwtValidate, HandleBadRequest, WithdrawController.getAllWithdraw);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, WithdrawController.getWithdraw);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, WithdrawController.updateWithdraw);

module.exports = router;
