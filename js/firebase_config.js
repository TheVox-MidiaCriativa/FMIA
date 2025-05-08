// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiWaekm6o3xjDWRBR310a3B-o0w2x6v_4",
  authDomain: "fmia-thevox.firebaseapp.com",
  projectId: "fmia-thevox",
  storageBucket: "fmia-thevox.firebasestorage.app",
  messagingSenderId: "666880260954",
  appId: "1:666880260954:web:ba9e3e34f25dae6c0c5163",
  measurementId: "G-C6BZSMH1E1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Export a function to get the initialized app instance
let app;
export const getFirebaseApp = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    // Initialize other services like Analytics, Auth, Firestore here if needed
    // For example, to initialize Analytics:
    // getAnalytics(app);
  }
  return app;
};

