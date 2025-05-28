// modelLoader.js
import * as mobilenet from '@tensorflow-models/mobilenet';

let model = null;

export async function loadModel() {
  if (!model) {
    model = await mobilenet.load();   // loads the pretrained ImageNet version
    console.log('✅ MobileNet loaded');
  }
  return model;
}
