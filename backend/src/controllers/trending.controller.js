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
    title: "Coding in 2025: What's Changing That You Aren’t Ready For?",
    summary: "An exploration of the significant changes in the tech world in 2025, including groundbreaking AI tools and shifts in developer workflows.",
    link: "https://www.youtube.com/watch?v=PQKlG7R1EWg"
  },
  {
    title: "2025 Programming: Trends, Insights, and Top Picks",
    summary: "A comprehensive overview of the top programming languages to learn in 2025, backed by real statistics and trends.",
    link: "https://www.youtube.com/watch?v=Xo31b-JkpBE"
  },
  {
    title: "Top Programming Languages to Learn in 2025",
    summary: "A guide to future-proofing your coding skills by discovering the programming languages that will dominate in 2025, with real-world use cases and career insights.",
    link: "https://www.youtube.com/watch?v=NClmyC6olC0"
  },
  {
    title: "Top 10 Programming Trends in 2025",
    summary: "An analysis of the top 10 programming trends shaping the future of software development in 2025.",
    link: "https://learnerbits.com/top-10-programming-trends-in-2025/"
  },
  {
    title: "Top 16 Programming Trends to Look Out for in 2025",
    summary: "An article discussing the 16 most significant programming trends to watch in 2025, including the rise of AI and machine learning.",
    link: "https://www.outsourceaccelerator.com/articles/programming-trends/"
  },
  {
    title: "25 Best Future Programming Languages for 2025 – 2040",
    summary: "An in-depth look at the 25 programming languages expected to shape the future from 2025 to 2040.",
    link: "https://www.scaler.com/blog/future-programming-languages/"
  },
  {
    title: "Programming Trends 2025: Insights and Predictions",
    summary: "A comprehensive analysis of programming trends in 2025, providing insights and predictions for the future.",
    link: "https://www.aegona.com/software-development/programming-trends-2025-insights-and-predictions"
  },
  {
    title: "Coding Trends to Watch in 2025",
    summary: "An overview of the coding trends to watch in 2025, including sustainability in software development and polyglot programming.",
    link: "https://customizeddev.pythonanywhere.com/blogs/coding-trends-to-watch-in-2025/"
  },
  {
    title: "Top Programming Trends in 2025: What You Need to Know",
    summary: "A discussion on the top programming trends in 2025, covering AI, machine learning, cloud-native development, and quantum computing.",
    link: "https://toxigon.com/top-programming-trends-in-2025"
  },
  {
    title: "2025 Coding Trends – AI, Low-Code & More Innovations",
    summary: "An exploration of the coding trends in 2025, focusing on AI-driven coding, low-code/no-code platforms, and new programming languages.",
    link: "https://www.telegramevening.com/will-ai-redefine-coding-2025/"
  }
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
