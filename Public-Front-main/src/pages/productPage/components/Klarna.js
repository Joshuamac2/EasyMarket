import React from "react";

function Klarna({ pricingOptions, style }) {
  const lowestPrice = pricingOptions.sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  )[0].price;
  const installmentAmount = (parseFloat(lowestPrice) / 3).toFixed(2);

  return (
    <div style={style}>
      <div style={{ marginRight: "20px", marginBottom: "10px" }}>
        <img
          src="https://pluginicons.craft-cdn.com/commerce-klarna-checkout.svg?1610712320"
          alt="Klarna Checkout"
          style={{ width: "80px", height: "auto" }}
        />
      </div>
      <div style={{ marginTop: "5px", marginBottom: "5px" }}>
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Make 3 payments of £{installmentAmount}
        </p>
        <p
          style={{
            color: "#888",
            fontSize: "0.9em",
            fontWeight: "bold",
            marginTop: "0",
          }}
        >
          18+, T&amp;C apply, Credit subject to status.{" "}
          <a
            href="https://www.klarna.com/uk/how-klarna-works/"
            style={{ color: "#888", fontSize: "0.9em" }}
          >
            Learn more.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Klarna;
