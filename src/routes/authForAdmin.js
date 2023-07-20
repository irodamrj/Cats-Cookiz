const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/authForAdmin');
const checkCookie = require('../middleware/checkCookie');
const { adminAuth } = require('../middleware/authorization');

router.post('/login', checkCookie, login);
router.get('/logout', adminAuth, logout);

module.exports = router;
