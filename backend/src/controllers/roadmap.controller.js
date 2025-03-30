const { GoogleGenAI, Type } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEN_AI_API_KEY });

async function generateRoadmap(req, res, next) {
const resSchema = {
    type:Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            'Topic_Name': {
                type: Type.STRING,
                description: "The name of the topic.",
                nullable: false
            },
            'subtopics': {
                type: Type.ARRAY,
                items:{
                    type:Type.STRING,
                    description:'A list of subtopics with explanations.',
                    nullable:false
                }
            }
        },
        required: ["Topic_Name", "subtopics"],
        propertyOrdering:["Topic_Name", "subtopics"]
    }
};

const prompt = `create a roadmap for studying complete Thermodynamics with all topics and subtopics,
    level: beginner,
    english_understanding_capability: 5 out of 10,
    Grasping_Power: 4 out of 10
`;


    
const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
        responseMimeType: 'application/json',
        responseSchema: resSchema,
    },
});

let rawText = response.text.trim();

// Remove markdown code block (```json ... ```)
if (rawText.startsWith("```json")) {
    rawText = rawText.slice(7, -3).trim();
} else if (rawText.startsWith("```")) {
    rawText = rawText.slice(3, -3).trim();
}

const structuredResponse = JSON.parse(rawText)


// console.debug(JSON.parse(response.text));
return res.status(200).json({success:true, response: structuredResponse});
}


module.exports = {generateRoadmap};
    
    