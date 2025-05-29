import { loadModel } from './modelLoader';
import { imageToTensor } from './imageHelper'; // you wrote this earlier

export async function classifyImage(uri) {
  const model = await loadModel();
  const tensor = await imageToTensor(uri); // resized, normalized
  const predictions = await model.classify(tensor); // [{className, probability}]
  return predictions;
}
