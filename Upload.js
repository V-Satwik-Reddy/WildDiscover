import { RNS3 } from 'react-native-aws3';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } from './config/config.js';

export async function uploadImageToS3(imageUri, userPhone, tag = 'Unknown') {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '').slice(0, 15);
  const safeTag = tag.toLowerCase().replace(/[^a-z0-9]/gi, '_');
  const fileName = `${timestamp}_${safeTag}.jpg`;

  const file = {
    uri: imageUri,
    name: fileName,
    type: 'image/jpeg',
  };

  const options = {
    keyPrefix: `${userPhone}/`,
    bucket: BUCKET_NAME,
    region: 'ap-south-1',
    accessKey: ACCESS_KEY_ID,
    secretKey: SECRET_ACCESS_KEY,
    successActionStatus: 201,
  };

  try {
    const response = await RNS3.put(file, options);
    if (response.status !== 201) {
      throw new Error('Upload failed');
    }

    return { success: true, url: response.body.postResponse.location };
  } catch (err) {
    console.error('Upload failed:', err);
    return { success: false, error: err };
  }
}
