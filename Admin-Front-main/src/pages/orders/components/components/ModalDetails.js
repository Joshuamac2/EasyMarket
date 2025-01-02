import React from "react";
import "./ModalDetails.css";

const ModalDetails = ({ orderDetails }) => {
  const { name, address, email, completed_by, completed_date } = orderDetails;

  let shippingOptions = orderDetails.shipping_options;
  if (typeof shippingOptions === "string") {
    try {
      shippingOptions = JSON.parse(shippingOptions);
    } catch (e) {
      console.error("Error parsing shipping_options:", e);
      shippingOptions = null;
    }
  }

  const formatShippingDetails = (shippingOption) => {
    if (!shippingOption) return "N/A";
    const { name, delivery_estimate } = shippingOption;
    const deliveryTime = delivery_estimate
      ? `${delivery_estimate.minimum.value} - ${delivery_estimate.maximum.value} Business days`
      : "N/A";

    return (
      <div>
        {name}: {deliveryTime}
      </div>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="order-summary">
      <div className="order-summary-title">
        <h4>Order Summary</h4>
      </div>
      {completed_by && completed_date && (
        <div className="completion-info">
          <div className="completion-box">
            <h3>
              <strong>Order Complete</strong>
            </h3>
            <p>
              Completed by: <strong>{completed_by}</strong>
              <p>
                On: <strong>{formatDate(completed_date)}</strong>.
              </p>
            </p>
          </div>
        </div>
      )}
      <div className="contact-info">
        <div>
          <h5>Customer Name</h5>
          <p>{name}</p>
          <br />
        </div>
        <div>
          <h5>Contact Email</h5>
          <p>{email}</p>
        </div>
      </div>
      <div className="address-info">
        <h5>Address</h5>
        <p>
          {name}
          <br />
          {address.line1}
          {address.line2 && <>, {address.line2}</>}
          <br />
          {address.city}
          <br />
          {address.country}
        </p>
      </div>
      <div className="shipping-info">
        <h5>Shipping Method</h5>
        <p>{formatShippingDetails(shippingOptions)}</p>
      </div>
    </div>
  );
};

export default ModalDetails;
