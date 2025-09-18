import React, { useState } from 'react'
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
// import Button from "./Button";

const SignupForm: React.FC = () =>  {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = { name, surname, email, phone, password };
        try {
            const response = await fetch("http://localhost:5000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newUser),
            });
            if (response.ok) {
                const data = await response.json();
                alert ('User registered successfully!');
                setName('');
                setSurname('');
                setEmail('');
                setPhone('');
                setPassword('');
            } else {
                alert('Failed to register user.');
            }
        } catch (error) {
            console.error('During registration:', error);
            alert('An error occurred. Please try again.');
        }
    }; // <-- Add this closing brace for handleSubmit

  return (
    <div>
      <div className="login-header">
        <Text variant="p">Do not have an account?</Text>
        <Text variant="p" className="signup-link">
          Create one
        </Text>
      </div>

      <Text variant="h2" className="login-heading">
        Login
      </Text>

      <form action="">
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
              type="cellphone"
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
        <button onClick={handleSubmit}>sign in</button>
      </form>
      {/* <Button
        name="Register"
        backgroundColor="#709176"
        color="white"
        className="btn"
        onClick={handleSubmit}
        type="submit"
      /> */}
    </div>
  );
}   

export default SignupForm;