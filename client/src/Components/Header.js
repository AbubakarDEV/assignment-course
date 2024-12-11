import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    setLoginStatus(isLoggedIn)
  }, [])
  return (
    <div className="header">
      <nav class="nav">
        <Link className="nav-link" to="/">
          Home
        </Link>
        {!loginStatus &&
          <Link className="nav-link" to="/login">
            Login
          </Link>
        }
        <Link className="nav-link" to="/courses">
          Courses
        </Link>
        <Link className="nav-link" to="/add-course">
          Add Courses
        </Link>
        <Link className="nav-link" to="/mypage">
          My Page
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
        {loginStatus &&
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        }
      </nav>
    </div>
  );
};

export default Header;
