import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tooltip from "@mui/material/Tooltip";

import TextField from "@mui/material/TextField";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import "./CustomerServiceForm.css";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { IoMdRemoveCircle } from "react-icons/io";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function CustomerServiceForm() {
  const [shippingAndReturnsPage, setShippingAndReturnsPage] = useState("");
  const [shippingAndReturnsDropdown, setShippingAndReturnsDropdown] =
    useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [shippingOptions, setShippingOptions] = useState([
    { display_name: "", amount: 0, min_days: 0, max_days: 0 },
  ]);
  const [existingPolicy, setExistingPolicy] = useState(false);

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_CUSTOMER_SERVICE);
      if (response.ok) {
        const {
          shipping_and_returns_policy,
          shipping_and_returns_dropdown,
          privacy_policy,
          shipping_options,
        } = await response.json();
        setShippingAndReturnsPage(shipping_and_returns_policy || "");
        setShippingAndReturnsDropdown(shipping_and_returns_dropdown || "");
        setPrivacyPolicy(privacy_policy || "");
        setShippingOptions(shipping_options || []);
        setExistingPolicy(
          shipping_and_returns_policy !== "" &&
            shipping_and_returns_dropdown !== ""
        );
      } else {
        setExistingPolicy(false);
      }
    } catch (error) {
      console.error("Error fetching customer service:", error);
      setExistingPolicy(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to save?");

    if (!confirmed) {
      return;
    }

    try {
      const policyData = {
        shippingAndReturnsPage,
        shippingAndReturnsDropdown,
        privacyPolicy,
        shippingOptions,
      };
      const url = existingPolicy
        ? process.env.REACT_APP_EDIT_CUSTOMER_SERVICE
        : process.env.REACT_APP_CREATE_CUSTOMER_SERVICE;

      const policyResponse = await fetch(url, {
        method: existingPolicy ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(policyData),
      });

      if (!policyResponse.ok) {
        throw new Error("Failed to save customer service");
      }

      alert("Customer service updated successfully");
      fetchPolicy();
    } catch (error) {
      console.error("Error saving customer service:", error);
      alert("Failed to save customer service. Please try again.");
    }
  };

  const handleShippingOptionChange = (index, field, value) => {
    const updatedShippingOptions = [...shippingOptions];
    const numericValue = Number(value);

    if (field === "min_days" || field === "max_days") {
      const clampedValue = numericValue < 0 ? 0 : numericValue;
      updatedShippingOptions[index][field] = clampedValue;

      const minDays = updatedShippingOptions[index].min_days || 0;
      const maxDays = updatedShippingOptions[index].max_days || 0;

      if (field === "min_days" && clampedValue > maxDays) {
        updatedShippingOptions[index].max_days = clampedValue;
      }

      if (field === "max_days" && clampedValue < minDays) {
        updatedShippingOptions[index].min_days = clampedValue;
      }
    } else {
      updatedShippingOptions[index][field] = value;
    }

    setShippingOptions(updatedShippingOptions);
  };

  const addShippingOption = () => {
    setShippingOptions([
      ...shippingOptions,
      { display_name: "", amount: 0, min_days: 0, max_days: 0 },
    ]);
  };

  const handleDeleteShippingOption = (index) => {
    const updatedShippingOptions = shippingOptions.filter(
      (_, i) => i !== index
    );
    setShippingOptions(updatedShippingOptions);
  };

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
  ];

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="customer-service-form-container">
      <h1 className="customer-service-form-header">
        {existingPolicy ? "Edit Customer Service" : "Create Customer Service"}
      </h1>

      <Tooltip
        title={
          <>
            <strong>Shipping & Returns - Policy Page:</strong> Enter the
            shipping and returns policies and instructions for your company. The
            information provided here will be displayed publicly on your
            website's shipping and returns page to help users understand your
            policies.
          </>
        }
        placement="left"
      >
        <label className="customer-service-label">
          Shipping & Returns - Policy Page <HiOutlineInformationCircle />{" "}
        </label>
      </Tooltip>

      <ReactQuill
        value={shippingAndReturnsDropdown}
        onChange={setShippingAndReturnsDropdown}
        modules={quillModules}
        formats={quillFormats}
        className="custom-quill-editor"
      />

      <Tooltip
        title={
          <>
            <strong>Shipping & Returns - Products Page:</strong> Enter a brief
            summary of your shipping and returns policies. This will be
            displayed as a dropdown on product pages for quick reference.
          </>
        }
        placement="left"
      >
        <label className="customer-service-label">
          Shipping & Returns - Products Page <HiOutlineInformationCircle />{" "}
        </label>
      </Tooltip>

      <ReactQuill
        value={shippingAndReturnsPage}
        onChange={setShippingAndReturnsPage}
        modules={quillModules}
        formats={quillFormats}
        className="custom-quill-editor"
      />

      <Tooltip
        title={
          <>
            <strong>Privacy Policy:</strong> Enter your company's privacy
            policy. This will be displayed on a publicly accessible page via the
            website footer to inform users how their data is handled.
          </>
        }
        placement="left"
      >
        <label className="customer-service-label">
          Privacy Policy <HiOutlineInformationCircle />{" "}
        </label>
      </Tooltip>

      <ReactQuill
        value={privacyPolicy}
        onChange={setPrivacyPolicy}
        modules={quillModules}
        formats={quillFormats}
        className="custom-quill-editor"
      />

      <div>
        <Tooltip
          title={
            <>
              <strong>Shipping Services:</strong> Set up your delivery options
              and pricing. These options will be available for users to select
              during checkout via Stripe.
            </>
          }
          placement="left"
        >
          <label className="customer-service-label">
            Shipping Services <HiOutlineInformationCircle />{" "}
          </label>
        </Tooltip>

        {shippingOptions.map((option, index) => (
          <div key={index} className="shipping-option">
            <TextField
              label="Enter Title"
              variant="outlined"
              value={option.display_name}
              onChange={(e) =>
                handleShippingOptionChange(
                  index,
                  "display_name",
                  e.target.value
                )
              }
            />
            <TextField
              label="Enter Price (in pennies)"
              variant="outlined"
              type="number"
              value={option.amount}
              onChange={(e) =>
                handleShippingOptionChange(index, "amount", e.target.value)
              }
            />
            <TextField
              label="Enter Min Days"
              variant="outlined"
              type="number"
              value={option.min_days}
              onChange={(e) =>
                handleShippingOptionChange(index, "min_days", e.target.value)
              }
            />
            <TextField
              label="Enter Max Days"
              variant="outlined"
              type="number"
              value={option.max_days}
              onChange={(e) =>
                handleShippingOptionChange(index, "max_days", e.target.value)
              }
            />
            <button
              onClick={() => handleDeleteShippingOption(index)}
              className="delete-button"
            >
              <IoMdRemoveCircle className="delete-icon" size={30} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addShippingOption} className="add-button">
        <AddToPhotosIcon /> Add Option
      </button>

      <button
        type="submit"
        onClick={handleEditSubmit}
        className="customer-service-save-button"
      >
        <SaveAltIcon className="save-icon" /> Save
      </button>
    </div>
  );
}

export default CustomerServiceForm;
