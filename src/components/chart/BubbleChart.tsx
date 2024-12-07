import React from 'react';
import Chart from 'react-apexcharts';

const BubbleChart: React.FC = () => {
  const chartOptions = {
    chart: {
      height: '100%',
      type: 'bubble' as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: [
      { data: [[5, 6, 70]] },
      { data: [[8, 4, 45]] },
      { data: [[10, 9, 90]] },
    ],
    dataLabels: {
      style: {
        fontSize: '20px',
        fontFamily: 'Inter, ui-sans-serif',
        fontWeight: '400',
        colors: ['#fff', '#1f2937', '#fff'],
      },
      formatter: (value: number) => (value ? `${value}%` : ''),
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 5,
      colors: ['rgb(255, 255, 255)'],
    },
    plotOptions: {
      bubble: {
        zScaling: false,
        minBubbleRadius: 40,
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    xaxis: {
      min: 0,
      max: 15,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 15,
      labels: {
        show: false,
      },
    },
    tooltip: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
  };

  
  const chartColors = ['#22d3ee', '#e5e7eb', '#3b82f6'];

  return (
    <div className="flex flex-col justify-center items-center">
      <Chart options={chartOptions} series={chartOptions.series} type="bubble" height={340} width="100%" />
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mt-4">
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-blue-600 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">Income</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-cyan-500 rounded-sm me-2"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">Outcome</span>
        </div>
        <div className="inline-flex items-center">
          <span className="size-2.5 inline-block bg-gray-300 rounded-sm me-2 dark:bg-neutral-700"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">Others</span>
        </div>
      </div>
    </div>
  );
};

export default BubbleChart;
