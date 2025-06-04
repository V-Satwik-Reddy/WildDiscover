import { GEMINI } from "../config/config.js";


export const validateLabelWithGemini = async (label, category) => {
  try {
    // console.log(`Does "${label}" belong to the category "${category}"? Reply only Yes or No.`)
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `Can a "${label}" like this be considered a landmark in public spaces or tourism?Does  belong to the category "${category}"? Reply only Yes or No.` }
              ]
            }
          ],
        }),
      }
    );

    const data = await res.json();
    // console.log("Full Gemini API response:", JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("No valid response from Gemini.");

    return text.trim().toLowerCase().includes("yes");

  } catch (err) {
    console.error("Gemini validation error:", err);
    return false;
  }
};
