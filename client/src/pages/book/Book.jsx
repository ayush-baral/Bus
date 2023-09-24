import React, { useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { AuthContext } from "../../context/Authcontext";
import "./book.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as moment from "moment-timezone";
// import { PDFDownloadLink, Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const Book = () => {
  const { user } = React.useContext(AuthContext);
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

  const bookBus = async (e) => {
    e.preventDefault();
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
      name:busDetails?.name,
    });
  };
  const getBook = async () => {
    const response = await axios.post(
      "http://localhost:8800/api/book/getBook",
      {}
    );
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
            <button onClick={(e) => bookBus(e)}>Proceed to Confirmation</button>
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
