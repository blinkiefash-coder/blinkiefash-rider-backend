const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const auth = require('../utils/auth');

router.get('/', auth, payoutController.getPayouts);
router.post('/request', auth, payoutController.requestPayout);

module.exports = router;
