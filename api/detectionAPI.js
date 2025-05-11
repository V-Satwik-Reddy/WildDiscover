
import { identifyPlant } from './plantNetAPI.js';

/**
 * Detects an object (flora, fauna, or landmark) using the appropriate API.
 * @param {string} imageUri - Image URI.
 * @param {string} type - Object type: "flora", "fauna", or "landmark".
 * @returns {object} - Detection results with name, confidence, and additional info.
 */
export async function detectObject(imageUri, type) {
  if (!imageUri) {
    console.error("detectObject: No image data provided.");
    return { name: "Error", confidence: 0, message: "No image data." };
  }

  if (!["flora", "fauna", "landmark"].includes(type)) {
    console.error(`detectObject: Invalid type '${type}'`);
    return { name: "Error", confidence: 0, message: "Invalid detection type." };
  }

  try {
    switch (type) {
      case "flora":
        return await identifyPlant(imageUri);

      

    }
  } catch (error) {
    console.error(`detectObject Error (${type}):`, error.message || "Unknown error");

    let errorMessage = "Detection failed.";
    if (error.response?.data) {
      errorMessage += ` API Response: ${JSON.stringify(error.response.data)}`;
    }

    return { name: "Error", confidence: 0, message: errorMessage };
  }
}
