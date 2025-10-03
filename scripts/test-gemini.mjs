// Script para generar contenido con Gemini y guardar la respuesta en Supabase Storage
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent("Escribe un título creativo para un post sobre envíos internacionales.");
  const content = result.response.text();

  // Guarda la respuesta en Supabase Storage
  const path = `gemini-respuestas/respuesta-${Date.now()}.txt`;
  const { data, error } = await supabase.storage
    .from("respuestas-gemini")
    .upload(path, content);

  if (error) {
    console.error("Error subiendo a Supabase Storage:", error);
  } else {
    console.log("Respuesta guardada en Supabase Storage:", data);
  }
}

run();