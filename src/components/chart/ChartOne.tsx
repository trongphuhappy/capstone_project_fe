"use client";

import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartOneProps {
  data: any;
}

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
    categories: [],
    axisBorder: {
      show: true,
      color: "#E9ECEF",
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "#E9ECEF",
    },
  },
  yaxis: {
    title: {
      text: "Revenue",
    },
  },
};

export default function ChartOne({ data }: ChartOneProps) {
  const [chartData, setChartData] = useState<any>([
    {
      name: "Revenue",
      data: data?.listRevenueInYear || [],
    },
  ]);

  useEffect(() => {
    if (data) {
      setChartData([
        {
          name: "Revenue",
          data: data?.listRevenueInYear || [],
        },
      ]);
    }
  }, [data]);

  const categories = data?.listMonths || [];
  const totalRevenue = data?.totalRevenue || 0;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex items-center space-x-8 w-full">
          <div className="flex items-center">
            <span className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-2.5 rounded-full bg-primary"></span>
            </span>
            <p className="font-semibold text-primary">Total Revenue:</p>
          </div>
          <p className="text-sm font-medium">{totalRevenue.toLocaleString()} VND</p>
        </div>

      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={{
              ...options,
              xaxis: {
                ...options.xaxis,
                categories: categories,
              },
            }}
            series={chartData}
            type="area"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}
