const router = require('express').Router();
const moloniController = require('../controllers/moloni.controller');

router.post('/moloniGetToken/', moloniController.getToken);
router.post('/moloniGetRefreshToken/', moloniController.getRefreshToken);
router.post('/moloniGetAllProducts/', moloniController.getAllProducts);
router.post('/moloniAdd/', moloniController.saveProduct);

module.exports = router;