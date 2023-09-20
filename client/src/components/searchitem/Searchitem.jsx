import React from "react";
import { Link } from "react-router-dom";
import "./searchitem.css";
const Searchitem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="sImg" />
      <div className="sDesc">
        <h1>{item.name}</h1>
      </div>
      <div className="sType">
        <h1>{item.busType}</h1>
      </div>
      <div>
        {/* {console.log(item)} */}
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
        to={`/bus/${item._id}?date=${new Date(
          item.departureDate
        )
        .toISOString()
      }`}
      >
        <button className="siCheckButton">Reserve a Seat</button>
      </Link>
    </div>
  );
};

export default Searchitem;
