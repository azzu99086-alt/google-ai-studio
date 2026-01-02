
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const solveProblem = async (problem: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: problem,
      config: {
        systemInstruction: "You are a professional mathematician. Solve the user's math problem or word problem step-by-step. Provide a final concise answer first, followed by the reasoning.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: "The final numerical or short answer." },
            reasoning: { type: Type.STRING, description: "Markdown formatted step-by-step explanation." },
            complexity: { type: Type.STRING, description: "Easy, Medium, or Hard" }
          },
          required: ["answer", "reasoning", "complexity"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini solving error:", error);
    throw error;
  }
};
