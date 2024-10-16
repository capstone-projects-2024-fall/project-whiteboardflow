import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { auth } from '../firebase';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

function Login() {
    const handleGoogleLoginSuccess = (response) => {
        const credential = GoogleAuthProvider.credential(response.credential);
        signInWithCredential(auth, credential)
            .then((result) => {
                console.log('User logged in:', result.user);
            })
            .catch((error) => console.error('Login failed:', error));
    };

    return (
        <GoogleOAuthProvider clientId="86154437771-hspemdt0smpqrj49rnaah6vrvol1rjds.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.log('Login Failed')}
            />
        </GoogleOAuthProvider>
    );
}

export default Login;
