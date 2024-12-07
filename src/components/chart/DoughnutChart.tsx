import React, { useState } from "react";
import Chart from "react-apexcharts";

const DoughnutChart: React.FC = () => {
  const [chartOptions] = useState({
    chart: {
      height: 230,
      width: 230,
      type: "donut" as const,
      zoom: { enabled: false },
    },
    plotOptions: {
      pie: {
        donut: { size: "76%" },
      },
    },
    labels: ["Tailwind CSS", "Preline UI", "Others"],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      colors: ["rgb(255, 255, 255)"],
    },
    grid: {
      padding: {
        top: -12,
        bottom: -11,
        left: -12,
        right: -12,
      },
    },
    states: {
      hover: { filter: { type: "none" } },
    },
    tooltip: {
      enabled: true,
      custom: function ({ seriesIndex, w }: any) {
        const value = w.globals.series[seriesIndex];
        const label = w.globals.labels[seriesIndex];
        const color = w.globals.colors[seriesIndex];
        return `
          <div style="padding: 5px; background-color: ${color}; color: #fff; border-radius: 5px;">
            ${label}: ${value}%
          </div>
        `;
      },
    },
    colors: ["#3b82f6", "#22d3ee", "#e5e7eb"],
  });

  const [chartSeries] = useState([47, 23, 30]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Chart options={chartOptions} series={chartSeries} type="donut" height={230} width={230} />
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-3 sm:mt-6">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Income
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Outcome
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Others
          </span>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;