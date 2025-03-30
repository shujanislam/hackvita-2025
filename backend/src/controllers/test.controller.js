const { GoogleGenAI, Type } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEN_AI_API_KEY });


async function get_10_questions() {

const resSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            'question':{
                type:Type.STRING,
                description: 'A multiple choice question related to the given topic. Do not include the options or answer. just the question text.',
                nullable:false
            },

            'options':{
                type:Type.ARRAY,
                items:{
                    type:Type.OBJECT,   
                    properties:{
                        'A':{
                            type:Type.STRING,
                            description:'first option',
                            nullable:false
                        },
                        'B':{
                            type:Type.STRING,
                            description:'second option',
                            nullable:false
                        },
                        'C':{
                            type:Type.STRING,
                            description:'third option',
                            nullable:false
                        },
                        'D':{
                            type:Type.STRING,
                            description:'fourth option',
                            nullable:false
                        },
                    },
                    required:['A', 'B', 'C', 'D']
                }
            },

            'correctAnswer':{
                type:Type.STRING,
                description:'The correct answer to the question.',
                nullable:false
            },

            'explanation':{
                type:Type.STRING,
                description:'Explain why the answer is correct. Length of explanation should depend on the complexity of the question.',
                nullable:false
            },

            'subTopicLayer1': {
                type:Type.STRING,
                description: 'The subtopic of the main topic provided to which the question belongs.',
                nullable: false
            },

            'subTopicLayer2': {
                type:Type.STRING,
                description: 'The subtopic of the subTopicLayer1 to which the question belongs.',
                nullable: false
            },
        },
        required: ['question', 'options', 'correctAnswer', 'explanation', 'subTopicLayer1', 'subTopicLayer2'],
        propertyOrdering: ['question', 'options', 'correctAnswer', 'explanation', 'subTopicLayer1', 'subTopicLayer2'],
    },
    minItems:10,
    maxItems:10
}
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: 'List 10 popular questions.',
        config: {
            responseMimeType: 'application/json',
            responseSchema: resSchema,
        },
    });

    console.debug(response.text);
    return response.text
}

module.exports = get_10_questions;

