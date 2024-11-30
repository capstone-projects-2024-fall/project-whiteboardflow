import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
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
const db = getFirestore(app, 'userhistory');

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

async function userHistoryWrite(userId, sessionId, questionId, completeionTime, response) {
	await setDoc(doc(db, userId, sessionId), {
		sessionId: sessionId,
		questionID: questionId,
		completeionTime: completeionTime,
		response: response
	});
}

async function testWrite() {
	await setDoc(doc(db, "user_history", 'test'), {
		test: "hi"
	});
}


export { auth, provider, signInWithPopup, signOut, getIdToken, testWrite, userHistoryWrite }; // Make sure signOut is exported
export default app;
