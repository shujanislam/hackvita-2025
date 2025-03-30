// const { GoogleGenAI, Type } = require("@google/genai");
// require("dotenv").config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// async function generateRoadmap(req, res, next) {
//     try {
//         const resSchema = {
//             type: Type.OBJECT,
//             properties: {
//                 "Topic_Name": {
//                     type: Type.STRING,
//                     description: "The name of the topic.",
//                     nullable: false
//                 },
//                 "subtopics": {
//                     type: Type.OBJECT,
//                     description: "A list of subtopics with explanations.",
//                     additionalProperties: {
//                         type: Type.STRING
//                     },
//                     nullable: false
//                 }
//             },
//             required: ["Topic_Name", "subtopics"]
//         };

//         const prompt = `{
//             Topic-name: Thermodynamics,
//             level: beginner,
//             english_understanding_capability: 5 out of 10,
//             Grasping_Power: 4 out of 10
//         }
//         Generate topics and subtopics in structured JSON format, strictly following this schema. Return only pure JSON output.`;

//         const response = await model.generateContent({
//             contents: [prompt],
//             config: {
//                 responseMimeType: "application/json",
//                 responseSchema: resSchema
//             }
//         });

//         let rawText = response.response.text().trim();

//         // Remove markdown code block (```json ... ```)
//         if (rawText.startsWith("```json")) {
//             rawText = rawText.slice(7, -3).trim();
//         } else if (rawText.startsWith("```")) {
//             rawText = rawText.slice(3, -3).trim();
//         }

//         const structuredResponse = JSON.parse(rawText);
//         res.status(200).json({ success: true, message: structuredResponse });
//     } catch (error) {
//         console.error("Error generating response:", error);
//         res.status(500).json({ success: false, message: "Error generating response" });
//     }
// }

// module.exports = { generateRoadmap };
