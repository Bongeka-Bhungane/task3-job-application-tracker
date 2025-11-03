import React from "react";
import SignupForm from "../compontents/SignupForm";

export default function SignupPage() {
  return (
    <div>
      <div className="login-content-left">
        <SignupForm />
      </div>

      <div className="signup-content-right">
        <div className="right-logo">
          <img src="/src/assets/images/logo-white.png" alt="Logo" />
        </div>

        <div className="right-slogan">
          <h1>
            Every application is a step closer to your dream job — <br />
            track them with confidence.
          </h1>
        </div>
      </div>
    </div>
  );
}
