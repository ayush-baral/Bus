import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/Authcontext";

function NavBar() {
  const { user, dispatch } = useContext(AuthContext);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch({ type: "LOGOUT" });
      // Perform any additional logout logic if needed
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Hamro Bus
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-links">Welcome, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/register"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
