const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');// call controller exported

router.get('/read', product_controller.read);
router.post('/create', product_controller.create);
router.put('/update', product_controller.update);
router.delete('/delete', product_controller.delete);

module.exports = router;