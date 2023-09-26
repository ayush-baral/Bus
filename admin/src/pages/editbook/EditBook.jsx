import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { editbookInputs } from "../../formSource";
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
      .get(`http://localhost:8800/api/book/${id}`)
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

 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8800/api/book/${id}`, formData)
      .then((result) => {
        console.log(result);
        navigate("/book");
      })
      .catch((err) => {
        console.log("Error Updating the data ", err);
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
            <div className="right">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {editbookInputs &&
                    editbookInputs.map((input) => (
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
                  <button type="submit">Update</button>
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
