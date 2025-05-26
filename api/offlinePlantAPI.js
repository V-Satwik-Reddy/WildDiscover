import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

let model = null;
let labels = [];

export async function loadModel() {
  if (!model) {
    await tf.ready();

    const modelJson = require('../assets/model/model.json');
    const modelWeights = require('../assets/model/group1-shard1of1.bin');
    model = await tf.loadGraphModel(bundleResourceIO(modelJson, modelWeights));

    const labelAsset = Asset.fromModule(require('../assets/model/labels.txt'));
    await labelAsset.downloadAsync();
    const labelTxt = await FileSystem.readAsStringAsync(labelAsset.localUri);
    labels = labelTxt.split('\n');
  }
}

export async function identifyPlantOffline(imageUri) {
  try {
    await loadModel();

    const imgB64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const raw = tf.util.encodeString(imgB64, 'base64').buffer;
    const rawTensor = new Uint8Array(raw);
    let imgTensor = decodeJpeg(rawTensor);

    imgTensor = tf.image
      .resizeBilinear(imgTensor, [224, 224])
      .expandDims(0)
      .toFloat()
      .div(255);

    const prediction = model.predict(imgTensor);
    const scores = prediction.arraySync()[0];

    const topIdx = scores.indexOf(Math.max(...scores));
    const confidence = (scores[topIdx] * 100).toFixed(2);

    return {
      name: labels[topIdx] || 'Unknown',
      confidence,
    };
  } catch (err) {
    console.error('Offline AI error:', err);
    return {
      name: 'Unknown',
      confidence: 0,
    };
  }
}
