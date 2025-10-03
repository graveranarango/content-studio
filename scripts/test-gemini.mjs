import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
   const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const result = await model.generateContent("Escribe un título corto y creativo para un post en Instagram sobre envíos internacionales.");
    console.log("Gemini respondió:", result.response.text());
  } catch (err) {
    console.error("Error llamando a Gemini:", err);
    process.exit(1);
  }
}

run();
