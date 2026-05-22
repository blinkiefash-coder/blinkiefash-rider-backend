const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const auth = require('../utils/auth');

router.get('/', auth, shiftController.getShifts);
router.post('/start', auth, shiftController.startShift);
router.post('/end', auth, shiftController.endShift);

module.exports = router;
