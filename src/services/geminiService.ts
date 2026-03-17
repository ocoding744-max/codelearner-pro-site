import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(
  prompt: string,
  codeContext?: string,
  systemInstruction?: string,
) {
  try {
    const fullPrompt = codeContext
      ? `Context (User's current code):\n\`\`\`\n${codeContext}\n\`\`\`\n\nUser Question: ${prompt}`
      : prompt;

    const defaultInstruction =
      "You are an expert coding tutor. Help the user learn programming, debug their code, and understand concepts. Be encouraging and clear. If they provide code context, refer to it in your answer.";

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: fullPrompt,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        systemInstruction: systemInstruction || defaultInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Sorry, I encountered an error while thinking. Please try again.";
  }
}
