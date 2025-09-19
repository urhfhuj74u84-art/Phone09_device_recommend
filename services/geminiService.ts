
import { GoogleGenAI, Type } from "@google/genai";
import type { UserAnswers, Recommendation } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (answers: UserAnswers, phoneData: string): string => {
  let preferences = "The user has the following preferences:\n";
  if (answers.priorities?.length) preferences += `- Key Priorities: ${answers.priorities.join(", ")}\n`;
  if (answers.previousBrand) preferences += `- Previous Phone Brand: ${answers.previousBrand}\n`;
  if (answers.budget) preferences += `- Budget: ${answers.budget}\n`;
  if (answers.storage) preferences += `- Desired Storage: ${answers.storage}\n`;
  if (answers.screenSize) preferences += `- Preferred Screen Size: ${answers.screenSize}\n`;

  return `
    You are an expert smartphone recommender. Your task is to analyze user preferences and a provided CSV list of smartphones to recommend the top 3 best matches.

    ${preferences}

    Here is the list of available smartphones in CSV format:
    --- START OF CSV DATA ---
    ${phoneData}
    --- END OF CSV DATA ---

    Analyze the user's preferences and the smartphone data carefully. Select the top 3 smartphones that best fit the user's needs.

    For each recommended phone, provide a concise, one-sentence explanation for why it's a great choice for this specific user. The 'model' name must exactly match a model from the provided CSV data.
    
    Return ONLY a valid JSON array of objects with the specified schema. Do not include any introductory text, explanations, or markdown formatting outside of the JSON structure.
  `;
};

const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            model: {
                type: Type.STRING,
                description: 'The exact model name of the recommended phone from the provided data.',
            },
            reason: {
                type: Type.STRING,
                description: 'A brief, one-sentence reason for the recommendation based on user preferences.',
            },
        },
        required: ["model", "reason"],
    },
};


export const getPhoneRecommendations = async (answers: UserAnswers, phoneData: string): Promise<Recommendation[]> => {
  const prompt = generatePrompt(answers, phoneData);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const recommendations = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error("Invalid response format from AI.");
    }

    return recommendations.slice(0, 3) as Recommendation[];
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get recommendations from the AI service.");
  }
};
