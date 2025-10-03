// Script para listar los modelos disponibles con tu API Key de Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const models = await genAI.listModels();
    console.log("Modelos disponibles:", JSON.stringify(models, null, 2));
  } catch (error) {
    console.error("Error listando modelos:", error);
  }
}

run();
