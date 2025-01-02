import React from "react";
import { FaRecycle } from "react-icons/fa";
import { GrGrow } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";

function FairTrade() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 0",
        fontFamily: "Sans-serif",
        color: "#7D775D",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <GrGrow size={70} />
        <h2
          style={{
            margin: "10px 0 5px 0",
            fontSize: "22px",
            lineHeight: "1.2",
          }}
        >
          100%{" "}
          <span style={{ color: "#F9C1A0", fontWeight: "bold" }}>Organic.</span>
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            width: "50%",
            margin: 0,
            textAlign: "center",
          }}
        >
          All our coffees are certified organic and produced with natural,
          certified fertilisers.
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaLocationDot size={70} />
        <h2
          style={{
            margin: "10px 0 5px 0",
            fontSize: "22px",
            lineHeight: "1.2",
          }}
        >
          100%{" "}
          <span style={{ color: "#F9C1A0", fontWeight: "bold" }}>
            Fairtrade.
          </span>
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            width: "50%",
            margin: 0,
            textAlign: "center",
          }}
        >
          We work with Fairtrade producers and co-operatives from across the
          globe.
        </p>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaRecycle size={70} />
        <h2
          style={{
            margin: "10px 0 5px 0",
            fontSize: "22px",
            lineHeight: "1.2",
          }}
        >
          100%{" "}
          <span style={{ color: "#F9C1A0", fontWeight: "bold" }}>
            Recyclable.
          </span>
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            width: "50%",
            margin: 0,
            textAlign: "center",
          }}
        >
          From our pods to our packaging, everything's recyclable.
        </p>
      </div>
    </div>
  );
}

export default FairTrade;
