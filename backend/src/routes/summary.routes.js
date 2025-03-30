const express = require("express");
const { getSummary } = require("../controllers/summary.controller");

const router = express.Router();

router.get("/summarize", getSummary);

module.exports = router;
