import React from "react";
import { RiBankFill } from "react-icons/ri";

function TotalSales({ orderData }) {
  const grandTotal = orderData
    .reduce((total, order) => total + parseFloat(order.total || 0), 0)
    .toFixed(2);

  return (
    <div style={styles.container}>
      <RiBankFill style={styles.icon} size={70} color="#004d3a" />
      <div style={styles.total}>£{grandTotal}</div>
      <h4 style={styles.heading}>Total Sales</h4>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    marginBottom: "10px",
  },
  total: {
    fontWeight: "bold",
    fontSize: "35px",
    margin: "10px 0",
    color: "black",
  },
  heading: {
    fontWeight: "bold",
    color: "grey",
  },
};

export default TotalSales;
