import React, { useState, useEffect } from "react";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import "./EmailTemplateManagement.css";

import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function EmailTemplateManagement() {
  const [purchaseEmail, setPurchaseEmail] = useState("");
  const [newsLetterEmail, setNewsLetterEmail] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [listId, setListId] = useState("");
  const [existingEmailTemplates, setExistingEmailTemplates] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_EMAIL_TEMPLATE);
      if (response.ok) {
        const data = await response.json();

        const hasData =
          data.purchase_email ||
          data.newsletter_email ||
          data.contact_email ||
          data.my_email ||
          data.list_id;

        setPurchaseEmail(data.purchase_email || "");
        setNewsLetterEmail(data.newsletter_email || "");
        setContactEmail(data.contact_email || "");
        setMyEmail(data.my_email || "");
        setListId(data.list_id || "");
        setExistingEmailTemplates(!!hasData);
      } else {
        setExistingEmailTemplates(false);
      }
    } catch (error) {
      console.error("Error fetching email templates:", error);
      setExistingEmailTemplates(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to save?");
    if (!confirmed) return;

    try {
      const templateData = {
        purchaseEmail,
        newsLetterEmail,
        contactEmail,
        myEmail,
        listId,
      };

      const endpoint = existingEmailTemplates
        ? process.env.REACT_APP_EDIT_EMAIL_TEMPLATE
        : process.env.REACT_APP_CREATE_EMAIL_TEMPLATE;
      const method = existingEmailTemplates ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${
            existingEmailTemplates ? "edit" : "create"
          } email templates`
        );
      }

      alert("Email template saved successfully");
      fetchTemplates();
    } catch (error) {
      console.error(
        `Error ${
          existingEmailTemplates ? "editing" : "creating"
        } email templates:`,
        error
      );
      alert(
        `Failed to ${
          existingEmailTemplates ? "edit" : "create"
        } email template. Please try again.`
      );
    }
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="email-template-container">
      <h1 className="email-template-header">
        {existingEmailTemplates
          ? "Edit My Email & Templates"
          : "Set My Email & Templates"}
      </h1>

      <h2 className="email-template-subheader">Email Templates</h2>
      <div className="email-template-section">
        <div className="email-template-field-container">
          <Tooltip
            title="This is the email template used when a user makes a purchase."
            placement="left"
          >
            <label className="email-template-label">
              Purchase Template{" "}
              <HiOutlineInformationCircle className="info-icon" />
            </label>
          </Tooltip>
          <TextField
            type="text"
            label="Purchase Confirmation Email Template ID"
            variant="outlined"
            value={purchaseEmail}
            onChange={handleInputChange(setPurchaseEmail)}
            className="email-template-field"
          />
        </div>

        <div className="email-template-field-container">
          <Tooltip
            title="This is the email template used for newsletter sign-ups."
            placement="left"
          >
            <label className="email-template-label">
              Newsletter Template
              <HiOutlineInformationCircle className="info-icon" />
            </label>
          </Tooltip>
          <TextField
            type="text"
            label="Newsletter Email Template ID"
            variant="outlined"
            value={newsLetterEmail}
            onChange={handleInputChange(setNewsLetterEmail)}
            className="email-template-field"
          />
        </div>

        <div className="email-template-field-container">
          <Tooltip
            title="This is the email template used when a user contacts the company."
            placement="left"
          >
            <label className="email-template-label">
              Contact Template{" "}
              <HiOutlineInformationCircle className="info-icon" />
            </label>
          </Tooltip>

          <TextField
            type="text"
            label="Contact Email Template ID"
            variant="outlined"
            value={contactEmail}
            onChange={handleInputChange(setContactEmail)}
            className="email-template-field"
          />
        </div>
      </div>

      <h2 className="email-template-subheader">Company Details</h2>
      <div className="email-template-section">
        <div className="email-template-field-container">
          <Tooltip
            title="This is the primary company email address used for sending emails."
            placement="left"
          >
            <label className="email-template-label">
              Company Email <HiOutlineInformationCircle className="info-icon" />
            </label>
          </Tooltip>

          <TextField
            type="text"
            label="Company Email"
            variant="outlined"
            value={myEmail}
            onChange={(e) => setMyEmail(e.target.value)}
            className="email-template-field"
          />
        </div>

        <div className="email-template-field-container">
          <Tooltip
            title="The List ID helps track newsletter sign-ups in Klaviyo."
            placement="left"
          >
            <label className="email-template-label">
              List ID <HiOutlineInformationCircle className="info-icon" />
            </label>
          </Tooltip>

          <TextField
            type="text"
            label="Klaviyo List ID"
            variant="outlined"
            value={listId}
            onChange={handleInputChange(setListId)}
            className="email-template-field"
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="email-template-save-button"
      >
        <SaveAltIcon /> Save
      </button>
    </div>
  );
}

export default EmailTemplateManagement;
