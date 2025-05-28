// tfSetup.js
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export async function initializeTensorflow() {
  await tf.ready();                 // waits for RN bindings
  console.log('🔥 TensorFlow ready');
}
