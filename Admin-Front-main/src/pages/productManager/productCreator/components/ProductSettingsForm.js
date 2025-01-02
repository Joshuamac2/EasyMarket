import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import "./ProductSettingsForm.css";

function ProductSettingsForm({
  product_type,
  setProduct_type,
  classificationName,
  setClassificationName,
  classificationColour,
  setClassificationColour,
  product_location,
  setProduct_location,
}) {
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (!product_location) {
      setProduct_location("Not Live");
    }
  }, [product_location, setProduct_location]);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_PRODUCT_TYPES);
      const data = await response.json();
      setProductTypes(data);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const handleSelectProductType = (value) => {
    setProduct_type((prevType) => (prevType === value ? "" : value));
  };

  const handleSelectProductLocation = (value) => {
    setProduct_location(value);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <label>Product Setup & Display</label>
      </div>
      <h5 className="form-subheader">
        Define your product’s category, specifications, and visibility to
        control how it’s presented to customers
      </h5>
      <div className="section">
        <Tooltip
          title={
            <>
              <strong>Category:</strong> Select the category that best describes
              your product, such as "Shirts," "Gloves," or "Boots." This helps
              group similar products together and ensures better organization on
              your site.
              <br />
            </>
          }
          placement="left"
        >
          <div className="section-tooltip">
            <h3 className="section-header">Category</h3>
            <HiOutlineInformationCircle
              size={25}
              style={{ color: "black", marginLeft: "5px", marginTop: "5px" }}
            />
          </div>
        </Tooltip>

        <div className="radio-container">
          {productTypes.map((type) => (
            <div
              key={type.id}
              className={`radio-item ${
                product_type === type.name ? "selected" : ""
              }`}
              onClick={() => handleSelectProductType(type.name)}
            >
              {type.name}
            </div>
          ))}
        </div>
      </div>

      <div className="classification-container section">
        <Tooltip
          title={
            <>
              <strong>Name:</strong> Use this field to describe the product
              attribute, such as "Red" for color or "250GB" for RAM. This name
              helps identify the specification of the product.
              <br />
              <strong>Hex Colour:</strong> Enter a hex color code if you want to
              visually represent the color of the product. If a hex color is
              provided, the name will be replaced by a colored dot in the filter
              options for better visual distinction.
            </>
          }
          placement="left"
        >
          <div className="section-tooltip">
            <h3 className="section-header">Specification</h3>
            <HiOutlineInformationCircle
              size={25}
              style={{ color: "black", marginLeft: "5px", marginTop: "5px" }}
            />
          </div>
        </Tooltip>

        {/* I NEED TO EDIT THIS, SO THAT  */}
                {/* I NEED TO EDIT THIS, SO THAT  */}
        {/* I NEED TO EDIT THIS, SO THAT  */}
        {/* I NEED TO EDIT THIS, SO THAT  */}
        {/* I NEED TO EDIT THIS, SO THAT  */}
        {/* I NEED TO EDIT THIS, SO THAT  */}
        {/* I NEED TO EDIT THIS, SO THAT  */}


        <div className="inputs-row">
          <div style={{ flex: 1 }}>
            <label htmlFor="classificationName" className="setting-label">
              Name
            </label>
            <input
              type="text"
              id="classificationName"
              name="classificationName"
              value={classificationName}
              onChange={(e) => setClassificationName(e.target.value)}
              placeholder="Enter name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="classificationColour" className="setting-label">
              Hex Colour
            </label>
            <input
              type="text"
              id="classificationColour"
              name="classificationColour"
              value={classificationColour}
              onChange={(e) => setClassificationColour(e.target.value)}
              placeholder="Enter hex code"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <Tooltip
          title={
            <>
              <strong>Make Active:</strong> Publish your product and make it
              available for purchase on the site.
              <br />
              <strong>Feature on Homepage:</strong> Highlight your product on
              the homepage while also making it available for purchase
              throughout the site.
              <br />
              <strong>Save as Draft:</strong> Keep the product hidden while you
              continue working on it. It won't be visible to customers until you
              publish it.
            </>
          }
          placement="left"
        >
          <div className="section-tooltip">
            <h3 className="section-header">Publishing Options</h3>
            <HiOutlineInformationCircle
              size={25}
              style={{ color: "black", marginLeft: "5px", marginTop: "5px" }}
            />
          </div>
        </Tooltip>

        <div className="radio-container">
          <div
            className={`radio-item ${
              product_location === "Live" ? "selected" : ""
            }`}
            onClick={() => handleSelectProductLocation("Live")}
          >
            Make Active
          </div>
          <div
            className={`radio-item ${
              product_location === "New Arrivals" ? "selected" : ""
            }`}
            onClick={() => handleSelectProductLocation("New Arrivals")}
          >
            Feature on Homepage
          </div>
          <div
            className={`radio-item ${
              product_location === "Not Live" ? "selected" : ""
            }`}
            onClick={() => handleSelectProductLocation("Not Live")}
          >
            Save as Draft
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSettingsForm;
