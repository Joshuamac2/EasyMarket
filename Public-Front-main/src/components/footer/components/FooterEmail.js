import React, { useState } from "react";

function FooterEmail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_NEWS_LETTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Newsletter sent successfully!");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to send the request. Please try again later.");
    }

    setEmail("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "left" }}>
      <h1 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
        NEWSLETTER SIGN UP
      </h1>
      <h4 style={{ fontSize: "0.9em" }}>Get 10% off</h4>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            marginRight: "10px",
            padding: "5px",
            border: "1px solid white",
            width: "100%",
          }}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: "white",
            border: "1px solid white",
            color: "#413E39",
            padding: "5px 15px",
            cursor: "pointer",
            marginTop: "10px",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FooterEmail;
