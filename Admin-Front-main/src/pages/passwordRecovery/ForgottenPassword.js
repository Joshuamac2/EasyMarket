import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { RecoveryContext } from "../../App";
import AdminImage from "../auth/AdminImage.js";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);
  const navigate = useNavigate();
  const { setEmail: setEmailContext, setOTP } = useContext(RecoveryContext);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeConfirmEmail = (e) => {
    setConfirmEmail(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      await generateAndSendOTP(email);
    } else {
      setError("Emails do not match.");
    }
  };

  const generateAndSendOTP = async (email) => {
    try {
      const checkResponse = await fetch(
        process.env.REACT_APP_CHECK_EXISTING_EMAIL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (checkResponse.ok) {
        const { exists } = await checkResponse.json();

        if (exists) {
          const OTP = Math.floor(Math.random() * 9000 + 1000);
          setOTP(OTP);
          setEmailContext(email);

          const body = { OTP, email };
          const response = await fetch(
            process.env.REACT_APP_SEND_EMAIL_RECOVERY,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );

          if (response.ok) {
            toast.success("Recovery email sent successfully.");
            setIsCooldown(true);
            setTimeout(() => setIsCooldown(false), 60000);
            navigate("/otp");
          } else {
            toast.error("Error sending recovery email.");
          }
        } else {
          toast.error("This email is not registered in our system.");
        }
      } else {
        toast.error("Error checking email existence.");
      }
    } catch (err) {
      console.error("Error in sending recovery email:", err.message);
    }
  };

  const buttonStyle = {
    width: "100%",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontWeight: "bold",
    marginTop: "10px",
    opacity: isCooldown ? 0.6 : 1,
    pointerEvents: isCooldown ? "none" : "auto",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={onSubmitForm} style={formStyle}>
        <AdminImage />
        <h3 className="text-left my-3" style={{ fontWeight: "bold" }}>
          Start Password Recovery
        </h3>
        <span>
          If it is registered, you will receive a One-Time Code via email.
        </span>
        <TextField
          label="Enter Your Email"
          variant="outlined"
          type="email"
          name="email"
          className="form-control my-3"
          value={email}
          onChange={onChangeEmail}
          fullWidth
        />
        <TextField
          label="Confirm Your Email"
          variant="outlined"
          type="email"
          name="confirmEmail"
          className="form-control my-3"
          value={confirmEmail}
          onChange={onChangeConfirmEmail}
          fullWidth
        />
        <button type="submit" style={buttonStyle}>
          {isCooldown ? "Please wait..." : "Recover Password"}
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
          <br />
          <Link to="/adminregister">Register</Link>
        </div>
        {error && <p className="text-danger">{error}</p>}
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

export default ForgottenPassword;
