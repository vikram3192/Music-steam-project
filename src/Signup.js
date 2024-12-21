import React, { useState } from 'react';
import { auth, db } from './firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; 
import './Signup.css';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', reEnterPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password, reEnterPassword } = formData;


    if (password !== reEnterPassword) {
      alert('Passwords do not match.');
      return;
    }


    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        uid: user.uid,
      });

      alert(`Sign-up successful! Welcome, ${username}.`);
      navigate("/login"); 
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use. Please try another email address.');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak. Please choose a stronger password.');
      } else {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='signup'>
      <div className="form-containers">
        <form onSubmit={handleSignup} className='form'>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
            className="logo"
            alt="Spotify Logo"
          />
          <h3>Sign up</h3>

          <div className="input-group">
            <label id='label-user'>Username</label>
            <input
              className='inputs'
              type="text"
              name="username"
              placeholder="Username" 
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label id='label-email'>Email</label>
            <input
              className='inputs'
              type="email"
              name="email"
              placeholder="Email" 
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label id='label-pass'>Password</label>
            <input
              className='inputs'
              type="password" 
              name="password"
              placeholder="Password (at least 8 characters)" 
              required
              minLength="8"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label id='label-re-enter'>Re-enter password</label>
            <input
              className='inputs'
              type="password" 
              name="reEnterPassword"
              placeholder="Re-enter Password" 
              required
              minLength="8"
              onChange={handleChange}
            />
          </div>
          
          <button className='button' type="submit">
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </form>
      </div>

      <div className="image">
        <img src="./image_1.jpg" alt="image" />
      </div>
    </div>
  );
};

export default Signup;
