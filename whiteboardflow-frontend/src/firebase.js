import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID

};

let app;

try {
	app = initializeApp(firebaseConfig);
	console.log("Firebase initialized successfully");
} catch (error) {
	console.error("Firebase initialization error:", error);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

console.log(db)


async function getIdToken() {
	const user = auth.currentUser;
	if (user) {
		const idToken = await user.getIdToken();
		return idToken;
	} else {
		throw new Error("No user is signed in");
	}
}

async function testWrite() {
	await setDoc(doc(db, "cities/NA", "PHI"), {
		name: "Philadelphia",
		state: "PA",
		country: "USA"
	});
}


export { auth, provider, signInWithPopup, signOut, getIdToken, testWrite }; // Make sure signOut is exported
export default app;
