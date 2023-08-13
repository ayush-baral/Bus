export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];
export const busColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "busType",
    headerName: "Type",
    width: 100,
  },
  {
    field: "busNumber",
    headerName: "BusNumber",
    width: 230,
  },
  {
    field: "startCity",
    headerName: "Start City",
    width: 100,
  },
  {
    field: "destinationCity",
    headerName: " Destination City",
    width: 100,
  },
  {
    field: "totalSeats",
    headerName: "Total Seats",
    width: 100,
  },
  {
    field: "availableSeats",
    headerName: "Available Seats",
    width: 100,
  },
  {
    field: "pricePerSeat",
    headerName: "Price",
    width: 100,
  },
  {
    field: "phonenum",
    headerName: "Phone",
    width: 100,
  },

  {
    field: "features",
    headerName: "Features",
    width: 100,
  },
  {
    field: "boardingPoints",
    headerName: "Boarding Points",
    width: 100,
  },
  {
    field: "time",
    headerName: "Departure",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
];
