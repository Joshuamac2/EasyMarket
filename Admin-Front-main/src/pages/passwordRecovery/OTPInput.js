import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecoveryContext } from "../../App.js";
import AdminImage from "../auth/AdminImage.js";

function OTPInput() {
  const { email, otp } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const [otpInput, setOTPInput] = useState(["", "", "", ""]);

  const verifyOTP = () => {
    const enteredOTP = otpInput.join("");
    if (parseInt(enteredOTP) === otp) {
      navigate("/reset-password");
    } else {
      alert("The code you entered is incorrect. Please try again.");
    }
  };

  const handleChange = (index, value) => {
    const newInput = [...otpInput];
    newInput[index] = value.slice(0, 1);
    setOTPInput(newInput);
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <AdminImage />
        <h3 style={{ marginTop: "20px", textAlign: "center" }}>
          We sent your OTP to:
          <p style={{ fontWeight: "normal", fontSize: "1rem" }}>{email}</p>
        </h3>
        <p style={{ textAlign: "center", margin: "10px 0" }}>
          Please enter the 4-digit code below:
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyOTP();
          }}
        >
          <div style={otpContainerStyle}>
            {otpInput.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                maxLength="1"
                value={digit}
                style={inputStyle}
                type="text"
                onChange={(e) => handleChange(index, e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button type="submit" style={buttonStyle}>
              Verify Account
            </button>
            <div
              className="forgot-register-links"
              style={{
                textAlign: "center",
                marginTop: "15px",
                marginBottom: "30px",
              }}
            >
              <Link to="/adminlogin">Login</Link>
              <br />
              <Link to="/forgottenpassword">Resend Password</Link>
            </div>
          </div>
        </form>
      </div>
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
  width: "100%",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
  padding: "20px",
  borderRadius: "8px",
};

const otpContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "20px 0",
};

const inputStyle = {
  textAlign: "center",
  outline: "none",
  border: "2px solid #ccc",
  borderRadius: "5px",
  width: "60px",
  height: "60px",
  fontSize: "24px",
  backgroundColor: "white",
  margin: "0 5px",
  transition: "border-color 0.3s",
  "&:focus": {
    borderColor: "#333",
  },
};

const buttonStyle = {
  width: "100%",
  borderRadius: "5px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "15px 0",
  cursor: "pointer",
  transition: "background-color 0.3s",
  fontWeight: "bold",
};

export default OTPInput;
