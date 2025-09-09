import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Placeholder for future API integration
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // const data = await response.json();
    // if (data.token) {
    //   localStorage.setItem('token', data.token);
    //   navigate('/');
    // } else {
    //   alert('Login failed');
    // }
    
    // Temporary mock login for testing
    if (email === "test@test.com" && password === "123456") {
      localStorage.setItem("token", "fake-jwt-token-123");
      navigate("/overview");
    } else {
      alert("Invalid credentials! Try test@test.com / 123456");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-circle">
              <span className="logo-text">CC</span>
            </div>
          </div>
          <h1 className="login-brand">Code Clear</h1>
          <h2 className="login-title">Welcome Back, ER Admin!</h2>
        </div>

        <div className="login-body">
          <div className="form-group">
            <label className="input-label">Username/ Email</label>
            <input
              type="email"
              placeholder="write your username here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="write your Password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
          </div>
        </div>

        <div className="login-footer">
          <button className="btn-login" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;