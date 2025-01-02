import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import "./HomePageManagement.css";

import { IoMdRemoveCircle } from "react-icons/io";
import { FaImages } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

function HomePageManagement() {
  const [homeBanner, setHomeBanner] = useState([]);
  const [homeLogo, setHomeLogo] = useState("");
  const [homeOurStoryImage, setHomeOurStoryImage] = useState("");
  const [homeOurStoryText, setHomeOurStoryText] = useState("");
  const [homeAsSeen, setHomeAsSeen] = useState([]);
  const [existingHomePage, setExistingHomePage] = useState(false);

  useEffect(() => {
    fetchHomePage();
  }, []);

  const fetchHomePage = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GET_HOMEPAGE);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const {
          home_image: fetchedhomeBanner,
          home_logo: fetchedHomeLogo,
          home_story_image: fetchedHomeOurStoryImage,
          home_story_text: fetchedHomeOurStoryText,
          home_as_seen: fetchedAsSeen,
        } = data[0];

        const bannerArray = JSON.parse(fetchedhomeBanner);
        const asSeenArray = JSON.parse(fetchedAsSeen);
        setHomeBanner(bannerArray);
        setHomeLogo(fetchedHomeLogo);
        setHomeOurStoryImage(fetchedHomeOurStoryImage);
        setHomeOurStoryText(fetchedHomeOurStoryText);
        setHomeAsSeen(asSeenArray);
        setExistingHomePage(true);
      } else {
        setExistingHomePage(false);
      }
    } catch (error) {
      console.error("Error fetching home page:", error);
      setExistingHomePage(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to save?");

    if (!confirmed) {
      return;
    }

    try {
      const body = {
        homeImages: homeBanner,
        homeLogo,
        homeOurStoryImage,
        homeOurStoryText,
        homeAsSeen,
      };

      const endpoint = existingHomePage
        ? process.env.REACT_APP_EDIT_HOMEPAGE
        : process.env.REACT_APP_CREATE_HOMEPAGE;
      const method = existingHomePage ? "PUT" : "POST";

      const homePageResponse = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!homePageResponse.ok) {
        throw new Error("Failed to save home page");
      }

      alert("Home Page updated successfully");
    } catch (error) {
      console.error("Error editing/creating home page:", error);
      alert("Failed to edit/create home page. Please try again.");
    }
  };

  const handleAddBanner = () => {
    setHomeBanner([...homeBanner, ""]);
  };

  const handleBannerChange = (index, value) => {
    const newImageUrls = [...homeBanner];
    newImageUrls[index] = value;
    setHomeBanner(newImageUrls);
  };

  const handleRemoveBanner = (index) => {
    const newImageUrls = [...homeBanner];
    newImageUrls.splice(index, 1);
    setHomeBanner(newImageUrls);
  };

  const handleAddAsSeen = () => {
    setHomeAsSeen([...homeAsSeen, ""]);
  };

  const handleAsSeenChange = (index, value) => {
    const newImageUrls = [...homeAsSeen];
    newImageUrls[index] = value;
    setHomeAsSeen(newImageUrls);
  };

  const handleRemoveAsSeen = (index) => {
    const newImageUrls = [...homeAsSeen];
    newImageUrls.splice(index, 1);
    setHomeAsSeen(newImageUrls);
  };

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

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

  return (
    <div className="container">
      <div>
        <h1 className="header">
          {existingHomePage ? "Edit Home Page" : "Create Home Page"}
        </h1>

        <div
          style={{
            alignItems: "center",
            marginTop: "15px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Tooltip
            title="Upload URLs for your banner images here. If hosting externally, ensure they are stored securely to avoid broken links. You can add multiple images to create a carousel, or just one for a static banner. Arrange them in your preferred order."
            placement="left"
          >
            <label className="infoTitle">
              Banner Images
              <HiOutlineInformationCircle
                size={20}
                style={{ color: "black" }}
              />
            </label>
          </Tooltip>
        </div>

        {Array.isArray(homeBanner) &&
          homeBanner.map((url, index) => (
            <div key={index} className="inputContainer">
              <TextField
                type="text"
                label="Enter Image URL"
                variant="outlined"
                value={url}
                onChange={(e) => handleBannerChange(index, e.target.value)}
                className="inputField"
              />
              {homeBanner.length > 1 && (
                <button
                  onClick={() => handleRemoveBanner(index)}
                  className="removeButton"
                >
                  <IoMdRemoveCircle size={30} color="black" />
                </button>
              )}
            </div>
          ))}

        <button onClick={handleAddBanner} className="addButton">
          <FaImages size={20} /> Add Image
        </button>

        <Tooltip
          title="Upload the URL for your brand's main logo or image here. This image will be used across various parts of the website, so ensure it is hosted securely to prevent broken links."
          placement="left"
        >
          <label className="infoTitle">
            Brand Logo
            <HiOutlineInformationCircle size={20} style={{ color: "black" }} />
          </label>
        </Tooltip>

        <div className="inputContainer">
          <TextField
            type="text"
            label="Enter The Websites Brand's Logo"
            variant="outlined"
            id="homeLogo"
            name="homeLogo"
            value={homeLogo}
            onChange={(e) => setHomeLogo(e.target.value)}
            className="inputField"
          />
        </div>

        <Tooltip
          title="Upload the URL for an image that represents your brand's story. This image will be displayed alongside your message in the 'Our Story' section on the homepage. Please ensure the image is hosted externally for reliable display."
          placement="left"
        >
          <label className="infoTitle">
            Our Story Image
            <HiOutlineInformationCircle size={20} style={{ color: "black" }} />
          </label>
        </Tooltip>

        <div className="inputContainer">
          <TextField
            type="text"
            label="Enter The URL for the Our Story Image"
            variant="outlined"
            id="homeOurStoryImage"
            name="homeOurStoryImage"
            value={homeOurStoryImage}
            onChange={(e) => setHomeOurStoryImage(e.target.value)}
            className="inputField"
          />
        </div>

        <Tooltip
          title="Write a compelling message that shares your brand's story. This content will be displayed alongside the image in the 'Our Story' section on the homepage, helping visitors connect with your brand."
          placement="left"
        >
          <label className="infoTitle">
            Our Story Content
            <HiOutlineInformationCircle size={20} style={{ color: "black" }} />
          </label>
        </Tooltip>

        <ReactQuill
          value={homeOurStoryText}
          onChange={setHomeOurStoryText}
          modules={quillModules}
          formats={quillFormats}
          className="custom-quill-editor"
        />

        <div
          style={{
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "0px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Tooltip
            title="Upload the URLs of brand-related photos to be displayed in the 'As Seen On' section at the bottom of the homepage. These images will be arranged in a responsive grid, with up to 4 images per row. Ensure your images are hosted externally for proper display."
            placement="left"
          >
            <div className="infoTitle">
              As Seen On
              <HiOutlineInformationCircle
                size={20}
                style={{ color: "black" }}
              />
            </div>
          </Tooltip>
        </div>

        {Array.isArray(homeAsSeen) &&
          homeAsSeen.map((url, index) => (
            <div key={index} className="inputContainer">
              <input
                type="text"
                value={url}
                onChange={(e) => handleAsSeenChange(index, e.target.value)}
                className="inputField"
              />
              {homeAsSeen.length > 1 && (
                <button
                  onClick={() => handleRemoveAsSeen(index)}
                  className="removeButton"
                >
                  <IoMdRemoveCircle size={30} />
                </button>
              )}
            </div>
          ))}

        <button onClick={handleAddAsSeen} className="addButton">
          <FaImages size={20} /> Add Image
        </button>
      </div>
      <button
        type="submit"
        onClick={handleEditSubmit}
        className="homepage-save-button"
      >
        <SaveAltIcon className="save-icon" /> Save
      </button>
    </div>
  );
}

export default HomePageManagement;
