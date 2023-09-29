import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate, useParams } from "react-router-dom";
import "./login.scss";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const queryParams = new URLSearchParams(window.location.search);
  const busId = queryParams.get("busId");
  const selectedSeats = queryParams.get("selectedSeats");
  const date = queryParams.get("date");

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

      // Display a success message using SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have been successfully logged in.",
      });

      if (busId) {
        navigate(`/bus/${busId}?selectedSeats=${selectedSeats}&date=${date}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Login failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default Login;
