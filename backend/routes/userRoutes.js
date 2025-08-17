const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming JWT or session auth

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
