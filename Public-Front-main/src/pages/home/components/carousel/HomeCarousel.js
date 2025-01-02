import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomeCarousel.css";

function Home() {
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

  const carouselImages = homeImages.flatMap((image) =>
    JSON.parse(image.home_image)
  );

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        renderIndicator={() => null}
        renderThumbs={() => null}
      >
        {carouselImages.map((imageUrl, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={imageUrl}
              alt={`Id ${index}`}
              style={{
                width: "100%",
                height: "70vh",
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#F9C1A0",
                opacity: 0.4,
                zIndex: 1,
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: "25%",
                right: "45%",
                zIndex: 1,
                color: "white",
                textAlign: "left",
              }}
            >
              <h1
                style={{
                  fontSize: "80px",
                  fontWeight: "bolder",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Organic coffee <br />
                with{" "}
                <span style={{ color: "#F9C1A0", fontWeight: "bolder" }}>
                  nothing
                </span>{" "}
                to hide
                <span style={{ color: "#F9C1A0" }}>.</span>
              </h1>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid white",
                  fontSize: "1.5rem",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontWeight: "bolder",
                }}
              >
                Shop now
              </button>
            </div>
          </div>
        ))}
      </Carousel>
      <style>{`
        .carousel .control-dots {
          display: none;
        }

        .carousel .control-arrow {
          color: white;
        }
      `}</style>
    </div>
  );
}

export default Home;
