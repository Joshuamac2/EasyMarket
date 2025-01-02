import React, { useState, useEffect } from "react";

function ShippingAndReturns() {
  const [shippingAndReturnsPage, setShippingAndReturnsPage] = useState("");

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_CUSTOMER_SERVICE);
      if (response.ok) {
        const { shipping_and_returns_policy } = await response.json();
        setShippingAndReturnsPage(shipping_and_returns_policy || "");
      }
    } catch (error) {
      console.error("Error fetching shipping and returns policy:", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "30px", marginBottom: "50px" }}>
        Shipping & Returns
      </h1>
      <div
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "70px",
        }}
        dangerouslySetInnerHTML={{ __html: shippingAndReturnsPage }}
      />
    </div>
  );
}

export default ShippingAndReturns;
