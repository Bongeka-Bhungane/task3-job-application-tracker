import React, { useState } from "react";
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Navigate } from "react-router-dom";

interface SignupFormProps {
  onSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [goToLogin, setGoToLogin] = useState(false);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 🔹 Check if user already exists
      const checkRes = await fetch(
        `http://localhost:5000/users?email=${email}`
      );
      const existing = await checkRes.json();

      if (existing.length > 0) {
        alert("Email already registered!");
        return;
      }

      const newUser = { name, surname, email, phone, password, jobs: [] };

      const createRes = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) {
        alert("Failed to register user.");
        return;
      }

      const user = await createRes.json(); // ← this has numeric `id`
      localStorage.setItem("user", JSON.stringify(user));

      alert("User registered successfully!");

      // ✅ only redirect AFTER success
      setGoToLogin(true);

      // reset form
      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
    } catch (error) {
      console.error("During registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="login-header">
        <Text variant="p">Already have an account?</Text>
        <Text variant="span" className="signup-link">
          Login!!
        </Text>
      </div>

      <Text variant="h2" className="login-heading">
        Signup
      </Text>

      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="name-surname">
            <div className="form-input">
              <label htmlFor="name">
                <MdEmail className="text-blue-600 text-2xl" />
              </label>
              <input
                type="text"
                placeholder="enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-input">
              <label htmlFor="surname">
                <MdEmail className="text-blue-600 text-2xl" />
              </label>
              <input
                type="text"
                placeholder="enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-input">
            <label htmlFor="email">
              <MdEmail className="text-blue-600 text-2xl" />
            </label>
            <input
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="phone">
              <MdEmail className="text-blue-600 text-2xl" />
            </label>
            <input
              type="text"
              placeholder="enter your cellphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">
              <RiLockPasswordLine />
            </label>
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* ✅ remove onClick, let handleSubmit control navigation */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupForm;
