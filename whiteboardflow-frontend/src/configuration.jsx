// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";

// Your Firebase config here
const firebaseConfig = {
  apiKey: process.env.DB_API_KEY,
  authDomain: "whiteboardassistant.firebaseapp.com",
  projectId: "whiteboardassistant",
  storageBucket: "whiteboardassistant.appspot.com",
  messagingSenderId: "313231108308",
  appId: "1:313231108308:web:5bb43d6b0ff6b802fdb341"
};

// Initialize Firebase
 const cong = initializeApp(firebaseConfig);

  export default cong;
// Now you can use Firebase services in your React app!