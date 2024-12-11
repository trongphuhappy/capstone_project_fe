import React, { useState, useEffect } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

interface TotalOrderChartProps {
  chartId: string;
  countOrders: API.TOrderStatistic[];
}

const TotalOrderChart: React.FC<TotalOrderChartProps> = ({
  chartId,
  countOrders,
}: TotalOrderChartProps) => {
  const [selectedRange, setSelectedRange] = useState<"month">("month");

  const getSeries = () => {
    const rawData = [
      { OrderMonth: 1, OrderCount: 4 },
      { OrderMonth: 2, OrderCount: 4 },
      { OrderMonth: 3, OrderCount: 5 },
      { OrderMonth: 12, OrderCount: 2 },
    ];

    const monthsInData = rawData.map((item) => item.OrderMonth);
    const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

    const extendedData = allMonths.map((month) => {
      const dataForMonth = rawData.find((item) => item.OrderMonth === month);
      return dataForMonth ? dataForMonth.OrderCount : 0;
    });

    return [
      {
        name: "Order Count",
        data: extendedData,
      },
    ];
  };

  useEffect(() => {
    const options: ApexOptions = {
      chart: {
        height: 300,
        width: "100%",
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: getSeries(),
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: { curve: "straight", width: 2 },
      grid: { strokeDashArray: 2 },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.1,
          opacityTo: 0.8,
        },
      },
      xaxis: {
        type: "category",
        categories: countOrders.map((item) => item.orderMonth),
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (value: number) =>
            value >= 1000 ? `${value / 1000}k` : value.toString(),
        },
      },
      tooltip: {
        x: { format: "MMM dd, yyyy" },
        y: {
          formatter: (value) => `${value >= 1000 ? `${value / 1000}k` : value}`,
        },
      },
    };

    const chart = new ApexCharts(
      document.querySelector(`#${chartId}`)!,
      options
    );
    chart.render();

    return () => chart.destroy();
  }, [chartId, selectedRange]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8 p-4 mt-8">
      <div className="flex w-full max-w-45 justify-end">
        <div className="inline-flex items-center rounded-md bg-[#f5f7fd] p-1.5 dark:bg-[#313d4a]">
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

export default TotalOrderChart;
