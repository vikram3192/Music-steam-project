import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase-config';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ emailOrMobile: '', password: '' });
  const [loading, setLoading] = useState(false); 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailOrMobile, password } = formData;

    setLoading(true); 
    try {
      await signInWithEmailAndPassword(auth, emailOrMobile, password);

      alert('Login successful!');
      window.location.href = './main.html';
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email. Please check your credentials.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='login'>
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            className="imglogo"
            alt="Spotify Logo"
          />

          <h2>Sign in</h2>

          <div className="input-group">
            <label id='label-email'>Email or Mobile Number</label>
            <input
              className='inputs'
              type="text"
              name="emailOrMobile"
              placeholder="Email/Mobile Number"
              required
              onChange={handleChange}
              disabled={loading} 
            />
          </div>

          <div className="input-group">
            <label id='label-pass'>Password</label>
            <input
              className='inputs'
              type="password" 
              name="password"
              placeholder="Password"
              required
              minLength="8"
              onChange={handleChange}
              disabled={loading} 
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Signed in....' : 'Sign in'}
          </button>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </form>
      </div>

      <div className="image">
        <img src="./image_1.jpg" alt="image" />
      </div>
    </div>
  );
};

export default Login;
