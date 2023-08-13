import React from "react";
import "./busfeatures.css";
const Busfeatures = () => {
  return (
    <div className="bList">
      <div className="bListItem">
        <img
          src="https://bussewa.com/customer/bussewaUpload/namaste_kapilvastu_1575875010943_1582133227319.jpg"
          alt=""
          className="bListImg"
        />
        <div className="bListTitles">
          <h1>Namaste Deluxe</h1>
          <h2>Air Suspension Semi Sleeper Bus</h2>
        </div>
      </div>
      <div className="bListItem">
        <img
          src="https://bussewa.com/customer/bussewaUpload/viber_image_2023-04-19_15-20-30-514_1681897514702.jpg"
          alt=""
          className="bListImg"
        />
        <div className="bListTitles">
          <h1>Dhoggare Deluxe</h1>
          <h2>VIP Sofa Seater Bus</h2>
        </div>
      </div>
      <div className="bListItem">
        <img
          src="https://bussewa.com/customer/bussewaUpload/viber_image_2023-04-19_15-20-30-514_1681897255434.jpg"
          alt=""
          className="bListImg"
        />
        <div className="bListTitles">
          <h1>Darsan Deluxe</h1>
          <h2>Tourist Bus</h2>
        </div>
      </div>
    </div>
  );
};
export default Busfeatures;
