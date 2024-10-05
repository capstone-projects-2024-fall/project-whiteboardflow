import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase'; // Import Firebase config
import { getFirestore, setDoc, doc } from 'firebase/firestore'; // Firestore functions

const db = getFirestore(); // Initialize Firestore

/**
 * Login component that handles Google authentication and saves user information to Firebase Firestore.
 * @component
 */
function Login() {
    const [error, setError] = useState(null);

    /**
     * Handles Google Login using Firebase Authentication.
     * If login is successful, the user's information is saved to Firestore.
     * @async
     * @function handleGoogleLogin
     * @throws Will throw an error if authentication fails.
     */
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Save user ID to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName
            });

            console.log('User logged in:', user);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    );
}

export default Login;
