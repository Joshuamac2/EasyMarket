import React, { useState, useEffect } from "react";
import "./AdminRequestTable.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import { MdOutlinePendingActions } from "react-icons/md";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function AdminRequestTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_GET_REGISTERED_USER_DATA
      );
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleConfirm = async (id) => {
    try {
      if (id === undefined || id === null) {
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to confirm this user?"
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_CONFIRM_REGISTERED_USER,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        console.error("Error confirming user:", data.message);
      }
    } catch (error) {
      console.error("Error confirming user:", error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      if (id === undefined || id === null) {
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to reject this user?"
      );

      if (!confirmed) {
        return;
      }

      const response = await fetch(
        process.env.REACT_APP_REJECT_REGISTERED_USER,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        console.error("Error rejecting user:", data.message);
      }
    } catch (error) {
      console.error("Error rejecting user:", error.message);
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
              <strong>Pending Admin Requests:</strong> This table lists users
              requesting to join the platform
            </>
          }
          placement="left"
        >
          <label>
            Pending Admin Requests <HiOutlineInformationCircle />
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
                Registration Date
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Approve
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bolder", fontSize: "18px" }}
              >
                Reject
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow
                key={user.id || index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  <MdOutlinePendingActions
                    style={{ marginRight: "10px", marginBottom: "2px" }}
                    size={20}
                  />
                  {user.reg_status && user.reg_status.length > 0
                    ? user.reg_status[0].toUpperCase() +
                      user.reg_status.slice(1)
                    : "N/A"}
                </TableCell>

                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {user.reg_username}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {user.reg_email}
                </TableCell>
                <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                  {new Date(user.registration_date).toLocaleDateString(
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
                    className="approve-button-style"
                    onClick={() => handleConfirm(user.id)}
                  >
                    <CheckCircleOutlineIcon />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="delete-button-style"
                    onClick={() => handleReject(user.id)}
                  >
                    <CancelIcon />
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

export default AdminRequestTable;
