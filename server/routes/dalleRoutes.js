import express from 'express';
import * as dotenv from 'dotenv';
import { generate } from '../functions/huggingFace.js'; // Ajusta la ruta según la estructura de tu proyecto

dotenv.config();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from imgBB!');
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body; // Obtener el prompt del cuerpo de la solicitud

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ error: 'Prompt is required and must be a non-empty string' });
    }

    console.log("Prompt recibido:", prompt);

    // Generar la imagen y obtener la URL
    const imageUrl = await generate(prompt);

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("Error al generar la imagen:", error.message);
    res.status(500).json({
      error: error.message || 'An error occurred while generating the image',
    });
  }
});

export default router;

