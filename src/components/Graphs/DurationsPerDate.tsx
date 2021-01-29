import React from 'react';
import ReactApexChart from 'react-apexcharts';
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';

interface IProps {}

const DurationsPerDate: React.FC<IProps> = () => {
  const durations = CalendarHooks.useDurations_Project_Date();

  const dates = Object.keys(Object.values(durations)[0]);

  const series = Object.entries(durations).map(([project, dates]) => ({
    name: project,
    data: Object.values(dates),
  }));

  return (
    <ReactApexChart
      type='bar'
      height={65 + (dates.length || 10) * 50}
      series={series}
      options={{
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          categories: dates,
        },
        fill: {
          opacity: 1,
        },
      }}
    />
  );
};

export default DurationsPerDate;
