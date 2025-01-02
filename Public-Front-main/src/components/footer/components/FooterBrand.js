import React from "react";

function FooterBrand({ brandName, tagLine }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "1.3em", textAlign: "left", width: "100%" }}>
        <span dangerouslySetInnerHTML={{ __html: brandName }} />
      </h1>
      <a
        href="/our-story"
        style={{
          fontSize: "1em",
          textAlign: "left",
          textDecoration: "none",
          color: "white",
          display: "block",
          marginTop: "10px",
        }}
      >
        Our Story
      </a>
      <p
        style={{
          fontSize: "0.8em",
          textAlign: "left",
          marginTop: "10px",
          width: "100%",
          display: "block",
        }}
        dangerouslySetInnerHTML={{ __html: tagLine }}
      />
    </div>
  );
}

export default FooterBrand;
