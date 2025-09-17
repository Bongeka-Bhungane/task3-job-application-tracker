import React from "react";
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "./Button";

export default function LoginForm() {
  return (
    <div className="login-form">
      <div className="login-heading">
        <Text variant="p">Do not have an account?</Text>
        <Text variant="p" className="signup-link">
          Create one
        </Text>
      </div>

      <Text variant="h2" className="login-heading">
        Login
      </Text>

      <form action="">
        <div className="inputs">
          <label htmlFor="email">
            <MdEmail className="text-blue-600 text-2xl" />
          </label>
          <input type="email" placeholder="enter your email" />
        </div>
        <div className="inputs">
          <label htmlFor="password">
            <RiLockPasswordLine />
          </label>
          <input type="password" placeholder="enter your password" />
        </div>

        <Button
          name="Login"
          backgroundColor="#709176"
          color="white"
          className="btn"
        />
      </form>
    </div>
  );
}
