import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore"

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
const qdb = getFirestore(app);

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

async function userHistoryWrite(userId, sessionId, questionId, completeionTime, transcript, response) {
	await setDoc(doc(db, userId, sessionId), {
		sessionId: sessionId,
		questionID: questionId,
		completionTime: completeionTime,
		transcript: transcript,
		response: response
	});
}

async function getOneHistory(userId, sessionId) {

	const docRef = doc(db, userId, sessionId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log("Document data:", docSnap.data());
		return docSnap.data();
	} else {
		// docSnap.data() will be undefined in this case
		// console.log("No such document!");
	}

}

async function getOneQuestion(questionId) {

	const docRef = doc(qdb, "questions", questionId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log("Document data:", docSnap.data());
		return docSnap.data()
	} else {
		// docSnap.data() will be undefined in this case
		// console.log("No such document!");
	}
}



async function testWrite() {
	await setDoc(doc(db, "user_history", 'test'), {
		test: "hi"
	});
}

async function getAllHistory() {

	// console.log(auth.currentUser.uid)

	const querySnapshot = await getDocs(collection(db, auth.currentUser.uid));

		// doc.data() is never undefined for query doc snapshots
		return querySnapshot.docs.map(doc => doc.data());

}


export { auth, provider, signInWithPopup, signOut, getIdToken, testWrite, userHistoryWrite, getOneHistory, getOneQuestion, getAllHistory }; // Make sure signOut is exported
export default app;
