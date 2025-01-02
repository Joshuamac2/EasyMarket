import React, { useState, useEffect } from "react";

function PrivacyPolicy() {
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_CUSTOMER_SERVICE);

      if (response.ok) {
        const { privacy_policy } = await response.json();
        setPrivacyPolicy(privacy_policy || "");
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "30px", marginBottom: "50px" }}>
        Privacy Policy
      </h1>
      <div
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "70px",
        }}
        dangerouslySetInnerHTML={{ __html: privacyPolicy }}
      />
    </div>
  );
}

export default PrivacyPolicy;
