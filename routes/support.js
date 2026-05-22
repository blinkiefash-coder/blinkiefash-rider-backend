const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const auth = require('../utils/auth');

router.get('/', auth, supportController.getTickets);
router.post('/create', auth, supportController.createTicket);

module.exports = router;
