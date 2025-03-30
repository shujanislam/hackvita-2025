const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/auth.middleware');
const { generateRoadmap, generateContent } = require('../controllers/roadmap.controller');

router.post('/generate', generateRoadmap);
router.post('/content', generateContent);
router.post('/ping',(req,res)=>{
    res.status(200).json({success:true,message:"Pong"});
})

module.exports = router;
