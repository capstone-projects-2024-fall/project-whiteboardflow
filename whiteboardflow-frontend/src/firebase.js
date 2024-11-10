import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

/**
 * Firebase configuration settings, retrieved from environment variables for security.
 * @type {Object}
 * @property {string} apiKey - API key for Firebase.
 * @property {string} authDomain - Authentication domain for Firebase.
 * @property {string} projectId - Firebase project ID.
 * @property {string} storageBucket - Storage bucket for Firebase.
 * @property {string} messagingSenderId - Messaging sender ID for Firebase.
 * @property {string} appId - App ID for Firebase.
 */
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

/**
 * The Firebase app instance.
 * @type {import("firebase/app").FirebaseApp | undefined}
 */
let app;

try {
	// Initialize Firebase app
	app = initializeApp(firebaseConfig);
	console.log("Firebase initialized successfully");
} catch (error) {
	console.error("Firebase initialization error:", error);
}

/**
 * Firebase authentication instance.
 * @type {import("firebase/auth").Auth}
 */
const auth = getAuth(app);

/**
 * Google Authentication provider for Firebase.
 * @type {import("firebase/auth").GoogleAuthProvider}
 */
const provider = new GoogleAuthProvider();

/**
 * Retrieves the ID token for the currently authenticated user.
 *
 * @async
 * @function getIdToken
 * @returns {Promise<string>} The ID token of the signed-in user.
 * @throws Will throw an error if no user is signed in.
 */
async function getIdToken() {
	const user = auth.currentUser;
	if (user) {
		const idToken = await user.getIdToken();
		return idToken;
	} else {
		throw new Error("No user is signed in");
	}
}

// Exports
export { auth, provider, signInWithPopup, signOut, getIdToken };
export default app;
