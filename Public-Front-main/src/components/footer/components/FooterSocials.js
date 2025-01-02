import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";

function FooterSocials({ facebookLink, instagramLink }) {
  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1 style={{ fontSize: "1.2em", marginBottom: "20px" }}>SOCIALS</h1>
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "0.9em",
          marginBottom: "10px",
          display: "block",
        }}
      >
        <RiFacebookFill size={15} /> Facebook
      </a>
      <a
        href={instagramLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "white",
          fontSize: "0.9em",
          marginBottom: "10px",
          display: "block",
        }}
      >
        <IoLogoInstagram size={15} /> Instagram
      </a>
    </div>
  );
}

export default FooterSocials;
