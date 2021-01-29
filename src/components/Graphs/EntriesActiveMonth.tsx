import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';

interface IProps {}

const EntriesActiveMonth: React.FC<IProps> = () => {
  const { hours, month } = useCalender();

  const series = Object.values(hours[month] || {}).reduce(
    (acc, entries) => {
      Object.values(entries).forEach(entry => {
        const project = entry.project || 'Default';
        acc[project] = (acc[project] || 0) + 1;
      });
      return acc;
    },
    { Default: 0 } as Record<string, number>
  );

  return (
    <ReactApexChart
      type='donut'
      series={Object.values(series)}
      options={{
        dataLabels: {
          formatter: (val: string, options: any) => options.w.globals.series[options.seriesIndex],
        },
        labels: Object.keys(series),
        legend: {
          position: 'bottom',
        },
        tooltip: {
          enabled: true,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Entries',
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default EntriesActiveMonth;
