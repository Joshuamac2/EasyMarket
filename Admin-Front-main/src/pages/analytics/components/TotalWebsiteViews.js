import React from "react";
import { MdSupervisorAccount } from "react-icons/md";

function TotalWebsiteViews({ data }) {
  const isLoading = !data || !data.allTime;

  return (
    <div style={styles.container}>
      <MdSupervisorAccount style={styles.icon} size={70} color="#004d3a" />
      <div style={styles.totalViews}>
        {isLoading ? (
          <>
            <div style={styles.viewsPlaceholder}>No Data Available</div>
            <h4 style={styles.title}>Total Visits</h4>
          </>
        ) : (
          <>
            <div style={styles.views}>{data.allTime.views}</div>
            <h4 style={styles.title}>Total Visits</h4>
          </>
        )}
      </div>
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
  totalViews: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  views: {
    fontWeight: "bold",
    fontSize: "35px",
    margin: "10px 0",
    color: "black",
  },
  viewsPlaceholder: {
    fontWeight: "bold",
    fontSize: "20px",
    margin: "20px 0",
    color: "black",
  },
  title: {
    fontWeight: "bold",
    color: "grey",
  },
};

export default TotalWebsiteViews;
