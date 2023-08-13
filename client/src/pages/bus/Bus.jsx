import React, { useContext, useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import "./bus.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";

const BusSeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleSeatClick = (seatNumber) => {
    console.log(seatNumber)
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const queryParams = new URLSearchParams(window.location.search);
  const seatsFromQuery = queryParams.get("selectedSeats");
  console.log(seatsFromQuery)
  React.useEffect(() => {
    if(seatsFromQuery && seatsFromQuery.length){
      setSelectedSeats(seatsFromQuery.split(","))
    }
  }, [])
  const handleClearSelection = () => {
    setSelectedSeats([]);
  };
  const handleClick = () => {
    if(!selectedSeats.length){
      return alert("Select seats to continue booking.")
    }
    console.log(user)
    if (user?.user) {
      navigate("/book", { state: {...bus, selectedSeats} });
    } else {
      navigate(`/login?busId=${bus._id}&selectedSeats=${selectedSeats}`);
    }
  };
  const calculateTotalAmount = () => {
    const seatPrice = bus?.pricePerSeat || 0;
    return selectedSeats.length * seatPrice;
  };

  const renderSeats = (startRow, endRow) => {
    const seats = [];
    for (let row = startRow; row <= endRow; row++) {
      const rowSeats = [];
      for (let seatNumber = 1; seatNumber <= 2; seatNumber++) {
        const seatId = `${row}-${seatNumber}`;
        const isSelected = selectedSeats.includes(seatId);

        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${isSelected ? "selected" : ""}`}
            onClick={() => handleSeatClick(seatId)}
          >
            {/* No content */}
          </div>
        );
      }
      seats.push(
        <div key={`row-${row}`} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  const [bus, setBus] = React.useState(null);
  const [showBoardingPoint, setShowBoradingPoint] = React.useState(false);

  const {id} = useParams();

  React.useEffect(() => {
    const getBus = async () => {
      const bus = await axios.get(`http://localhost:8800/api/bus/find/${id}`);
      setBus(bus.data)
    }
    if(id){
      getBus()
    }
  }, [id])

  console.log(bus)
  return (
    <div className="contactus">
      <div className="bus-seat-container">
        <NavBar />
        <div className="bus-seat-selection">
          <h2>Select Your Seats</h2>
          <div className="bus-layout">
            <div className="seat-column">{renderSeats(1, 8)}</div>
            <div className="seat-column">{renderSeats(9, 16)}</div>
            <div className="selected-seats">
              <h3>Selected Seats:{selectedSeats.join(", ")}</h3>
              <p>Total Price: Rs{calculateTotalAmount()}</p>
              <button onClick={handleClick} className="pButton">
                Continue booking
              </button>
            </div>
          </div>
          <div className="clearbuttons">
            <button className="clearButton" onClick={handleClearSelection}>
              Clear Selection
            </button>
            <button className="BoardingButton" onClick={() => {setShowBoradingPoint(true)}}>
              Boarding Points
            </button>
          </div>
        </div>
        {showBoardingPoint &&  <div>
          {
            bus?.boardingPoints.length ? bus.boardingPoints.map(point => <p>{point}</p>): <p>No boarding points</p>
          }
        </div>
        } 
       
      </div>
    </div>
  );
};

export default BusSeatSelection;
