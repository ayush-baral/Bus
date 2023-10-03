import React, { useState, useEffect } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import "./searchitem.css";
import { parse } from "date-fns";
import * as moment from "moment-timezone";

export function parseDate(dateString) {
  if (typeof dateString === "object") {
    dateString = moment(dateString).format("DD/MM/YYYY").toString();
  }
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
}

const Searchitem = ({ item }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const openModal = (photo, index) => {
    setSelectedPhotoIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhotoIndex(0);
    setModalOpen(false);
  };

  const handleModalClose = () => {
    closeModal();
    navigate("/bus");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (
      event.key === "ArrowRight" &&
      selectedPhotoIndex < item.photos.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    } else if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, selectedPhotoIndex]);

  return (
    <div className="searchItem">
      {item.photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Image ${index}`}
          className="sImg"
          onClick={() => openModal(photo, index)}
        />
      ))}
      <div className="sDesc">
        <p>{item.name}</p>
      </div>
      <div className="sType">
        <p>{item.busType}</p>
      </div>
      <div>
        <p>{item.time}</p>
      </div>
      <div className="sDeparture">
        <p>{item.startCity}</p>
      </div>
      <div className="sFeature">
        <p>{item.destinationCity}</p>
      </div>
      <div>
        <p>{item.pricePerSeat}</p>
      </div>
      <Link
        to={`/bus/${item._id}?date=${parseDate(
          item.departureDate
        ).toISOString()}&busId=${item._id}`}
      >
        <button className="siCheckButton">Reserve a Seat</button>
      </Link>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <img
              src={item.photos[selectedPhotoIndex]}
              alt={`Image ${selectedPhotoIndex}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchitem;
