import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import AdminImage from "./AdminImage.js";

function AdminLogin({ setAuth }) {
  const [inputs, setInputs] = useState({ admin_email: "", admin_password: "" });
  const { admin_email, admin_password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { admin_email, admin_password };
      const response = await fetch(process.env.REACT_APP_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Login successful!", { style: { whiteSpace: "nowrap" } });
      } else {
        setAuth(false);
        toast.error(parseRes, { style: { whiteSpace: "nowrap" } });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmitForm} style={formStyle}>
        <AdminImage />

        <h3 className="text-left my-3" style={{ fontWeight: "bold" }}>
          Login as an Admin user
        </h3>
        <span>Please Sign in to continue</span>
        <TextField
          label="Enter Your Email"
          variant="outlined"
          type="email"
          name="admin_email"
          className="form-control my-3"
          value={admin_email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Enter Your Password"
          variant="outlined"
          type="password"
          name="admin_password"
          className="form-control my-3"
          value={admin_password}
          onChange={onChange}
          fullWidth
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
        <div
          className="forgot-register-links"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "50px",
          }}
        >
          <Link to="/forgottenpassword">Forgot your password?</Link>
          <br />
          <Link to="/adminregister">Register</Link>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  marginTop: "50px",
  marginBottom: "50px",
  padding: "0 20px",
  width: "100%",
};

const formStyle = {
  width: "100%",
  maxWidth: "500px",
};

const buttonStyle = {
  width: "100%",
  backgroundColor: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "15px 20px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  fontWeight: "bold",
  marginTop: "10px",
};

export default AdminLogin;
