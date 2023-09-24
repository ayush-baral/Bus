import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";

export default function BookingPage() {
  const { user } = React.useContext(AuthContext);
  console.log(user);
  const [bookings, setBookings] = useState([]);
  React.useEffect(() => {
    if(user?._id){
      const getBooking = async () => {
        const booking = await axios.get(
          `http://localhost:8800/api/book?userId=${user?._id || ""}`
        );
        setBookings(booking.data);
      };
      getBooking();
    }
  }, [user?._id]);
  return (
    <div>
      <NavBar />
      <div style={{ marginTop: "100px" }}>
        {bookings?.length > 0 &&
          bookings.map((booking) => {
            return <div>{booking.
              nameOfPassenger}</div>;
          })}
      </div>
    </div>
  );
}
