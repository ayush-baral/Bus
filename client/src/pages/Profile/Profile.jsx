import React, { Fragment, useEffect, useState } from "react";
//import { Fragment } from "react";
//import { userAlert } from 'react-alert';
import "./Profile.scss";
import axios from "axios";
import NavBar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("camera.jpeg");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconDark, setEyeIconDark] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const { id } = useParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeIconDark(!eyeIconDark);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const phonePattern = /^[9]\d{9}$/;

    if (phonePattern.test(inputValue)) {
      setPhone(inputValue);
      setIsValidPhone(true);
    } else {
      setPhone(inputValue);
      setIsValidPhone(false);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/users/${id}`)
      .then((result) => {
        const userData = result.data;
        setName(userData.name);
        setEmail(userData.email);
        setPassword(userData.password);
        setPhone(userData.phno);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <NavBar />
      <div>
        <div className="wrapper">
          <form className="shadow-lg" encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <label htmlFor="avatarInput">
                      <img
                        src={avatarUrl}
                        className="rounded-circle avatar-image"
                        alt="Avatar Preview"
                      />
                    </label>
                    <input
                      type="file"
                      id="avatarInput"
                      className="d-none"
                      name="avatar"
                      onChange={handleAvatarChange}
                    />
                  </figure>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label for="email_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group password-input">
              <label htmlFor="password_field">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div className="input-group-append">
                  <span
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    <img
                      className={eyeIconDark ? "eye-icon dark" : "eye-icon"}
                      src="eye.png"
                      alt=""
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phoneno_field">Phone Number</label>
              <input
                type="tel"
                id="phoneno_field"
                className={`form-control ${
                  isValidPhone ? "valid-phone" : "invalid-phone"
                }`}
                name="phno"
                value={phone}
                onChange={handlePhoneChange}
              />
              {!isValidPhone && (
                <div className="error-message">Invalid phone number.</div>
              )}
            </div>

            <div className="update">
              <button type="submit" className="button">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Profile;
