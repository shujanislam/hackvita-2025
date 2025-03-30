require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GOOGLE_API_TOKEN;

if (!API_KEY) {
    console.error("❌ Missing Gemini API key. Please check your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

const users = [
    { id: 'abc123', name: "Alice", interests: ["technology", "AI", "coding"], watchHistory: ["Intro to AI", "Building Chatbots"], weakTopics: ["DSA", "Linear Algebra"] },
    { id: 'xyz123', name: "Bob", interests: ["gaming", "streaming", "VR"], watchHistory: ["Top 10 VR Games", "Best Streaming Setups"], weakTopics: ["Game Engine", "Mathematics"] },
];

const videos = [
  {
    title: "JavaScript Crash Course For Beginners",
    summary: "A comprehensive guide to JavaScript fundamentals.",
    link: "https://www.youtube.com/watch?v=hdI2bqOjy3c"
  },
  {
    title: "Python Full Course - Learn Python in 12 Hours",
    summary: "An in-depth tutorial covering Python basics to advanced concepts.",
    link: "https://www.youtube.com/watch?v=rfscVS0vtbw"
  },
  {
    title: "React JS Crash Course",
    summary: "Learn the fundamentals of React.js in this crash course.",
    link: "https://www.youtube.com/watch?v=w7ejDZ8SWv8"
  },
  {
    title: "Node.js Tutorial for Beginners: Learn Node in 1 Hour",
    summary: "A quick introduction to Node.js for beginners.",
    link: "https://www.youtube.com/watch?v=TlB_eWDSMt4"
  },
  {
    title: "Learn HTML5 and CSS3 From Scratch - Full Course",
    summary: "A complete guide to building websites with HTML5 and CSS3.",
    link: "https://www.youtube.com/watch?v=mU6anWqZJcc"
  },
  {
    title: "Django Full Stack Tutorial - Python Django Web Framework",
    summary: "Learn how to build web applications using Django.",
    link: "https://www.youtube.com/watch?v=F5mRW0jo-U4"
  },
  {
    title: "Flutter Tutorial for Beginners - Build iOS & Android Apps",
    summary: "An introduction to Flutter for mobile app development.",
    link: "https://www.youtube.com/watch?v=fis26HvvDII"
  },
  {
    title: "Kotlin Full Course - Learn Kotlin in 8 Hours",
    summary: "A comprehensive tutorial on Kotlin programming language.",
    link: "https://www.youtube.com/watch?v=F9UC9DY-vIU"
  },
  {
    title: "C++ Tutorial for Beginners - Full Course",
    summary: "Learn C++ programming from scratch in this full course.",
    link: "https://www.youtube.com/watch?v=vLnPwxZdW4Y"
  },
  {
    title: "PHP Programming Language Tutorial - Full Course",
    summary: "A complete guide to PHP programming for web development.",
    link: "https://www.youtube.com/watch?v=OK_JCtrrv-c"
  }
];
async function getRecommendationResponse(userId) {
    try {
        const user = users.find((u) => u.id === userId);
        if (!user) console.log( "User not found." );

        const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-002" });

        const chat = model.startChat({
            history: [],
            generationConfig: { maxOutputTokens: 300 },
        });

        const inputData = `
        You are a video recommendation system. Based on the user's interests, weak topics(MOST IMPORTANT) and watch history, 
        suggest the best videos from the provided list. Also provide them in a linear manner like don't jump from videos like Hard topic videos comes and then easy topics. give easy topic videos first and then start gradually.
        For eg: In Machine Learning type of recommendation start by (Mathematics, AI, Machine learning, Deep Learning, Neural Networks). Make the better roadmap type.

        User Info:
        - Name: ${user.name}
        - Interests: ${user.interests.join(", ")}
        - Watch History: ${user.watchHistory.join(", ")}
        - Weak Topics: ${user.weakTopics.join(", ")}

        Available Videos:
        ${videos.map((v, i) => `${i + 1}. Title: ${v.title}\n   Summary: ${v.summary}\n   Link: ${v.link}`).join("\n")}

        Recommend the best videos for ${user.name} and just give the video link and name in plain json format without any backtick json tags above and below and don't add it inside another array like recommendations, just one array with the videos that's it.
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

module.exports = { getRecommendationResponse, users, videos };
