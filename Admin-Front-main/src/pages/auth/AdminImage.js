import React, { useEffect, useState } from "react";

function AdminImage() {
  const [homeImages, setHomeImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_GET_HOMEPAGE);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productsImages = await response.json();
        setHomeImages(productsImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const homeLogo = homeImages.map((logo) => logo.home_logo)[0];

  return (
    <div style={imageContainerStyle}>
      <img
        src={homeLogo}
        alt="Admin Image"
        style={imageStyle}
      />
    </div>
  );
}

const imageContainerStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const imageStyle = {
  width: "100%",
  maxWidth: "500px", 
  height: "auto",
  borderRadius: "5px",
};

export default AdminImage;
