import React, { useEffect } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';

interface SingleAreaChartProps {
    chartId: string; 
  }
  const SingleAreaChart: React.FC<SingleAreaChartProps> = ({ chartId }) => {
  useEffect(() => {
    const options: ApexOptions = {
      chart: {
        height: 300,
        width: '100%',
        type: 'area',
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      series: [
        {
          name: 'Visitors',
          data: [180, 51, 60, 38, 88, 50, 40, 52, 88, 80, 60, 70],
        },
      ],
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
        tickPlacement: 'on',
        categories: [
          '25 January 2023',
          '26 January 2023',
          '27 January 2023',
          '28 January 2023',
          '29 January 2023',
          '30 January 2023',
          '31 January 2023',
          '1 February 2023',
          '2 February 2023',
          '3 February 2023',
          '4 February 2023',
          '5 February 2023',
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        crosshairs: {
            stroke: { dashArray: 0 },
            dropShadow: {
              enabled: false, 
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          
        tooltip: { enabled: false },
        labels: {
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400,
          },
          formatter: (title) => {
            let t = title;
            if (t) {
              const newT = t.split(' ');
              t = `${newT[0]} ${newT[1].slice(0, 3)}`;
            }
            return t;
          },
        },
      },
      yaxis: {
        labels: {
          align: 'left',
          style: {
            colors: '#9ca3af',
            fontSize: '13px',
            fontFamily: 'Inter, ui-sans-serif',
            fontWeight: 400,
          },
          formatter: (value: number) => {
            return value >= 1000 ? `${value / 1000}k` : `${value}`; 
          },
        },
      },
      
      tooltip: {
        x: { format: 'MMMM yyyy' },
        y: { formatter: (value) => `${value >= 1000 ? `${value / 1000}k` : value}` },
      },
      responsive: [
        {
          breakpoint: 568,
          options: {
            chart: { height: 300 },
            xaxis: {
              labels: {
                style: {
                  colors: '#9ca3af',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400,
                },
                offsetX: -2,
                formatter: (title: string) => {
                    if (title) {
                      const parts = title.split(' ');
                      return `${parts[0]} ${parts[1].slice(0, 3)}`; 
                    }
                    return ''; 
                  },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: '#9ca3af',
                  fontSize: '11px',
                  fontFamily: 'Inter, ui-sans-serif',
                  fontWeight: 400,
                },
                formatter: (value: number | string) => {
                    if (typeof value === 'number') {
                      return value >= 1000 ? `${value / 1000}k` : value.toString();
                    }
                    return value; 
                  },
              },
            },
          },
        },
      ],
    };

    
    const chart = new ApexCharts(document.querySelector(`#${chartId}`)!, options);
    chart.render();

    return () => chart.destroy();
  }, [chartId]);

  return <div id={chartId}></div>;
};

export default SingleAreaChart;
