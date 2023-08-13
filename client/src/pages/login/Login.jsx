import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import "./login.css";
import Footer from "../../components/footer/Footer";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(null); // Track login status

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const queryParams = new URLSearchParams(window.location.search);
  const busId = queryParams.get("busId");
  const selectedSeats = queryParams.get("selectedSeats");

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setLoginStatus("success"); // Set login status to success
      if(busId){
        navigate(`/bus/${busId}?selectedSeats=${selectedSeats}`)
      }else{
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setLoginStatus("error"); // Set login status to error
    }
  };

  useEffect(() => {
    let timer;
    if (loginStatus) {
      timer = setTimeout(() => {
        setLoginStatus(null); // Clear the login status message after 3 seconds
      }, 3000);
    }
    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [loginStatus]);

  return (
    <>
      <NavBar />
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
          {loginStatus === "success" && <span>Login successful!</span>}
          {loginStatus === "error" && (
            <span>Login failed. Please try again.</span>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
