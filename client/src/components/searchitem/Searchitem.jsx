import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="searchItem">
      {item.photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Image ${index}`} className="sImg" />
      ))}
      <div className="sDesc">
        <h1>{item.name}</h1>
      </div>
      <div className="sType">
        <h1>{item.busType}</h1>
      </div>
      <div>
        {console.log(item)}
        <h1>{item.time}</h1>
      </div>
      <div className="sDeparture">
        <h1>{item.startCity}</h1>
      </div>
      <div className="sFeature">
        <h1>{item.destinationCity}</h1>
      </div>
      <div>
        <h1>{item.pricePerSeat}</h1>
      </div>
      <Link
        to={`/bus/${item._id}?date=${parseDate(
          item.departureDate
        ).toISOString()}&busId=${item._id}`}
      >
        <button className="siCheckButton">Reserve a Seat</button>
      </Link>
    </div>
  );
};

export default Searchitem;
