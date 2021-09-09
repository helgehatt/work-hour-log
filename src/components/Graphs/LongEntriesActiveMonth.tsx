import React from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';
import { useCalendar } from 'src/components/AppProviders/CalendarProvider';

interface IProps {}

const LongEntriesActiveMonth: React.FC<IProps> = () => {
  const { hours, month } = useCalendar();

  const series = Object.values(hours[month] || {}).reduce(
    (acc, entries) => {
      Object.values(entries)
        .filter(entry => {
          const duration = moment(entry.stop).diff(moment(entry.start), 'minutes') / 60;
          return duration >= 6;
        })
        .forEach(entry => {
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
                  label: 'Entries \u2265 6 hours',
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default LongEntriesActiveMonth;
