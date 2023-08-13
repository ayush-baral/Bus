import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import "./register.css";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null); // Track registration status

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      setRegistrationStatus("success"); // Set registration status to success
      navigate("/login");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      setRegistrationStatus("error"); // Set registration status to error
    }
  };

  useEffect(() => {
    let timer;
    if (registrationStatus === "error") {
      timer = setTimeout(() => {
        setRegistrationStatus(null); // Clear the registration status message after 3 seconds
      }, 3000);
    }
    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [registrationStatus]);

  return (
    <>
      <NavBar />
      <div className="register">
        <div className="rContainer">
          <input
            type="text"
            placeholder="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="text"
            placeholder="phone"
            id="phone"
            value={credentials.phone}
            onChange={handleChange}
            className="rInput"
          />
          <button disabled={loading} onClick={handleClick} className="rButton">
            Register
          </button>
          {registrationStatus === "success" && (
            <span>Registration successful!</span>
          )}
          {registrationStatus === "error" && (
            <span>Registration failed. Please try again.</span>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
