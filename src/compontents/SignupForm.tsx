import React from 'react'
import Text from "./Text";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "./Button";

export default function SignupForm() {
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
          <div className="form-input">
            <label htmlFor="email">
              <MdEmail className="text-blue-600 text-2xl" />
            </label>
            <input type="email" placeholder="enter your email" />
          </div>
          <div className="form-input">
            <label htmlFor="phone">
              <MdEmail className="text-blue-600 text-2xl" />
            </label>
            <input type="email" placeholder="enter your cellphone" />
          </div>
          <div className="form-input">
            <label htmlFor="password">
              <RiLockPasswordLine />
            </label>
            <input type="password" placeholder="enter your password" />
          </div>
        </div>

        <Button
          name="Register"
          backgroundColor="#709176"
          color="white"
          className="btn"
        />
      </form>
    </div>
  );
}
