/*==============================
core
==============================*/
const express = require('express');
const router = express.Router();
const SteveDataController = require('../controllers/SteveDataController');

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
router.post('/getEVStation', HandleBadRequest, SteveDataController.getStation);
router.post('/getConnecter', HandleBadRequest, SteveDataController.getConnecter);
router.post('/getConnecterStatus', HandleBadRequest, SteveDataController.getConnecterStatus);  
router.post('/getStartTransectionLast', HandleBadRequest, SteveDataController.getStartTransectionLast);
router.post('/addTransection', HandleBadRequest, SteveDataController.addTransection);
router.post('/getActiveChecgerData', HandleBadRequest, SteveDataController.getActiveChecgerData);  
router.post('/getActiveTransections', HandleBadRequest, SteveDataController.getActiveTransections); 
router.post('/getTransectionsFinish', HandleBadRequest, SteveDataController.getTransectionsFinish);   
router.post('/getConnectorFinish', HandleBadRequest, SteveDataController.getConnectorFinish); 
router.get('/getActivePriceKw', HandleBadRequest, SteveDataController.getActivePriceKw); 
router.post('/addnewPriceKw', HandleBadRequest, SteveDataController.addnewPriceKw); 
router.post('/updatePriceKw', HandleBadRequest, SteveDataController.updatePriceKw); 
router.post('/summaryChargerUser', HandleBadRequest, SteveDataController.summaryChargerUser); 

module.exports = router;
