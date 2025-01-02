import React from "react";
import "./OrderSummary.css";
import { HiCheck } from "react-icons/hi2";

const OrderSummary = ({ orderDetails }) => {
  const { name, order_reference, address, email } = orderDetails;

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

  return (
    <div className="order-summary">
      <div className="order-confirmation">
        <HiCheck className="check-icon" />
        <div>
          <div className="order-no">Order #{order_reference}</div>
          <h2 className="thank-you">Thank you {name}!</h2>
        </div>
      </div>
      <div className="order-updates">
        <h3>
          <strong className="order-updates-title">Order Updates</strong>
        </h3>
        <p>You will receive order and shipping updates via email.</p>
      </div>
      <div className="contact-info">
        <h3>Contact Email</h3>
        <p>{email}</p>
      </div>
      <div className="address-info">
        <p>
          <h3>Address</h3>
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
        <h3>Shipping Method</h3>
        <p>{formatShippingDetails(shippingOptions)}</p>
      </div>
      <div className="help-section">
        <span className="help-icon">i</span>
        <span>
          Need Help? <a href="/contact-us">Contact Us</a>
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
