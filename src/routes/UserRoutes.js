/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

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
// router.get('/', HandleBadRequest, UserController.getAllUsers);
router.get('/:id', AuthMiddleware.jwtValidate, HandleBadRequest, UserController.getUser);
router.post('/create', HandleBadRequest, UserController.createUser);
router.post('/update', AuthMiddleware.jwtValidate, HandleBadRequest, UserController.updateUser);
router.post('/changePassword', AuthMiddleware.jwtValidate, HandleBadRequest, UserController.changePassword);

module.exports = router;
