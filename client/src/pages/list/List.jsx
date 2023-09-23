import React, { useState } from "react";
import "./list.css";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Searchitem from "../../components/searchitem/Searchitem";
import useFetch from "../../hooks/useFetch";
import moment from "moment-timezone";

const List = () => {
  const location = useLocation();
  const [startCity, setStartCity] = useState(location.state?.sourceCity || "");
  const [destinationCity, setDestinationCity] = useState(
    location.state?.destinationCity || ""
  );

  // Parse date from location state or use the current date
  const initialDate = location.state?.date
    ? moment(location.state.date).toDate()
    : new Date();

  const [date, setDate] = useState(initialDate);
  const [openDate, setOpenDate] = useState(false);

  const { data, loading, error, reFetch } = useFetch(
    `/bus/buses?startCity=${startCity}&destinationCity=${destinationCity}&travelDate=${date}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <NavBar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listsearch">
            <h1 className="lsTitles">Search</h1>
            <div className="lsItem">
              <label> Source City</label>
              <input type="text" placeholder={startCity} />
            </div>
            <div className="lsItem">
              <label> Destination City</label>
              <input type="text" placeholder={destinationCity} />
            </div>
            <div className="lsItem">
              <label>Date</label>
              <span onClick={() => setOpenDate(!openDate)}>
                {moment(date).format("DD/MM/YYYY")}
              </span>
              {openDate && (
                <Calendar onChange={(date) => setDate(date)} minDate={new Date()} />
              )}
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listresult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data.length > 0 ? (
                  data.map((item) => (
                    <Searchitem item={{ ...item, departureDate: date }} key={item._id} />
                  ))
                ) : (
                  <p>No buses found</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

 export default List;
// import React, { useState } from "react";
// import "./list.css";
// import NavBar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import { useLocation } from "react-router-dom";
// import { format } from "date-fns";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Searchitem from "../../components/searchitem/Searchitem";
// import useFetch from "../../hooks/useFetch";
// import * as moment from "moment-timezone";

// const List = () => {
//   const location = useLocation();
//   const [startCity, setStartCity] = useState(location.state?.sourceCity || "");
//   const [destinationCity, setDestinationCity] = useState(
//     location.state?.destinationCity || ""
//   );
//   const [date, setDate] = useState(
//     moment(location.state?.date || new Date()).format("DD/MM/YYYY") ||
//       moment(new Date()).format("DD/MM/YYYY")
//   );
//   const [openDate, setOpenDate] = useState(false);

//   const { data, loading, error, reFetch } = useFetch(
//     `/bus/buses?startCity=${startCity}&destinationCity=${destinationCity}&travelDate=${
//       date || ""
//     }`
//   );

//   console.log(date);
//   const handleClick = () => {
//     reFetch();
//   };

//   return (
//     <div>
//       <NavBar />
//       <Header type="list" />
//       <div className="listContainer">
//         <div className="listWrapper">
//           <div className="listsearch">
//             <h1 className="lsTitles">Search</h1>
//             <div className="lsItem">
//               <label> Source City</label>
//               <input type="text" placeholder={startCity} />
//             </div>
//             <div className="lsItem">
//               <label> Destination City</label>
//               <input type="text" placeholder={destinationCity} />
//             </div>
//             <div className="lsItem">
//               <label>Date</label>
//               <span onClick={() => setOpenDate(!openDate)}>{`${moment(
//                 date
//               ).format("DD/MM/YYYY")}`}</span>
//               {openDate && (
//                 <Calendar
//                   onChange={(date) => setDate(date)}
//                   minDate={new Date()}
//                 />
//               )}
//             </div>
//             <button onClick={handleClick}>Search</button>
//           </div>
//           <div className="listresult">
//             {loading ? (
//               "Loading..."
//             ) : (
//               <>
//                 {data.length > 0 ? (
//                   data.map((item) => (
//                     <Searchitem
//                       item={{ ...item, departureDate: date }}
//                       key={item._id}
//                     />
//                   ))
//                 ) : (
//                   <p>No buses found</p>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;