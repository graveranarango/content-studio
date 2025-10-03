import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Este método devuelve todos los modelos disponibles para tu clave
    const list = await genAI.listModels();

    console.log("✅ Modelos disponibles en tu cuenta:");
    console.log(JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("❌ Error listando modelos:", err);
    process.exit(1);
  }
}

run();
