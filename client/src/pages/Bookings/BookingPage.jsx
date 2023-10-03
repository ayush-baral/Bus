import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import "./BookingPage.css"; // Import the CSS file

export default function BookingPage() {
  const { user } = React.useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  React.useEffect(() => {
    if (user?._id) {
      const getBooking = async () => {
        const booking = await axios.get(
          `http://localhost:8800/api/book?userId=${user?._id || ""}`
        );
        setBookings(booking.data);
      };
      getBooking();
    }
  }, [user?._id]);

  const handlePrintTicket = (bookingId) => {
    // Implement your logic to handle printing the ticket for the given bookingId
    // You can open a new window/tab or trigger a print dialog here
  };

  return (
    <div>
      <NavBar />
      <div className="booking-container">
        {" "}
        {/* Apply a CSS class for styling */}
        <table className="booking-table">
          {" "}
          {/* Apply a CSS class for styling */}
          <thead>
            <tr>
              <th>Bus Type</th>
              <th>Seat No</th>
              <th>Start City</th>
              <th>Destination City</th>
              <th>Boarding Time</th>
              <th>Boarding Point</th>
              <th>Fare</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length > 0 &&
              bookings.map((booking) => {
                return (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.seats}</td>
                    <td>{booking.startCity}</td>
                    <td>{booking.destinationCity}</td>
                    <td>{booking.time}</td>
                    <td>{booking.boardingPoint}</td>
                    <td>{booking.price}</td>
                    <td>
                      <button
                        className="print-button"
                        // onClick={() => handlePrintTicket(booking._id)}
                      >
                        Print Ticket
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
