import React, { useState, useContext } from "react";
import { RecoveryContext } from "../../App.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";

import AdminImage from "../auth/AdminImage.js";

const Reset = () => {
  const { email } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(process.env.REACT_APP_CHANGE_USER_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        toast.success("Password changed successfully!", { autoClose: 3000 });
        navigate("/adminlogin");
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <AdminImage />
        <h3 className="text-left my-3">Reset Password</h3>
        <TextField
          label="Enter Your New Password"
          variant="outlined"
          type="password"
          name="newPassword"
          className="form-control my-3"
          value={newPassword}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Your New Password"
          variant="outlined"
          type="password"
          name="confirmPassword"
          className="form-control my-3"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" style={buttonStyle}>
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: "50px",
  marginBottom: "100px",
  textAlign: "left",
};

const buttonStyle = {
  width: "100%",
  borderRadius: "5px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "15px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  fontWeight: "bold",
};

export default Reset;
