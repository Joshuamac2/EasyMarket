import React from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import "./PricingVariationsForm.css";

import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdOutlinePayments } from "react-icons/md";

function PricingVariationsForm({ pricingOptions, setPricingOptions }) {
  const handlePricingOptionChange = (index, field, value) => {
    const newPricingOptions = [...pricingOptions];
    if (field === "sale") {
      if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
        newPricingOptions[index][field] = value;
      }
    } else {
      newPricingOptions[index][field] = value;
    }
    setPricingOptions(newPricingOptions);
  };

  const handleSaleChange = (index, value) => {
    value = value.replace(/^0+/, "");

    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 99)) {
      handlePricingOptionChange(index, "sale", value);
    }
  };

  const addPricingOption = () => {
    setPricingOptions([
      ...pricingOptions,
      { name: "", price: "", api_key: "", available_quantity: "", sale: "" },
    ]);
  };

  const removePricingOption = (index) => {
    const newPricingOptions = [...pricingOptions];
    newPricingOptions.splice(index, 1);
    setPricingOptions(newPricingOptions);
  };

  return (
    <div className="pricing-form-container">
      <div className="pricing-form-header">
        <div className="pricing-form-title">Pricing Variations</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title="Your products can offer multiple pricing options, each presented as a dropdown selection."
            placement="left"
          ></Tooltip>
        </div>
      </div>
      <h5 className="pricing-form-subheader">Add pricing options</h5>
      {pricingOptions.map((option, index) => (
        <div key={index} className="pricing-option">
          <div className="pricing-option-label">
            <Tooltip
              title={
                <>
                  <strong>Title:</strong> Enter a title for the pricing option,
                  which will be displayed as a selectable choice on the products
                  page.
                </>
              }
              placement="left"
            >
              <label className="pricing-lables">
                Title <HiOutlineInformationCircle />
              </label>
            </Tooltip>

            <TextField
              type="text"
              label="Enter Title"
              variant="outlined"
              value={option.name}
              onChange={(e) =>
                handlePricingOptionChange(index, "name", e.target.value)
              }
              className="option-field"
            />
          </div>
          <div className="pricing-option-label">
            <Tooltip
              title={
                <>
                  <strong>Price:</strong> Set the price for this specific
                  pricing option. If your product has multiple pricing options,
                  such as different sizes or features, you can add more options
                  using the add button.
                  <br />
                </>
              }
              placement="left"
            >
              <label className="pricing-lables">
                Price <HiOutlineInformationCircle />
              </label>
            </Tooltip>

            <TextField
              type="number"
              label="Enter Price"
              variant="outlined"
              value={option.price}
              onChange={(e) =>
                handlePricingOptionChange(index, "price", e.target.value)
              }
              className="option-field"
            />
          </div>
          <div className="pricing-option-label">
            <Tooltip
              title={
                <>
                  <strong>Stock:</strong> Enter the quantity available for this
                  particular pricing option. This allows you to manage inventory
                  levels for different variations of the product.
                  <br />
                  If you have multiple pricing options (e.g., different sizes or
                  colors), ensure that stock is tracked individually for each
                  option. This helps maintain accurate availability information
                  on the product page.
                </>
              }
              placement="left"
            >
              <label className="pricing-lables">
                Stock <HiOutlineInformationCircle />
              </label>
            </Tooltip>

            <TextField
              type="number"
              label="Enter Stock"
              variant="outlined"
              value={option.available_quantity || 0}
              onChange={(e) =>
                handlePricingOptionChange(
                  index,
                  "available_quantity",
                  e.target.value
                )
              }
              className="option-field"
            />
          </div>
          <div className="pricing-option-label">
            <Tooltip
              title={
                <>
                  <strong>Key:</strong> Enter the unique Stripe API key for this
                  pricing option. Each option must have a distinct key to ensure
                  accurate billing and processing of payments.
                  <br />
                  This ensures that customers are charged correctly based on the
                  selected pricing option, and helps maintain proper transaction
                  records.
                </>
              }
              placement="left"
            >
              <label className="pricing-lables">
                Key <HiOutlineInformationCircle />
              </label>
            </Tooltip>

            <TextField
              type="text"
              label="Enter Key"
              variant="outlined"
              value={option.api_key}
              onChange={(e) =>
                handlePricingOptionChange(index, "api_key", e.target.value)
              }
              className="option-field"
            />
          </div>

          <div className="pricing-option-label">
            <Tooltip
              title={
                <>
                  <strong>Sale:</strong> Enter a discount percentage between 1%
                  and 99% to apply a sale to this pricing option. This
                  percentage will be deducted from the original price set by the
                  'price field' and displayed as a sale on the product page.
                  <br />
                  If you leave this field blank, no sale will be applied. This
                  field is used solely for marketing purposes to highlight
                  discounts, while the actual price is defined by the API key.
                </>
              }
              placement="left"
            >
              <label className="pricing-lables">
                Sale <HiOutlineInformationCircle />
              </label>
            </Tooltip>

            <TextField
              type="text"
              label="Enter Sale"
              variant="outlined"
              value={option.sale}
              onChange={(e) => handleSaleChange(index, e.target.value)}
              onBlur={(e) => {
                if (e.target.value === "0") {
                  handleSaleChange(index, "");
                }
              }}
              className="option-field"
            />
          </div>
          <div className="pricing-option-label">
            <button
              onClick={() => removePricingOption(index)}
              className="pricing-option-remove"
            >
              <IoMdRemoveCircle size={30} color="black" />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addPricingOption} className="add-variation-button">
        <MdOutlinePayments className="button-icon" size={25} />
        <span className="button-text">Add Variation</span>
      </button>
    </div>
  );
}

export default PricingVariationsForm;
