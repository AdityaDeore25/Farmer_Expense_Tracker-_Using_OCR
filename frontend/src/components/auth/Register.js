// src/components/auth/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Using shared styles

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  return (
    <div className="auth-container">
      <div className="auth-image-side" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80')"}}>
        <h1>Join Krishi-Dhan</h1>
        <p>Start tracking your farm investments today.</p>
      </div>
      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join our community of smart farmers</p>
          <form>
            <div className="auth-input-group">
              <label>Full Name</label>
              <input type="text" placeholder="Farmer Name" required />
            </div>
            <div className="auth-input-group">
              <label>Email Address</label>
              <input type="email" placeholder="email@farm.com" required />
            </div>
            <div className="auth-input-group">
              <label>Password</label>
              <input type="password" placeholder="Create password" required />
            </div>
            <button type="submit" className="auth-btn">Register</button>
          </form>
          <div className="auth-footer">
            Already a member? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;