const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const auth = require('../utils/auth');

router.get('/', auth, deliveryController.getDeliveries);
router.get('/available', auth, deliveryController.getAvailableOrders);
router.post('/accept/:orderId', auth, deliveryController.acceptOrder);
router.patch('/:id/status', auth, deliveryController.updateStatus);
router.post('/:id/location', auth, deliveryController.updateLocation);

// OTP + Try & Buy flow
router.post('/:id/store-arrived', auth, deliveryController.markStoreArrived);
router.post('/:id/verify-store-otp', auth, deliveryController.verifyStoreOtp);
router.post('/:id/arrived', auth, deliveryController.markArrived);
router.post('/:id/verify-otp', auth, deliveryController.verifyOtp);
router.post('/:id/try-buy-select', auth, deliveryController.tryBuySelect);
router.post('/:id/try-buy-complete', auth, deliveryController.tryBuyComplete);
router.get('/:id/detail', auth, deliveryController.getDeliveryDetail);

module.exports = router;
