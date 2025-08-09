"use client";

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
import {useMemo} from "react";
import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface CryptoChartProps {
  chartData: [number, number][];
}

export const CryptoChart = ({chartData}: CryptoChartProps) => {
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Price Chart (Last 7 Days)",
          color: "var(--foreground)",
        },
      },
      scales: {
        x: {
          ticks: {color: "var(--foreground)"},
        },
        y: {
          ticks: {color: "var(--foreground)"},
        },
      },
    }),
    [],
  );

  const data = useMemo(
    () => ({
      labels: chartData.map((item) => new Date(item[0]).toLocaleDateString()),
      datasets: [
        {
          fill: true,
          label: "Price",
          data: chartData.map((item) => item[1]),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.2)",
        },
      ],
    }),
    [chartData],
  );

  return <Line options={options} data={data} />;
};
