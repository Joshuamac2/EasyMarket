import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesPerformance = ({ orderData }) => {
  const currentYear = new Date().getFullYear();

  const monthlyData = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const data = monthNames.map((month) => ({ month, total: 0 }));

    if (Array.isArray(orderData)) {
      orderData.forEach((order) => {
        if (order.created_at && order.total) {
          const date = new Date(order.created_at);
          const year = date.getFullYear();

          if (year === currentYear) {
            const monthIndex = date.getMonth();
            const orderTotal = parseFloat(order.total);
            data[monthIndex].total += orderTotal;
          }
        }
      });
    } else {
      console.warn("orderData is not an array:", orderData);
    }

    return data;
  }, [orderData, currentYear]);

  const chartData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: `Sales for ${currentYear}`,
        data: monthlyData.map((d) => d.total),
        fill: false,
        borderColor: "rgb(22, 100, 76)",
        backgroundColor: "rgba(22, 100, 76, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Sales Performance for ${currentYear}`,
        font: {
          size: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales (£)",
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP",
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "white",
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesPerformance;
