import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAHSgatn-IUZ6Eg084aC6NMfEgy-7qzqbE",
    authDomain: "whiteboardassistant.firebaseapp.com",
    databaseURL: "https://whiteboardassistant-default-rtdb.firebaseio.com",
    projectId: "whiteboardassistant",
    storageBucket: "whiteboardassistant.appspot.com",
    messagingSenderId: "313231108308",
    appId: "1:313231108308:web:5bb43d6b0ff6b802fdb341",
    measurementId: "G-PLPD6Q8WPC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
