import React from "react";

function Klarna({ pricingOptions, style }) {
  if (!Array.isArray(pricingOptions) || pricingOptions.length === 0) {
    console.error("Pricing options is either not an array or is empty");
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://pluginicons.craft-cdn.com/commerce-klarna-checkout.svg?1610712320"
          alt="Klarna Checkout"
          style={{ width: "40px", height: "auto", marginRight: "8px" }}
        />
        No pricing options available
      </div>
    );
  }

  const validPricingOptions = pricingOptions.filter((option, index) => {
    if (!option || typeof option !== "object") {
      console.warn(`Invalid option at index ${index}:`, option);
      return false;
    }
    if (option.price == null || isNaN(parseFloat(option.price))) {
      console.warn(`Invalid price at index ${index}:`, option.price);
      return false;
    }
    return true;
  });

  if (validPricingOptions.length === 0) {
    console.error("No valid pricing options available after filtering.");
    return <div>No valid pricing options available</div>;
  }

  const lowestPrice = validPricingOptions.sort(
    (a, b) => parseFloat(a.price) - parseFloat(b.price)
  )[0].price;

  const installmentAmount =
    lowestPrice != null ? (parseFloat(lowestPrice) / 3).toFixed(2) : "N/A";

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
        <p
          style={{
            fontWeight: "bold",
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {lowestPrice != null ? (
            `Make 3 payments of £${installmentAmount}`
          ) : (
            <>
              <img
                src="https://pluginicons.craft-cdn.com/commerce-klarna-checkout.svg?1610712320"
                alt="Klarna Checkout"
                style={{ width: "20px", height: "auto", marginRight: "8px" }}
              />
              Pricing not available
            </>
          )}
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
