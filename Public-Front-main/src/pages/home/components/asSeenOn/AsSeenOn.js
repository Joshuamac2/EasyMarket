import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function AsSeenOn() {
  const [asSeenOnImages, setAsSeenOnImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_GET_HOMEPAGE);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const homePageData = await response.json();
        const flattenedImages = homePageData.flatMap((item) =>
          JSON.parse(item.home_as_seen)
        );
        setAsSeenOnImages(flattenedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div
        style={{
          fontFamily: "Sans-serif",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          paddingLeft: "60px",
          paddingTop: "50px",
        }}
      >
        <h2
          style={{ color: "#7D775D", fontSize: "55px", fontWeight: "bolder" }}
        >
          As Seen On
          <span style={{ color: "#F9C1A0", fontWeight: "bolder" }}>.</span>
        </h2>
        <h2 style={{ color: "#F9C1A0", fontSize: "45px" }}>@CRUKAFE</h2>
      </div>

      <div style={{ position: "relative", marginBottom: "50px" }}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          infiniteLoop={true}
          centerSlidePercentage={33.33}
          emulateTouch={true}
          autoPlay={true}
          interval={6000}
        >
          {asSeenOnImages.map((imageUrl, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                margin: "0 30px",
              }}
            >
              <img
                src={imageUrl}
                alt="As Seen On"
                style={{
                  width: "100%",
                  height: "600px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default AsSeenOn;
