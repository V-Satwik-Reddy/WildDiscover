// imageHelpers.js
import * as FileSystem from 'expo-file-system';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';

export async function imageToTensor(uri) {
  const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
  const raw = new Uint8Array(imgBuffer);
  let tensor = decodeJpeg(raw);             // [H, W, 3]
  tensor = tf.image.resizeBilinear(tensor, [224, 224]);
  return tensor.expandDims(0).toFloat().div(255.0);  // [1,224,224,3]
}
