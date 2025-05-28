// predictor.js
import { loadModel } from './modelLoader';
import { imageToTensor } from './imageHelpers';

export async function classifyImage(uri) {
  const model = await loadModel();
  const tensor = await imageToTensor(uri);
  const predictions = await model.classify(tensor);  
  // returns [{ className: 'daisy', probability: 0.95 }, …]
  return predictions;
}
