const express = require('express');

const router = express.Router();

const { createClient } = require('redis');

const { getTrendingVideoResponse } = require('../controllers/trending.controller.js');

const redisClient = createClient({
  url: 'redis://localhost:6379'
})

redisClient.connect().catch(console.error);

router.get(`/trending/:userId`, async (req, res)=>{
  let userId = req.params.userId;

  let trendingVideo = await getTrendingVideoResponse(userId);

  console.log('wroking');

  res.status(200);

  await redisClient.set("trending-videos", JSON.stringify(trendingVideo));
})

router.get('/load-trending', async(req, res)=>{
  let loadTrending = await redisClient.get("trending-videos");

  console.log(JSON.parse(loadTrending));

  res.status(200).json(JSON.parse(loadTrending));
})

module.exports = router;
