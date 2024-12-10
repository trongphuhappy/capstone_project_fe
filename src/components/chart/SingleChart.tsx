import React, { useState, useEffect } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';

interface SingleAreaChartProps {
  chartId: string;
}

const SingleAreaChart: React.FC<SingleAreaChartProps> = ({ chartId }) => {
  const [selectedRange, setSelectedRange] = useState<'day' | 'week' | 'month'>('day');

  const getSeries = () => {
    switch (selectedRange) {
      case 'week':
        return [
          {
            name: 'Visitors',
            data: [12, 15, 10, 25, 18, 30, 22],
          },
        ];
      case 'month':
        return [
          {
            name: 'Visitors',
            data: [50, 45, 60, 70, 80, 75, 90],
          },
        ];
      default:
        return [
          {
            name: 'Visitors',
            data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
          },
        ];
    }
  };

  useEffect(() => {
    const options: ApexOptions = {
      chart: {
        height: 300,
        width: '100%',
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: getSeries(),
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: 'straight', width: 2 },
      grid: { strokeDashArray: 2 },
      fill: {
        type: 'gradient',
        gradient: { type: 'vertical', shadeIntensity: 1, opacityFrom: 0.1, opacityTo: 0.8 },
      },
      xaxis: {
        type: 'category',
        categories:
          selectedRange === 'month'
            ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            : selectedRange === 'week'
            ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            : [
                '25 Jan 2023',
                '26 Jan 2023',
                '27 Jan 2023',
                '28 Jan 2023',
                '29 Jan 2023',
                '30 Jan 2023',
                '31 Jan 2023',
                '1 Feb 2023',
                '2 Feb 2023',
                '3 Feb 2023',
                '4 Feb 2023',
                '5 Feb 2023',
              ],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => (value >= 1000 ? `${value / 1000}k` : value.toString()),
        },
      },
      tooltip: {
        x: { format: 'MMM dd, yyyy' },
        y: { formatter: (value) => `${value >= 1000 ? `${value / 1000}k` : value}` },
      },
    };

    const chart = new ApexCharts(document.querySelector(`#${chartId}`)!, options);
    chart.render();

    return () => chart.destroy();
  }, [chartId, selectedRange]);

  return (
    <div className='col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 p-4 mt-8'>
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
      <div id={chartId}></div>
    </div>
  );
};

export default SingleAreaChart;
