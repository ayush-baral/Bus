import "./newBus.css";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { busInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";

const NewBus = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "project");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dnuomhfwl/image/upload",
            data
          );

          const { url } = uploadRes.data;
          console.log("Uploaded file URL:", url); // Add this console log
          return url;
        })
      );

      const newBus = {
        ...info,
        photos: list,
      };

      console.log("New Bus:", newBus);
      const response = await axios.post("/bus", newBus);
      console.log("Upload Response:", response.data);

      navigate("/bus"); // Navigate to the bus page after successful upload
    } catch (error) {
      console.error("Error:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New Bus</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {busInputs &&
                busInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id} // Update the name attribute
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                    />
                  </div>
                ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBus;
