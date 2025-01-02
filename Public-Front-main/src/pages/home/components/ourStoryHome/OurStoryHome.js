import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { FaLongArrowAltRight } from "react-icons/fa";
import styled from "styled-components";

function OurStoryHome() {
  const [homeOurStoryImage, setHomeOurStoryImage] = useState("");
  const [homeOurStoryText, setHomeOurStoryText] = useState("");

  useEffect(() => {
    const fetchOurStory = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_GET_HOMEPAGE);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const ourStoryData = await response.json();

        setHomeOurStoryImage(ourStoryData[0]?.home_story_image || "");
        setHomeOurStoryText(ourStoryData[0]?.home_story_text || "");
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchOurStory();
  }, []);

  const isMobile = useMediaQuery({ query: "(max-width: 868px)" });

  const ourStoryButton = {
    width: isMobile ? "50%" : "25%",
    borderColor: "#F9C1A0",
    color: "#F9C1A0",
    backgroundColor: "transparent",
    padding: "10px",
    marginTop: "30px",
    textAlign: "center",
  };

  return (
    <div>
      <div style={headerContainerStyle}>
        <div style={headerContentStyle}>
          <h2
            style={{
              fontFamily: "Sans-serif",
              fontSize: "55px",
              paddingTop: "30px",
              marginBottom: "10px",
              color: "#7D775D",
              fontWeight: "bolder",
            }}
          >
            Our Story
            <span style={{ color: "#F9C1A0", fontWeight: "bolder" }}>.</span>
          </h2>
          <h3
            style={{
              fontFamily: "Sans-serif",
              fontSize: "25px",
              color: "#7D775D",
              marginBottom: "20px",
            }}
          >
            We nurture a community of coffee purists, who, just <br />
            like us,{" "}
            <span style={{ color: "#F9C1A0", fontWeight: "bolder" }}>
              champion taste
            </span>
            , quality and ethical values
            <span style={{ color: "#F9C1A0", fontWeight: "bolder" }}>.</span>
          </h3>
        </div>
      </div>

      <div style={imageWrapperStyle}>
        <img src={homeOurStoryImage} alt="Our Story" style={imageStyle} />
      </div>

      <div style={textWrapperStyle}>
        <div style={textContainerStyle}>
          <StyledContent>
            <div dangerouslySetInnerHTML={{ __html: homeOurStoryText }} />
          </StyledContent>
          <Button style={ourStoryButton}>
            Our Story
            <FaLongArrowAltRight
              style={{ color: "#F9C1A0", marginLeft: "10px" }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

const headerContainerStyle = {
  backgroundColor: "#FEF3ED",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "530px",
  width: "100%",
  padding: "30px 0",
  marginTop: "100px",
};

const headerContentStyle = {
  textAlign: "left",
  alignSelf: "flex-start",
  marginLeft: "25%",
};

const imageWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "-300px",
};

const imageStyle = {
  width: "50%",
  height: "auto",
  maxHeight: "600px",
  objectFit: "cover",
};

const textWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  padding: "60px 20px",
};

const textContainerStyle = {
  width: "55%",
  paddingLeft: "25px",
  textAlign: "left",
};

const StyledContent = styled.div`
  p {
    font-size: 25px;
    font-family: Sans-serif;
    color: #7d775d;
  }
`;

export default OurStoryHome;
