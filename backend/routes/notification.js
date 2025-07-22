const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', authenticateToken, notificationController.getAllRescueRequests);

module.exports = router;
