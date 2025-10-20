import React from 'react'
import LoginForm from '../compontents/LoginForm'

export default function LoginPage() {
  return (
    <div className="signup-page">
      <div className="signup-content-left">
        <LoginForm />
      </div>
      <div className="signup-content-right">
        <div className="right-logo">
          <img src="/src/assets/images/logo-white.png" alt="Logo" />
        </div>
        <div className="right-slogan">
          <h1>From applied to hired — <br /> keep every step in check.</h1>
        </div>
      </div>
    </div>
  );
}
