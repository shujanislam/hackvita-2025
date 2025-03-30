const { YoutubeTranscript } = require("youtube-transcript");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_TOKEN);

async function fetchTranscript(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map((t) => t.text).join(" ");
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function summarizeText(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`You are an online educational website video summarizer which will summarize
    educational youtube videos and give them in proper humanized notes in paragraphs and very good to understand. Do not accept
    any videos other than educational related.:\n\n${text}`);
    return result.response.text();
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { fetchTranscript, summarizeText };
