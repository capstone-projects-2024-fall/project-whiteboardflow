import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth } from '../firebase';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

/**
 * The `Login` component provides a Google OAuth login interface using Firebase.
 *
 * @component
 * @returns {JSX.Element} The rendered login component.
 */
function Login() {
    /**
     * Handles successful Google login and signs in the user with Firebase using the received credential.
     *
     * @param {object} response - The response object returned from Google login.
     * @param {string} response.credential - The credential token returned from Google.
     */
    const handleGoogleLoginSuccess = (response) => {
        if (response.credential) {
            const credential = GoogleAuthProvider.credential(response.credential);
            signInWithCredential(auth, credential)
                .then((result) => {
                    console.log('User logged in:', result.user);
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                });
        } else {
            console.error('No credential received:', response);
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={() => console.log('Login Failed')}
                />
            </GoogleOAuthProvider>
        </div>
    );
}

export default Login;
