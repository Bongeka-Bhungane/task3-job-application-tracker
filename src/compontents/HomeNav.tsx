import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <img src="/src/assets/images/logo navy.png" alt="Logo" />
      </div>

      {/* Center: Links */}
      <div className="navbar-links">
        <Link to="/" className="home-nav-btn">
          Home |
        </Link>
        <Link to="/register" className="home-nav-btn">
          Sign-up |
        </Link>
        <Link to="/login" className="home-nav-btn">
          Log-in |
        </Link>
      </div>

      <Link to="login" className="home-user-circle">
        <FaRegUser />
      </Link>
    </nav>
  );
}
