import React from "react";
import { HiIdentification } from "react-icons/hi2";
import { IoMdRemoveCircle } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import "./ProductLinkingForm.css";

function ProductLinkingForm({ productLinking, setProductLinking }) {
  const handleAddLink = () => {
    setProductLinking([...productLinking, ""]);
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...productLinking];
    newLinks[index] = parseInt(value);
    setProductLinking(newLinks);
  };

  const handleRemoveLink = (index) => {
    const newLinks = productLinking.filter((_, i) => i !== index);
    setProductLinking(newLinks);
  };

  return (
    <div className="product-linking-form">
      <div className="product-form-header">
        <label>Linking Product</label>
        <h5 className="form-subheader">
          Link your products to provide easy access for different colors or
          types
        </h5>
      </div>

      {productLinking.map((link, index) => (
        <div key={index} className="linking-field">
          <Tooltip
            title={
              <>
                <strong>Linking Products:</strong> Connect similar products to
                provide easy access on their product pages. To link a product,
                enter its ID here. You can find the product ID in the first
                column of the catalogue table after creating your product.
                <br />
                This helps shoppers quickly navigate to related items, improving
                their browsing experience and increasing the visibility of
                similar products.
              </>
            }
            placement="left"
          >
            <div className="section-tooltip">
              <h3 className="section-header">Product Link</h3>
              <HiOutlineInformationCircle
                size={25}
                style={{ color: "black", marginLeft: "5px", marginTop: "5px" }}
              />
            </div>
          </Tooltip>

          <div className="input-with-remove">
            <input
              type="number"
              className="linking-field-input"
              placeholder="Enter Product ID"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveLink(index)}
            >
              <IoMdRemoveCircle />
            </button>
          </div>
        </div>
      ))}
      <div className="add-linking-button" onClick={handleAddLink}>
        <HiIdentification className="button-icon" size={20} />
        <span className="button-text">Add Product ID</span>
      </div>
    </div>
  );
}

export default ProductLinkingForm;
