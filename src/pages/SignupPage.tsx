import React from "react";
import SignupForm from "../compontents/SignupForm";


export default function SignupPage() {
  return (
    <div>
      <div className="login-content-left">
        <SignupForm />
      </div>
      <div className="login-content-right">right</div>
    </div>
  );
}
