const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../utils/auth');

router.get('/', auth, notificationController.getNotifications);

module.exports = router;
