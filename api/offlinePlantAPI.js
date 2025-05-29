import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

export async function identifyPlantOffline(uri) {
  await tf.ready();
  const model = await mobilenet.load();
  const imageAssetPath = Image.resolveAssetSource({ uri });
  const imageTensor = await decodeJpegFromUri(imageAssetPath.uri); // write this helper
  const predictions = await model.classify(imageTensor);

  return {
    name: predictions[0].className,
    confidence: predictions[0].probability.toFixed(2),
    description: `Likely a ${predictions[0].className}`,
    wikipediaLink: `https://en.wikipedia.org/wiki/${predictions[0].className.replace(/ /g, "_")}`,
  };
}
