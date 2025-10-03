// Script de prueba para conectar con Gemini usando @google/generative-ai
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent("Escribe un título creativo para un post sobre envíos internacionales.");
  console.log(result.response.text());
}

run();