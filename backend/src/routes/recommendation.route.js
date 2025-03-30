const express = require('express');

const router = express.Router();

const { getRecommendationResponse } = require('../controllers/recommendation.controller.js');

router.get(`/recommendation/:userId`, async (req, res)=>{
  let userId = req.params.userId;

  let recommendedVideo = await getRecommendationResponse(userId);

  console.log(recommendedVideo);

  res.status(200).json(recommendedVideo);

})

module.exports = router;
