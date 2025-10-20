import React, { useState } from "react";
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Navigate } from "react-router-dom";
// import Button from "./Button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goToJobs, setGoToJobs] = useState(false);

  if (goToJobs) {
    return <Navigate to="/jobs" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Login successful!");
        setEmail("");
        setPassword("");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form">
      <div className="form-header">
        <Text variant="p">Do not have an account?</Text>
        <Text variant="span" className="signup-link">
          Create one!!
        </Text>
      </div>

      <Text variant="h2" className="heading">
        Login
      </Text>

      <form className="signup-form"onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="form-input">
            <label htmlFor="email">
              <MdEmail className="text-blue-600 text-2xl" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">
              <RiLockPasswordLine />
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) =>
                setPassword((e.target as HTMLInputElement).value)
              }
              required
            />
          </div>
        </div>
        <button type="submit" onClick={() => setGoToJobs(true)}>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
