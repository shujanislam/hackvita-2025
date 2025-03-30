const express = require('express');
const router = express.Router();
const { register, login, getUserDetails, profile, logout } = require('../controllers/auth.controller');
const { protectRoute } = require('../middleware/auth.middleware');
const { get_10_questions } = require('../controllers/test.controller');

router.post('/generate', get_10_questions);

module.exports = router;
