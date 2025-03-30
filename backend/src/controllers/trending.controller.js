require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GOOGLE_API_TOKEN;

if (!API_KEY) {
    console.error("❌ Missing Gemini API key. Please check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const users = [
    {
        id: "abc123",
        name: "Alice",
        interests: ["technology", "AI", "coding"],
        watchHistory: ["Intro to AI", "Building Chatbots"],
        weakTopics: ["DSA", "Linear Algebra"],
    },
    {
        id: "xyz123",
        name: "Bob",
        interests: ["gaming", "streaming", "VR"],
        watchHistory: ["Top 10 VR Games", "Best Streaming Setups"],
        weakTopics: ["Game Engine", "Mathematics"],
    },
];

const videos = [
    {
        title: "AI in 2025: What’s Next?",
        summary: "A deep dive into the future of artificial intelligence.",
        link: "https://example.com/ai-2025",
    },
    {
        title: "How to Start Coding",
        summary: "A beginner-friendly guide to learning programming.",
        link: "https://example.com/start-coding",
    },
    {
        title: "VR Gaming: The Future of Entertainment",
        summary: "Exploring the evolution of virtual reality gaming.",
        link: "https://example.com/vr-gaming",
    },
    {
        title: "Streaming Setup Guide",
        summary: "How to set up a high-quality streaming environment.",
        link: "https://example.com/streaming-setup",
    },
    {
        title: "Intro to Linear Algebra",
        summary: "Learning Math for AI in an easy way",
        link: "https://example.com/linear-algebra",
    },
];

async function getTrendingVideoResponse(userId) {
    try {
        const user = users.find((u) => u.id === userId);
        if (!user) {
            console.log("User not found.");
            return [];
        }

        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

        const chat = model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 300 },
        });

        const inputData = `
You are a trending video recommendation system.

🔹 **Objective:** Suggest the most trending videos from the given list.  
🔹 **Criteria for Trending Videos:**  
   1️⃣ Popularity and general interest.  
   2️⃣ Topics that are currently engaging a wide audience.  
   3️⃣ Videos that appeal to many users, not just specific individuals.  

🔹 **Available Videos:**  
${videos
    .map((v, i) => `${i + 1}. Title: ${v.title}\n   Summary: ${v.summary}\n   Link: ${v.link}`)
    .join("\n")}

 Recommend the best videos for ${user.name} and just give the video link and name in plain json format without any backtick json tags above and below and don't add it inside another array like recommendations, just one array with the videos that's it
`;

        const result = await chat.sendMessage(inputData);

        if (result && result.response && result.response.text) {
            return JSON.parse(result.response.text());
        } else {
            throw new Error("Invalid response from Gemini API");
        }
    } catch (error) {
        console.error("❌ Chatbot Error:", error);
        return "Sorry, I am having trouble generating recommendations right now. Please try again later.";
    }
}

module.exports = { getTrendingVideoResponse, users, videos };
