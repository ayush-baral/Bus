import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState(new Date());
  // const onchange = (date) => {
  //   setDate(date);
  // };
  const [buses, setBuses] = useState([])

  React.useEffect(() => {
    console.log(sourceCity)
    const fetchBus = async () => {
      const buses = await axios.get(`http://localhost:8800/api/bus/buses?startCity=${sourceCity || ""}&destinationCity=${destinationCity || ""}`);
      console.log(buses);
      setBuses(buses.data)
    }
    // setBuses(buses)
      fetchBus()
  }, [sourceCity, destinationCity])
  const navigate = useNavigate();
  const handleSearch = () => {
    if (sourceCity && destinationCity) {
      navigate("/bus", { state: { sourceCity, destinationCity, date } });
    } else {
      alert("Please enter both source and destination cities.");
    }
  };
  return (
    <div className="header">
      <div className="headerList">
        {type !== "list" && (
          <div>
            <h1>Book your journey now with the bus platform Hamro Bus</h1>
        
            <div className="headerListItem">
              <FontAwesomeIcon icon={faBus} />
            </div>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  headerIcon
                  className="headerIcon"
                />
                <input
                  type="text"
                  placeholder="Source City"
                  className="headerSearchInput"
                  onChange={(e) => setSourceCity(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Destination City"
                  className="headerSearchInput"
                  onChange={(e) => setDestinationCity(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date, "MM/dd/yyyy")}`}</span>

                {openDate && (
                  <Calendar onChange={setDate} value={date} className="date" />
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerbtn"
                  onClick={handleSearch}
                  disabled={!sourceCity || !destinationCity}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
            <div>
              {buses.length > 0 && 
                buses.map(bus => {
                  return <div key={bus.id}>
                    <p>{bus.name}</p>
                    {/* <p>{bus.busNumber}</p> */}
                  </div>
                })
              }
            </div>
      </div>
    </div>
  );
};

export default Header;
