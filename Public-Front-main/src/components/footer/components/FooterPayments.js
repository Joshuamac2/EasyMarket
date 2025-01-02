import React from "react";

let styles = {
  width: "45px",
  height: "25px",
  marginRight: "10px",
  borderRadius: "5px",
};

function FooterPayments() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: '20px' }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <img src="/images/paypal.png" alt="PayPal" style={styles} />
        <img src="/images/visa.png" alt="Visa" style={styles} />
        <img src="/images/mastercard.png" alt="MasterCard" style={styles} />
        <img src="/images/amex.png" alt="American Express" style={styles} />
        <img src="/images/apple.png" alt="Apple Pay" style={styles} />
        <img src="/images/stripe.png" alt="Stripe" style={styles} />
        <img src="/images/google.png" alt="Google Pay" style={styles} />
        <img src="/images/klarna.png" alt="Klarna" style={styles} />
      </div>
    </div>
  );
}

export default FooterPayments;
