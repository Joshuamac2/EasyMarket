import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import { FaTrash } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function AdminActiveTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_ADMIN_USER);
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleReject = async (admin_id) => {
    try {
      if (admin_id === undefined || admin_id === null) {
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to delete this admin?"
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(process.env.REACT_APP_DELETE_ADMIN_USER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_id }),
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        console.error("Error deleting user:", data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div>
      <div
        style={{
          fontSize: "35px",
          fontWeight: "bolder",
          marginTop: "50px",
          marginBottom: "10px",
        }}
      >
        <Tooltip
          title={
            <>
              <strong>Active Admin Accounts:</strong> Manage the current active
              admin users with access to the dashboard
            </>
          }
          placement="left"
        >
          <label>
            Active Admin Accounts <HiOutlineInformationCircle />
          </label>
        </Tooltip>
      </div>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#16644C" }}>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Username
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Acceptance Date
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Delete Admin
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow
                key={user.admin_id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{
                    color: "green",
                    fontWeight: "bolder",
                    fontSize: "15px",
                  }}
                >
                  <FaRegDotCircle
                    style={{ marginRight: "10px", marginBottom: "2px" }}
                    size={20}
                  />
                  {user.admin_status}
                </TableCell>

                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {user.admin_username}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {user.admin_email}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {new Date(user.admin_registration_date).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </TableCell>

                <TableCell>
                  <button
                    className="delete-button-style"
                    onClick={() => handleReject(user.admin_id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminActiveTable;
