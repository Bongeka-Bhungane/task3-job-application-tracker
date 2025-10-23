import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  name: string;
  surname: string;
  email: string;
}

export default function NavBar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const initials = user
    ? `${user.name?.[0] ?? ""}${user.surname?.[0] ?? ""}`.toUpperCase()
    : "?";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <img src="/src/assets/images/logo-white.png" alt="Logo" />
      </div>

      {/* Center: Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-btn">
          Home
        </Link>
        <Link to="/jobs" className="nav-btn">
          Jobs
        </Link>
        <button className="nav-btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Right: User initials */}
      <div className="user-circle">{initials}</div>
    </nav>
  );
}
