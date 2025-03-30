const { GoogleGenAI, Type } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEN_AI_API_KEY });

async function generateRoadmap(req, res, next) {

const { topic } =  req.body

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

const prompt = `create a roadmap for studying complete ${topic} with all topics and subtopics,
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

async function generateContent(req, res, next) {
    const {topic} = req.body;
    const resSchema = {
        type:Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                'heading': {
                    type: Type.STRING,
                    description: "heading of the subtopic",
                    nullable: false
                },
                'lesson': {
                    type: Type.STRING,
                        description:'complete, detailed text lesson on the subtopic. add a fun fact at the end related to the subtopic',
                        nullable:false
                }
            },
            required: ["heading", "lesson"],
            propertyOrdering:["heading", "lesson"]
        }
    };
    
    const prompt = `generate complete, detailed text lesson on the topic "${topic}". generate as many subtopics as needed.`;
    
    
        
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
    
    
    // console.debug(structuredResponse);
    return res.status(200).json({success:true, response: structuredResponse});
    }


module.exports = {generateRoadmap, generateContent};
    
    