/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

/*==============================
helper
==============================*/
const HandleBadRequest = require('../middlewares/HandleBadRequestMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const AuthRoutesValidations = require('./validators/AuthRoutes.validators');

/*==============================
Middleware
==============================*/
// -

/*==============================
Router
==============================*/
router.post('/login', AuthRoutesValidations.loginValidation, HandleBadRequest, AuthController.login);
router.post('/refresh', AuthMiddleware.jwtRefreshTokenValidate, HandleBadRequest, AuthController.refresh);
router.get('/test', AuthMiddleware.jwtValidate, (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
