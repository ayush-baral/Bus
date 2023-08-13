import React from "react";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import NavBar from "../../components/navbar/Navbar";
const Contact = () => {
  return (
    <>
      {" "}
      <NavBar />
      <div title={"Contact us"}>
        <div className=" contactus ">
          <div className="col-md-6 ">
            <img
              src="https://th.bing.com/th/id/OIP.A1iOPDDIdy-XyDRj75WkVQHaEo?pid=ImgDet&rs=1"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              any query and info about ticket booking feel free to call anytime
              we are avaialible 24X7
            </p>
            <p className="mt-3">
              <BiMailSend /> : www.hamrobus@gmail.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 012-3456789
            </p>
            {/* <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p> */}
          </div>
        </div>
      </div>
      );
    </>
  );
};

export default Contact;
