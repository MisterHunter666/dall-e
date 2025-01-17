let token = "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"; // Token de Hugging Face
let imgbbApiKey = "680280f710b556a112db8220e13b0da6"; // Token de imgBB

// Función para generar imágenes usando Hugging Face y cargar en imgBB
export async function generate(prompt) {
    try {
        console.log("Prompt received:", prompt);

        // Generar imagen desde Hugging Face
        const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            throw new Error("Error connecting to the Hugging Face API");
        }

        const imageBlob = await response.blob();

        // Subir imagen a imgBB
        const formData = new FormData();
        formData.append("image", imageBlob, "generatedImage.png");
        const imgbbResponse = await fetch(
            `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
            {
                method: "POST",
                body: formData,
            }
        );

        const imgbbResult = await imgbbResponse.json();

        if (!imgbbResult.success || !imgbbResult.data.url) {
            console.error("ImgBB response:", imgbbResult);
            throw new Error("Error uploading image to imgBB");
        }

        console.log("Image URL:", imgbbResult.data.url);
        return imgbbResult.data.url; // Retornar la URL de la imagen alojada
    } catch (error) {
        console.error("Error generating or uploading image:", error);
        throw error;
    }
}
