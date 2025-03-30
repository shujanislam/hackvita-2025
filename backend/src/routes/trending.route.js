const express = require('express');

const router = express.Router();

const { getTrendingVideoResponse } = require('../controllers/trending.controller.js');

router.get(`/trending/:userId`, async (req, res)=>{
  let userId = req.params.userId;

  let trendingVideo = await getTrendingVideoResponse(userId);

  console.log(trendingVideo);

})

module.exports = router;
