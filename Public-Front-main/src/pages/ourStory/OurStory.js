import React, { useState, useEffect } from "react";

function OurStory() {
  const [ourStory, setOurStory] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_GET_BRAND}`);
        if (response.ok) {
          const data = await response.json();

          if (data && data.our_story) {
            setOurStory(data.our_story);
          } else {
            setOurStory("");
          }
        } else {
          console.error("Response was not ok:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginTop: "30px", marginBottom: "50px" }}>Our Story</h1>
      <div
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left",
          marginBottom: "100px",
        }}
        dangerouslySetInnerHTML={{ __html: ourStory }}
      />
    </div>
  );
}

export default OurStory;
