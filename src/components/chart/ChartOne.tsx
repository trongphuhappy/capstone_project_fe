"use client";

import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

const ChartOne: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<"day" | "week" | "month">(
    "day"
  );

  
  const getSeries = () => {
    switch (selectedRange) {
      case "week":
        return [
          {
            name: "Product One",
            data: [12, 15, 10, 25, 18, 30, 22],
          },
          {
            name: "Product Two",
            data: [22, 18, 26, 20, 34, 28, 32],
          },
        ];
      case "month":
        return [
          {
            name: "Product One",
            data: [50, 45, 60, 70, 80, 75, 90],
          },
          {
            name: "Product Two",
            data: [60, 55, 70, 85, 90, 95, 100],
          },
        ];
      default:
        return [
          {
            name: "Product One",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
          },
          {
            name: "Product Two",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
          },
        ];
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-[#80caee]">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#80caee]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#80caee]">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-[#f5f7fd] p-1.5 dark:bg-[#313d4a]">
            <button
              className={`rounded px-3 py-1 text-xs font-medium ${
                selectedRange === "day"
                  ? "bg-white shadow-card"
                  : "hover:bg-white hover:shadow-card"
              }`}
              onClick={() => setSelectedRange("day")}
            >
              Day
            </button>
            <button
              className={`rounded px-3 py-1 text-xs font-medium ${
                selectedRange === "week"
                  ? "bg-white shadow-card"
                  : "hover:bg-white hover:shadow-card"
              }`}
              onClick={() => setSelectedRange("week")}
            >
              Week
            </button>
            <button
              className={`rounded px-3 py-1 text-xs font-medium ${
                selectedRange === "month"
                  ? "bg-white shadow-card"
                  : "hover:bg-white hover:shadow-card"
              }`}
              onClick={() => setSelectedRange("month")}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={getSeries()}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
