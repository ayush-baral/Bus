import React from "react";

const About = () => {
  return (
    <div title={"About us - Hamro Bus"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://th.bing.com/th/id/OIP.LfLzHB1a4pesrTf9-4fX2QHaE3?pid=ImgDet&rs=1"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Hamro Bus is a web-based application designed to simplify the
            process of reserving and purchasing bus tickets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
