import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  const totalSpending = chartData.fees.reduce((sum, fee) => sum + fee, 0);
  const numberOfCamps = transactions.length;
  const averageSpendingPerCamp = numberOfCamps
    ? totalSpending / numberOfCamps
    : 0;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Fees Collected",
        data: chartData.fees,
        backgroundColor: "rgba(0, 128, 128, 0.6)", // Teal with transparency
        borderColor: "rgba(0, 128, 128, 1)", // Solid teal border
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Camps",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Fees Collected",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...chartData.fees) + 10,
        ticks: {
          color: "#333",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
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
    },
  };

  return (
    <div className="w-11/12  mx-auto  bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
        Analytics
      </h2>
      <div className="flex justify-between gap-5 mb-6">
        <div className="w-full lg:w-1/3 bg-teal-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-teal-600">
            Total Spending
          </h3>
          <p className="text-2xl text-teal-500">${totalSpending.toFixed(2)}</p>
        </div>
        <div className="w-full lg:w-1/3 bg-teal-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-teal-600">
            Number of Camps
          </h3>
          <p className="text-2xl text-teal-500">{numberOfCamps}</p>
        </div>
        <div className="w-full lg:w-1/3 bg-teal-100 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-teal-600">
            Avg Spending per Camp
          </h3>
          <p className="text-2xl text-teal-500">
            ${averageSpendingPerCamp.toFixed(2)}
          </p>
        </div>
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        {" "}
        {/* Control size here */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Analytics;
