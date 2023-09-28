import React, { useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/Authcontext";
import "./book.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as moment from "moment-timezone";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = React.useState({
    name: "",
    email: "",
    phone: "",
    boardingPoint: "",
  });
  const location = useLocation();
  const busDetails = location.state;
  React.useEffect(() => {
    if (user) {
      setBookingDetails({
        ...bookingDetails,
        name: user.username,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const confirmBooking = () => {
    Swal.fire({
      icon: "question",
      title: "Confirm Booking",
      text: "Are you sure you want to book?",
      showCancelButton: true,
      confirmButtonText: "Yes, Book it!",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        bookBus();
      }
    });
  };

  const bookBus = async () => {
    try {
      const response = await axios.post("http://localhost:8800/api/book", {
        userId: user._id,
        busId: busDetails._id,
        boardingPoint: bookingDetails.boardingPoint,
        nameOfPassenger: bookingDetails.name,
        email: bookingDetails.email,
        phonenumber: bookingDetails.phone,
        seats: busDetails?.selectedSeats,
        price: busDetails?.selectedSeats?.length * busDetails?.pricePerSeat,
        date: busDetails?.departureDate,
        time: busDetails?.time,
        name: busDetails?.name,
        destinationCity: busDetails?.destinationCity,
        startCity: busDetails?.startCity,
      });

      // If booking is successful, show a success SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your booking has been successfully completed.",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          // Optionally, you can redirect the user to another page or perform any other actions here.
        }
      });
    } catch (error) {
      // Handle booking errors here
      console.error("Booking failed:", error);

      // Show an error SweetAlert2 if booking fails
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Booking failed. Please try again later.",
      });
    }
  };

  return (
    <div>
      <NavBar />
      <Header type="list" />
      <div className="bookcontainer">
        <div className="bookwrapper">
          <div className="passengerdetails">
            <h1 className="pTitle">Passenger Details</h1>
            <div className="PassengerItems">
              <label>Name of Passenger</label>
              <input
                type="text"
                value={bookingDetails.name}
                onChange={(e) =>
                  setBookingDetails({ ...bookingDetails, name: e.target.value })
                }
              />
            </div>
            <div className="PassengerItems">
              <label>Email</label>
              <input
                type="email"
                value={bookingDetails.email}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="PassengerItems">
              <label>Mobile Number</label>
              <input
                type="text"
                value={bookingDetails.phone}
                onChange={(e) => {
                  setBookingDetails({
                    ...bookingDetails,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className="PassengerItems">
              <label>Boarding Points</label>
              {/* <input type="select" value={bookingDetails.boardingPoint} /> */}
              <Form.Select
                onChange={(e) => {
                  console.log(e.target.value);
                  setBookingDetails({
                    ...bookingDetails,
                    boardingPoint: e.target.value,
                  });
                }}
              >
                {busDetails?.boardingPoints.length > 0 &&
                  busDetails?.boardingPoints.map((bd) => (
                    <option value={bd}>{bd}</option>
                  ))}
              </Form.Select>
            </div>
            <button onClick={confirmBooking}>Proceed to Confirmation</button>
          </div>
          <div className="details">
            <div className="traveldetails">
              <h1 className="bookTitle">Travel Details</h1>
              <div className="travelItems">
                <label>
                  Departure Date :{" "}
                  {moment(busDetails?.departureDate).format("YYYY/MM/DD")}
                </label>
                <label>
                  Route : {busDetails?.startCity} -{" "}
                  {busDetails?.destinationCity}
                </label>
              </div>
              <div className="travelItems">
                <label>Seats : {busDetails?.selectedSeats.join(",")}</label>
              </div>

              <div className="travelItems">
                <label>Travel : {busDetails?.name}</label>
              </div>
            </div>
            <div className="paymentdetails">
              <h1 className="paymentitle">Payment Details</h1>
              <div className="paymentItem">
                <label>Per Ticket Cost: {busDetails?.pricePerSeat}</label>
              </div>
              <div className="paymentItem">
                <label>
                  Total Price:{" "}
                  {busDetails?.selectedSeats?.length * busDetails?.pricePerSeat}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
