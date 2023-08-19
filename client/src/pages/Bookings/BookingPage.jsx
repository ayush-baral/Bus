import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookingPage() {
  const [booking, setBooking] = useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    const getBooking = async () => {
      const booking = await axios.get(`http://localhost:8800/api/book/${id}`);
      setBooking(booking.data);
    };
    if (id) {
      getBooking();
    }
  }, [id]);
  return (
    <div>
      <NavBar />
      <div>
        {booking?.length > 0 &&
          booking.map((booking) => {
            <div>{booking.seats}</div>;
          })}
      </div>
    </div>
  );
}
