import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  // const handleEdit = (id) => {
  //   if (path === "book" || path === "bus") {
  //     return <Link to={`/${path}/edit/${id}`}>Edit</Link>;
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if (path === "bus" || path === "book") {
          return (
            <div className="cellAction">
              <div className="editButton">
                <Link to={`/${path}/edit/${params.row._id}`}>Edit</Link>
              </div>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            </div>
          );
        } else {
          return (
            <div className="cellAction">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            </div>
          );
        }
      },
    },
  ];


  const renderAddNewButton = (path === "users" || path === "bus") && (
    <Link to={`/${path}/new`} className="link">
      Add New
    </Link>
  );
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {renderAddNewButton}
      </div>
      {list && (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
