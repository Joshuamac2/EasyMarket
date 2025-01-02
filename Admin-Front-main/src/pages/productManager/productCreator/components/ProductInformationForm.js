import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import "./ProductInformationForm.css";

import { FaImages } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoMdRemoveCircle } from "react-icons/io";

function ProductInformationForm({
  title,
  setTitle,
  description,
  setDescription,
  product_details,
  setProductDetails,
  size_and_fit,
  setSizeAndFit,
  image_url,
  setImage_url,
}) {
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

  const handleAddImage = () => {
    setImage_url([...image_url, ""]);
  };

  const handleImageChange = (index, value) => {
    const newImageUrls = [...image_url];
    newImageUrls[index] = value;
    setImage_url(newImageUrls);
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = [...image_url];
    newImageUrls.splice(index, 1);
    setImage_url(newImageUrls);
  };

  return (
    <div className="product-form-container">
      <div className="product-form-header">
        <label className="form-header">Product Details</label>
        <h5 className="form-subheader">
          Provide all the information and details of your product
        </h5>
      </div>
      <label htmlFor="title" className="form-label">
        Title
      </label>
      <div>
        <TextField
          label="Enter Title"
          variant="outlined"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-field"
        />
        <br />

        <label htmlFor="description" className="form-label">
          Description
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={quillModules}
          formats={quillFormats}
          className="custom-quill-editor"
        />
        <label className="form-label">Product Details</label>
        <ReactQuill
          value={product_details}
          onChange={setProductDetails}
          modules={quillModules}
          formats={quillFormats}
          className="custom-quill-editor"
        />
        <label className="form-label">Size & Fit</label>
        <ReactQuill
          value={size_and_fit}
          onChange={setSizeAndFit}
          modules={quillModules}
          formats={quillFormats}
          className="custom-quill-editor"
        />
      </div>
      <div>
        <Tooltip
          title={
            <>
              <strong>Images:</strong> The first image will be displayed as the
              main product image, while the second image will be shown when the
              product is hovered over.
              <br />
              Ensure that the images are hosted on a reliable platform to avoid
              issues with images being taken down.
            </>
          }
          placement="left"
        >
          <div className="form-label">
            Images{" "}
            <HiOutlineInformationCircle size={20} style={{ color: "black" }} />
          </div>
        </Tooltip>
      </div>

      {image_url.map((url, index) => (
        <div key={index} className="image-input-group">
          <TextField
            label="Enter image URL"
            variant="outlined"
            type="text"
            className="image-input"
            value={url}
            onChange={(e) => handleImageChange(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="remove-image-button"
          >
            <IoMdRemoveCircle size={30} color="black" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddImage}
        className="add-image-button"
      >
        <FaImages className="button-icon" size={20} />
        <span className="button-text">Add Image</span>
      </button>
    </div>
  );
}

export default ProductInformationForm;
