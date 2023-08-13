import React from "react";
import "./toptravelled.css";
import { useNavigate } from "react-router-dom";

const Toptravelled = () => {

  const navigate = useNavigate();
  const mostTravelledPlaces = [{
    name: "mustang",
    image: "https://media.gettyimages.com/id/587373013/photo/tetang-village-from-above.jpg?s=1024x1024&w=gi&k=20&c=W0eWPrziJbuGzIaDwOSNgM8vNKvw9BBR2p71H_4cs14="
  }, {
    name: "pokhara",
    image: "https://media.gettyimages.com/id/641959716/photo/ghandruk-village.jpg?s=1024x1024&w=gi&k=20&c=Y3fUMVcte9oZic_OMZXctvVI35qPC2lkEG-iMiHG_qg="
  }, {
    name: "kathmandu",
    image: "https://media.gettyimages.com/id/637030542/photo/kathmandu-crowds-of-people-outside-temples-patan-durbar-square-nepal.jpg?s=1024x1024&w=gi&k=20&c=qolAwXltMkVXAhD6-xsR-dzJXHarwx-BcCf0TX31EP0="
  }]

  return (
    <div className="toptravelled">
      <>
      {
        mostTravelledPlaces.map(place => {
          return <div className="toptravelledItem"  onClick={() => navigate("/bus", { state: { sourceCity: place.name, destinationCity: "", date: "" } })}>
          <img
            src={place.image}
            alt=""
            className="toptravelledImg"
          />
          <div className="toptravelledTitles">
            <h1>Buses From</h1>
            <h2>{place.name.toUpperCase()}</h2>
          </div>
        </div>
        })
      }
      </>
    </div>
  );
};

export default Toptravelled;
