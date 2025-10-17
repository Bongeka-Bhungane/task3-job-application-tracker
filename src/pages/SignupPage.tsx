import React from "react";
import SignupForm from "../compontents/SignupForm";


export default function SignupPage() {
  const handleSignup = () => {
    // handle signup completion (e.g., navigate, show message, etc.)
  };

  return (
    <div>
      <div className="login-content-left">
        <SignupForm onSignup={handleSignup} />
      </div>
      <div className="login-content-right">right</div>
    </div>
  );
}
