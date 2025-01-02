import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import "./BrandManagement.css";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { HiOutlineInformationCircle } from "react-icons/hi2";

function BrandManagement() {
  const [brandName, setBrandName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [ourStory, setOurStory] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [existingBrand, setExistingBrand] = useState(false);

  useEffect(() => {
    fetchBrand();
  }, []);

  const fetchBrand = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_BRAND);

      if (response.ok) {
        const brand = await response.json();

        setBrandName(brand.brand_name || "");
        setTagLine(brand.tag_line || "");
        setOurStory(brand.our_story || "");
        setFacebookLink(brand.facebook_link || "");
        setInstagramLink(brand.instagram_link || "");
        setExistingBrand(true);
      } else {
        console.error("Failed to fetch brand data:", response.statusText);
        setExistingBrand(false);
      }
    } catch (error) {
      console.error("Error fetching brand:", error);
      setExistingBrand(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to save?");
    if (!confirmed) return;

    try {
      const apiUrl = process.env.REACT_APP_PUT_POST;
      const method = existingBrand ? "PUT" : "POST";

      const brandResponse = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName,
          tagLine,
          ourStory,
          facebookLink,
          instagramLink,
        }),
      });

      if (!brandResponse.ok) {
        throw new Error(`Failed to ${existingBrand ? "edit" : "create"} brand`);
      }

      alert("Brand updated successfully");

      fetchBrand();
    } catch (error) {
      console.error(
        `Error ${existingBrand ? "editing" : "creating"} brand:`,
        error
      );
      alert(
        `Failed to ${
          existingBrand ? "edit" : "create"
        } brand. Please try again.`
      );
    }
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

  if (loading) return <Loader />;

  return (
    <div className="brand-management-container">
      <h1 className="brand-management-header">
        {existingBrand ? "Edit Your Brand" : "Create Your Brand"}
      </h1>

      <div className="brand-management-fields">
        <Tooltip
          title={
            <>
              <strong>Brand:</strong> Enter in the name of your Brand or
              Company.
            </>
          }
          placement="left"
        >
          <label>
            Brand Name <HiOutlineInformationCircle />
          </label>
        </Tooltip>
        <div className="custom-quill-editor">
          <ReactQuill
            value={brandName}
            onChange={setBrandName}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        <Tooltip
          title={
            <>
              <strong>Tag Line:</strong> Enter in a tag line for your brand and
              it'll appear as a small statement at the bottom of the footer on
              the public facing pages.
            </>
          }
          placement="left"
        >
          <label>
            Tag Line <HiOutlineInformationCircle />
          </label>
        </Tooltip>
        <div className="custom-quill-editor">
          <ReactQuill
            value={tagLine}
            onChange={setTagLine}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        <Tooltip
          title={
            <>
              <strong>Our Story:</strong> Enter the story behind your brand.
            </>
          }
          placement="left"
        >
          <label>
            Our Story <HiOutlineInformationCircle />
          </label>
        </Tooltip>
        <div className="custom-quill-editor">
          <ReactQuill
            value={ourStory}
            onChange={setOurStory}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>
        <div className="brand-management-social-links">
          <Tooltip title="Enter your Facebook link" placement="left">
            <TextField
              label="Facebook Link"
              variant="outlined"
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              fullWidth
            />
          </Tooltip>
          <Tooltip title="Enter your Instagram link" placement="left">
            <TextField
              label="Instagram Link"
              variant="outlined"
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              fullWidth
            />
          </Tooltip>
        </div>
      </div>

      <button
        type="submit"
        onClick={handleEditSubmit}
        className="brand-management-save-button"
      >
        <SaveAltIcon className="save-icon" /> Save
      </button>
    </div>
  );
}

export default BrandManagement;
