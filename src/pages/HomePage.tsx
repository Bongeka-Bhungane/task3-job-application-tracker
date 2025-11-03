import React from "react";
import HomeNav from "../compontents/HomeNav";
import Text from "../compontents/Text";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="main-page">
      <div className="home-nav">
        <HomeNav />
      </div>

      <div className="landing-content">
        <div className="main-left">
          <Text variant="h2" className="heading">
            Welcome to Job Application Tracker
          </Text>
          <Text variant="p" className="heading">
            your personal assistant for landing your dream job. <br />
            Stay organized, stay motivated, <br />
            and take control of your career journey!
          </Text>
          <div className="btn-group">
            <Link to="/register" className="home-nav-btn">
              Sign-up
            </Link>
            <Link to="/login" className="home-nav-btn">
              Log-in
            </Link>
          </div>
        </div>
        <div className="main-right">
          <img src="../assets/images/welcome-picture.png" alt="person holding a laptop" />
        </div>
      </div>
    </div>
  );
}
