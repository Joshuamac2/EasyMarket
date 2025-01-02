import React, { useState, useEffect } from "react";

const ShippingAndReturns = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [shippingAndReturns, setShippingAndReturns] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShippingAndReturns = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_GET_CUSTOMER_SERVICE
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const shippingAndReturnsData = await response.json();

        setShippingAndReturns(shippingAndReturnsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShippingAndReturns();
  }, []);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
    setClosing(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setClosing(false);
      }, 200);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleDetails}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #DCDCDC",
          background: "none",
          textAlign: "left",
          padding: "1px 0",
          fontSize: "1rem",
          color: "#4F4C4C",
          marginBottom: "15px",
        }}
      >
        <div style={{ flex: 1 }}>SHIPPING & RETURNS</div>
        <div
          style={{
            fontSize: "1.5em",
            color: "#4F4C4C",
            transition: "transform 0.3s ease-in-out",
            transform: isOpen ? "rotate(-0deg)" : "rotate(90deg)",
          }}
        >
          {isOpen ? "−" : "+"}
        </div>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "100%" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
          transitionDelay: closing ? "0.3s" : "0",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: shippingAndReturns.shipping_and_returns_dropdown,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAndReturns;
