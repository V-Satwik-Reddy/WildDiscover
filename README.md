# 🌿 WildDiscover 🫎

WildDiscover is a React Native application designed to help users identify flora, fauna, and landmarks using advanced image recognition APIs and on-device machine learning models. Whether you're exploring nature or visiting famous landmarks, WildDiscover provides detailed information about the objects you capture or upload — all in a clean, intuitive interface.

---

## 📜 Features

- **Flora Identification**: Identify plants and get details like scientific name, family, habitat, and uses.
- **Fauna Identification**: Recognize animals, birds, and insects with information about their diet, habitat, and conservation status.
- **Landmark Identification**: Discover famous landmarks and learn about their history, architecture, and significance.
- **Offline Mode (AI Model)**: Identify flora and fauna without internet using a lightweight MobileNet model.
- **History Feature**: Automatically stores identified images to AWS S3 with user-tagged labels and timestamps, retrievable for future reference.
- **Wikipedia Integration**: Provides links and summaries from Wikipedia for additional information.
- **User-Friendly Interface**: Intuitive design for easy navigation and interaction.

---

## 🛠 Installation

Follow these steps to set up and run the project locally:

### Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. **Expo CLI**: Install Expo CLI globally using:

   ```bash
   npm install -g expo-cli
   ```

3. **Android/iOS Emulator or Physical Device**: Ensure you have an emulator set up or a physical device with the Expo Go app installed.

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd WildDiscover
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies:

   ```bash
   npm install
   ```

3. **Set Up API Keys**:
   Create a `config/config.js` file and add your API keys:

   ```javascript
   export const GOOGLE_VISION_API_KEY = 'your-google-vision-api-key';
   export const PLANT_NET_API_KEY = 'your-plant-net-api-key';
   export const ANIMAL_API_KEY = 'your-animal-api-key';
   export const ACCESS_KEY_ID = 'your-aws-access-key';
   export const SECRET_ACCESS_KEY = 'your-aws-secret-key';
   export const BUCKET_NAME = 'your-s3-bucket-name';
   ```

4. **Run the Project**:
   Start the development server using:

   ```bash
   npx expo start
   ```

   - Use the Expo Go app to scan the QR code and run the app on your device.
   - Alternatively, use an emulator for Android or iOS.

---

## 📂 Project Structure

```plaintext
WildDiscover/
├── api/                   # API integration files
├── components/            # Reusable UI components
├── screens/               # App screens (Home, Flora, Fauna, Landmark, Result, Offline Variants)
├── assets/                # Static assets (icons, images, offline model files)
├── context/               # Context providers (AppMode)
├── config/                # Configuration files (ignored in .gitignore)
├── App.js                 # Main app entry point
├── tfSetup.js             # TensorFlow model initializer
├── predictor.js           # Offline classifier using MobileNet
├── Upload.js              # AWS S3 upload logic
├── app.json               # Expo configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 📦 Required Libraries

These will be installed automatically with `npm install`.

### Core Dependencies

- `react`, `react-native`, `expo`
- `expo-image-picker`, `expo-file-system`, `expo-status-bar`, `expo-font`
- `@react-navigation/native`, `@react-navigation/stack`
- `@expo-google-fonts/poppins`, `react-native-vector-icons`
- `@tensorflow/tfjs`, `@tensorflow/tfjs-react-native`
- `@react-native-async-storage/async-storage`
- `uuid`, `axios`
- `aws-sdk`, `react-native-aws3`

### Development Dependencies

- `jest`, `axios-mock-adapter`

---

## 🚀 Usage

1. **Home Screen**:
   - Choose a category: Flora, Fauna, or Landmark.

2. **Capture or Upload an Image**:
   - Use your camera or select an image from your gallery.

3. **Analyze the Image**:
   - Depending on network availability and mode, the app will use either an online API or the offline MobileNet model.

4. **Auto-Save to History (Optional)**:
   - If enabled, the image will be saved to AWS S3 with metadata.

5. **Explore Further**:
   - Click the Wikipedia link or check the history.

---

## 📸 Screenshots

### Home Screen
<img src="./Images/Home.jpg" alt="Home Screen" width="300">

### Flora Identification
<img src="./Images/Flora.jpg" alt="Flora Identification" width="300">

### Fauna Identification
<img src="./Images/Fauna.jpg" alt="Fauna Identification" width="300">

### Landmark Identification
<img src="./Images/Landmark.jpg" alt="Landmark Identification" width="300">

---

## 🧰 Technologies Used

- **React Native** with **Expo** for cross-platform mobile development
- **TensorFlow.js (MobileNet)** for on-device image classification
- **AWS S3** for storing identification history
- **Google Vision / PlantNet / API Ninjas** for online identification APIs
- **Wikipedia API** for fetching entity descriptions

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

---
