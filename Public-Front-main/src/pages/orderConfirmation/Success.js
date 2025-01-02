import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderSummary from "./components/OrderSummary";
import OrderItems from "./components/OrderItems";
import Loader from "./../../components/loader/Loader.js";
import UseLoader from "../../components/loader/components/UseLoader.js";
import "./Success.css";

function Success() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionAndStoreOrder = async () => {
      const urlParams = new URLSearchParams(location.search);
      const sessionId = urlParams.get("session_id");

      if (sessionId) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_CHECKOUT_SESSION}?session_id=${sessionId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.order) {
              setOrderDetails(data.order);

              localStorage.removeItem("cart");
              localStorage.removeItem("cartTimestamp");
            } else {
              setError(
                "Failed to fetch order details, please contact sales for support."
              );
            }
          } else {
            setError(
              "Failed to fetch order details, please contact sales for support."
            );
          }
        } catch (error) {
          setError(
            "Failed to fetch order details, please contact sales for support"
          );
          console.error("Error fetching session or storing order:", error);
        }
      }
    };

    fetchSessionAndStoreOrder();
  }, [location.search]);

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="success">
      {orderDetails ? (
        <>
          <OrderSummary orderDetails={orderDetails} className="order-summary" />
          <OrderItems orderDetails={orderDetails} className="order-items" />
        </>
      ) : (
        <div className="error-message">
          {error ? <p>{error}</p> : <p>Loading...</p>}
          <a href="/contact-us" className="contact-link">
            Contact Us
          </a>
        </div>
      )}
    </div>
  );
}

export default Success;
