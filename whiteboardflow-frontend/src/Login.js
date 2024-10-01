import React from 'react';
import './Login.css'; // Ensure this CSS file exists

function Login() {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
