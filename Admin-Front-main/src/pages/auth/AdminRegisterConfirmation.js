import React from "react";
import AdminImage from "./AdminImage.js";

function AdminRegisterConfirmation() {
  return (
    <div style={containerStyle}>
      <AdminImage />
      <h1 style={titleStyle}>Registration Confirmation</h1>
      <h5 style={textStyle}>
        Your request has been forwarded to management. If your request is
        approved, they will get in touch with you.
      </h5>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  flexWrap: "wrap",
  marginTop: "50px",
  marginBottom: "50px",
  padding: "20px",
  width: "100%",
};

const titleStyle = {
  textAlign: "center",
  marginTop: "30px",
  fontSize: "2rem",
  padding: "10px",
  fontWeight: "bold",
};

const textStyle = {
  textAlign: "center",
  marginTop: "20px",
  fontSize: "1.2rem",
  padding: "0 20px",
  maxWidth: "600px",
  lineHeight: "1.6",
};

const mediaQueryStyles = `
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem; // Adjust title size for smaller screens
  }
  h5 {
    font-size: 1rem; // Adjust subtitle size for smaller screens
  }
}
`;

export default AdminRegisterConfirmation;
