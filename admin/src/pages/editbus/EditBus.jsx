import React, { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { editbusInputs } from "../../formSource";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBus = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/bus/find/${id}`)
      .then((result) => {
        console.log(result);
        setFormData(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditConfirmation = () => {
    // Show a confirmation SweetAlert2 before proceeding with the edit
    Swal.fire({
      title: "Confirm Edit",
      text: "Are you sure you want to edit this bus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the edit, proceed with the edit action
        handleEdit();
      }
    });
  };

  const handleEdit = () => {
    axios
      .put(`http://localhost:8800/api/bus/${id}`, formData)
      .then((result) => {
        console.log(result);
        navigate("/bus");
        // Show a success SweetAlert2 when the edit is successful
        Swal.fire({
          icon: "success",
          title: "Bus Updated",
          text: "The bus data has been successfully updated.",
        });
      })
      .catch((err) => {
        console.log("Error Updating the data ", err);
        // Show an error SweetAlert2 if the edit fails
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Bus data update failed. Please try again later.",
        });
      });
  };

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">Edit Bus</div>
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
              {isLoading ? (
                <div>Loading...</div>
              ) : (
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

                  {editbusInputs &&
                    editbusInputs.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          value={formData[input.id] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  <button type="button" onClick={handleEditConfirmation}>
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBus;
