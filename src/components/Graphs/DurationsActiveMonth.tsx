import React from 'react';
import ReactApexChart from 'react-apexcharts';
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';
import { useCalendar } from 'src/components/AppProviders/CalendarProvider';

interface IProps {}

const DurationsActiveMonth: React.FC<IProps> = () => {
  const { month } = useCalendar();
  const durations = CalendarHooks.useDurations_Project_Month();

  const series = Object.entries(durations).reduce(
    (acc, [project, months]) => Object.assign(acc, { [project]: months[month] || 0 }),
    {} as Record<string, number>
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
                  label: 'Hours',
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default DurationsActiveMonth;
