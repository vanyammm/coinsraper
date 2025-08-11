"use client";

import {useMediaQuery} from "@/hooks/useMediaQuery";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  ChartOptions,
  LogarithmicScale,
} from "chart.js";
import {useEffect, useMemo, useRef} from "react";
import {Line} from "react-chartjs-2";

import "chartjs-adapter-date-fns";

ChartJS.register(
  LogarithmicScale,
  TimeScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartDataset {
  label: string;
  data: [number, number][];
}

interface CryptoChartProps {
  chartDatasets: ChartDataset[];
  periodLabel: string;
  yScaleType?: "linear" | "logarithmic";
}

const lineColors = [
  "rgb(53, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(75, 192, 192)",
  "rgb(255, 205, 86)",
  "rgb(153, 102, 255)",
];

export const CryptoChart = ({
  chartDatasets,
  periodLabel,
  yScaleType = "linear",
}: CryptoChartProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chartRef = useRef<ChartJS<"line">>(null);

  useEffect(() => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return;

      const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - touchStartY);

      if (deltaX > deltaY * 1.5) {
        e.preventDefault();
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove, {passive: false});

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#fff",
            padding: 20,
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: `Price Chart (Last ${periodLabel})`,
          color: "#fff",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          type: "time" as const,
          time: {
            unit: "day",
            displayFormats: {
              day: "dd MMM",
            },
          },
          ticks: {color: "#fff"},
        },
        y: {
          type: yScaleType,
          ticks: {
            color: "#fff",
            callback: function (value: number | string) {
              const numericValue =
                typeof value === "string"
                  ? parseFloat(value.replace(/,/g, ""))
                  : value;

              const isCurrentlyMobile = isMobile;
              if (isCurrentlyMobile && yScaleType === "logarithmic") {
                return new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(numericValue);
              }
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(numericValue);
            },
          },
        },
      },
      elements: {
        point: {
          radius: 2,
          hoverRadius: 5,
        },
      },
    }),
    [periodLabel, yScaleType],
  );

  const data = useMemo(
    () => ({
      datasets: chartDatasets.map((dataset, index) => ({
        fill: false,
        label: dataset.label,
        data: dataset.data.map((item) => ({x: item[0], y: item[1]})),
        borderColor: lineColors[index % lineColors.length],
        tension: 0.1,
        borderWidth: 2,
        hoverBorderWidth: 3,
      })),
    }),
    [chartDatasets],
  );

  return <Line ref={chartRef} options={options} data={data} />;
};
