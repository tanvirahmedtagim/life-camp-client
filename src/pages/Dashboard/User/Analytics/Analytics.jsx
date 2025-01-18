import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered/${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold">Loading chart data...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold">
        Error loading chart data: {error.message}
      </p>
    );

  // Transform data for the chart
  const chartData = transactions.reduce(
    (acc, item) => {
      acc.labels.push(item.campName); // Camp names
      acc.fees.push(Number(item.fees)); // Fees as numbers
      return acc;
    },
    { labels: [], fees: [] }
  );

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Fees Collected",
        data: chartData.fees,
        backgroundColor:
          "linear-gradient(180deg, rgba(0,128,128,1) 0%, rgba(0,200,200,0.5) 100%)",
        borderColor: "rgba(0, 128, 128, 1)", // Teal border
        borderWidth: 2,
        hoverBackgroundColor: "rgba(0, 200, 200, 0.8)", // Highlight color on hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
            weight: "bold",
          },
          color: "#333",
        },
      },
      title: {
        display: true,
        text: `Registered Camps for ${user.email}`,
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        color: "#008080",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Fees: $${tooltipItem.raw}`,
        },
        backgroundColor: "rgba(0, 128, 128, 0.8)",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#008080",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 128, 128, 0.1)",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#008080",
          font: {
            size: 12,
            weight: "bold",
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
        Analytics
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Analytics;
