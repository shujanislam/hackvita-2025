const express = require('express');

const router = express.Router();

let { createClient } = require('redis');

const { getRecommendationResponse } = require('../controllers/recommendation.controller.js');

const redisClient = createClient({
  url: 'redis://localhost:6379'
})

redisClient.connect().catch(console.error);

router.get(`/recommendation/:userId`, async (req, res)=>{
  let userId = req.params.userId;

  let recommendedVideo = await getRecommendationResponse(userId);

  console.log(recommendedVideo);

  await redisClient.set("recommendation-videos", JSON.stringify(recommendedVideo));
})

router.get('/load-recommendation', async(req, res)=>{
  let loadedVideos = await redisClient.get("recommendation-videos");

  res.status(200).json(JSON.parse(loadedVideos));
})

module.exports = router;
