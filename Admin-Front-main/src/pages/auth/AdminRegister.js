import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import AdminImage from "./AdminImage.js";

function AdminRegister() {
  const [inputs, setInputs] = useState({
    reg_username: "",
    reg_email: "",
    reg_password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const { reg_username, reg_email, reg_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const startTimer = () => {
    setIsButtonDisabled(true);
    let timeLeft = 60;
    setTimer(timeLeft);

    const countdown = setInterval(() => {
      timeLeft -= 1;
      setTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(countdown);
        setIsButtonDisabled(false);
      }
    }, 1000);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { reg_username, reg_email, reg_password };

      const response = await fetch(process.env.REACT_APP_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const parseRes = await response.json();
        toast.success("Admin approval pending", {
          style: { whiteSpace: "nowrap" },
        });
        console.log(parseRes);
        startTimer();
      } else {
        toast.error("Error", { style: { whiteSpace: "nowrap" } });
        throw new Error(`Registration failed: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const navigate = useNavigate();

  const handleRedirect = async (e) => {
    e.preventDefault();
    if (reg_username && reg_email && reg_password) {
      await onSubmitForm(e);
      navigate("/adminregistrationconfirmation");
    } else {
      toast.error("Please fill in all fields", {
        style: { whiteSpace: "nowrap" },
      });
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmitForm} style={formStyle}>
        <AdminImage />
        <h3 className="text-left my-3">Register as an Admin user</h3>
        <span>Please Register to login to admin</span>
        <TextField
          label="Enter Your Full Name"
          variant="outlined"
          type="text"
          name="reg_username"
          placeholder="Username"
          className="form-control my-3"
          value={reg_username}
          onChange={(e) => onChange(e)}
        />
        <TextField
          label="Enter Your Email"
          variant="outlined"
          type="email"
          name="reg_email"
          placeholder="Email"
          className="form-control my-3"
          value={reg_email}
          onChange={(e) => onChange(e)}
        />
        <TextField
          label="Enter Your Password"
          variant="outlined"
          type="password"
          name="reg_password"
          placeholder="Password"
          className="form-control my-3"
          value={reg_password}
          onChange={(e) => onChange(e)}
        />
        <button
          onClick={handleRedirect}
          style={buttonStyle}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? `Register (Wait ${timer}s)` : "Register"}
        </button>
        <div
          className="forgot-register-links"
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "50px",
          }}
        >
          <Link to="/adminlogin">Login</Link>
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

export default AdminRegister;
