// Script para generar contenido con Gemini y guardarlo en Supabase Storage
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Inicializa clientes
const genAI = new GoogleGenerativeAI(apiKey);
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  try {
    // Usar el modelo gemini-pro para texto
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Escribe un título creativo para un post en Instagram sobre envíos internacionales.";
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("✅ Gemini respondió:", text);

    // Nombre del archivo con la fecha actual
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const fileName = `output-${date}.txt`;

    // Guardar en Supabase (bucket gemini-outputs)
    const { error } = await supabase.storage
      .from("gemini-outputs")
      .upload(fileName, new Blob([text], { type: "text/plain" }), {
        upsert: true,
      });

    if (error) throw error;
    console.log(`✅ Archivo guardado en Supabase: ${fileName}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

run();
