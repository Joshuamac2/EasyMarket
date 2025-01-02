import React from "react";
import TotalWebsiteViews from "./components/TotalWebsiteViews";
import MonthWebsiteViews from "./components/MonthWebsiteViews";
import MostSoldProduct from "./components/MostSoldProduct";
import SalesPerformance from "./components/SalesPerformance";
import TotalSales from "./components/TotalSales";
import Loader from "../../components/loader/Loader.js";
import UseLoader from "../../components/loader/components/UseLoader.js";

function Analytics({ orderData, data }) {
  const loading = UseLoader(2000);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div style={styles.analyticsContainer}>
        <div style={styles.rowContainer}>
          <div style={styles.componentBox}>
            <TotalSales orderData={orderData} />
          </div>
          <div style={styles.componentBox}>
            <MostSoldProduct orderData={orderData} />
          </div>
          <div style={styles.componentBox}>
            <TotalWebsiteViews data={data} />
          </div>
          <div style={styles.componentBox}>
            <MonthWebsiteViews data={data} />
          </div>
        </div>

        <div style={styles.singleComponentContainer}>
          <SalesPerformance orderData={orderData} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  analyticsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "20px",
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    gap: "20px",
    marginBottom: "20px",
  },
  componentBox: {
    flexBasis: "calc(25% - 15px)",
    minWidth: "200px",
    textAlign: "center",
  },
  singleComponentContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default Analytics;
