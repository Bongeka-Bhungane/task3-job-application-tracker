import React, { useState} from "react";
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Navigate } from "react-router-dom";
// import Button from "./Button";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [goToHome, setGoToHome] = useState(false);

    if (goToHome) {
        return <Navigate to="/home" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const user = { email, password };

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                setEmail('');
                setPassword('');
            } else {
                alert('Login failed. Please check your credentials.');
            }

        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-form">
            <div className="login-header">
                <Text variant="p">Do not have an account?</Text>
                <Text variant="p" className="signup-link">
                    Create one
                </Text>
            </div>

            <Text variant="h2" className="login-heading">
                Login
            </Text>

            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <div className="form-input">
                        <label htmlFor="email">
                            <MdEmail className="text-blue-600 text-2xl" />
                        </label>
                        <input
                            type="email"
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
                            placeholder="enter your password"
                            value={password}
                            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit"
                onClick={() => setGoToHome(true)}
                >login</button>
                {/* <Button
                name="Login"
                backgroundColor="#709176"
                color="white"
                className="btn"
                /> */}
            </form>
        </div>
    );
}

export default LoginForm;
