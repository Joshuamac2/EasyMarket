import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ProductImageCarousel({ imageUrls }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        {imageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Product ${index + 1}`}
            style={{
              display: "block",
              marginBottom: "10px",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              cursor: "pointer",
              border:
                index === selectedImageIndex ? "2px solid #413E39" : "none",
              borderRadius: "10px",
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <Carousel
          showThumbs={false}
          dynamicHeight={true}
          autoPlay={true}
          infiniteLoop={true}
          selectedItem={selectedImageIndex}
          onChange={setSelectedImageIndex}
          showStatus={false}
        >
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Product ${index + 1}`}
                style={{
                  display: "block",
                  margin: "auto",
                  maxWidth: "450px",
                  maxHeight: "600px",
                  marginBottom: "10px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ProductImageCarousel;
