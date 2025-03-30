const { fetchTranscript, summarizeText } = require("../models/summary.model");

exports.getSummary = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "YouTube URL is required" });

  const videoId = url.split("v=")[1]?.split("&")[0];
  if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

  const transcript = await fetchTranscript(videoId);
  if (!transcript) return res.status(400).json({ error: "Could not fetch transcript" });

  const summary = await summarizeText(transcript);
  if (!summary) return res.status(500).json({ error: "Failed to summarize" });

  res.json({ summary });
};
