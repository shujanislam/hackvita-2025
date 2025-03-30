const express = require('express');
const router = express.Router();
const { register, login, getUserDetails, profile, logout } = require('../controllers/auth.controller');
const { protectRoute } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUserDetails);
router.post('/ping',(req,res)=>{
    res.status(200).json({success:true,message:"Pong"});
})
router.get('/profile',protectRoute, profile)
router.post('/logout',protectRoute, logout);

module.exports = router;
