import { RNS3 } from 'react-native-aws3';
import * as FileSystem from 'expo-file-system';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } from './config/config.js';

export async function uploadImageToS3(imageUri, userPhone, tag = 'Unknown') {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:.]/g, '').slice(0, 15);
  const safeTag = tag.toLowerCase().replace(/[^a-z0-9]/gi, '_');
  const fileName = `${timestamp}_${safeTag}.jpg`;

  try {
    // Get proper file URI
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) throw new Error('Image file does not exist');

    const file = {
      uri: fileInfo.uri,
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
console.log('File Info:', fileInfo);

    const response = await RNS3.put(file, options);

console.log('Upload Response:', response); // 👈 ADD THIS

if (response.status !== 201) {
  console.error('Full S3 error:', response.body); // 👈 ADD THIS TOO
  throw new Error('Upload failed');
}


    return { success: true, url: response.body.postResponse.location };
  } catch (err) {
    console.error('Upload failed:', err);
    return { success: false, error: err };
  }
}
