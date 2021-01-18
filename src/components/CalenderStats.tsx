import React from 'react';
import moment from 'moment';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import styled from 'styled-components';
import ReactApexChart from 'react-apexcharts';

const Root = styled.div``;

const CalenderStats: React.FC = () => {
  const { hours, month } = useCalender();

  const projects = new Set<string>(['Default']);

  Object.values(hours[month] || {}).forEach(day => {
    Object.values(day).forEach(entry => {
      projects.add(entry?.project || 'Default');
    });
  });

  const dateIndex = Object.keys(hours[month] || {}).reduce(
    (acc, date) => Object.assign(acc, { [date]: 0 }),
    {} as Record<string, number>
  );

  const projectIndex = Array.from(projects).reduce(
    (acc, project) => Object.assign(acc, { [project]: { ...dateIndex } }),
    {} as Record<string, Record<string, number>>
  );

  Object.entries(hours[month] || {}).forEach(([date, entries]) => {
    Object.values(entries).forEach(entry => {
      const duration = moment(entry.stop).diff(moment(entry.start), 'minutes') / 60;
      projectIndex[entry.project || 'Default'][date] += duration;
    });
  });

  const series = Object.entries(projectIndex).map(([project, dates]) => ({
    name: project,
    data: Object.values(dates),
  }));

  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      markers: {
        fillColors: ['#3f51b5', '#f50057'],
      },
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
      categories: Object.keys(dateIndex),
    },
    fill: {
      opacity: 1,
      colors: ['#3f51b5', '#f50057'],
    },
  };

  return (
    <Root>
      <ReactApexChart
        options={options}
        series={series}
        type='bar'
        height={65 + (options.xaxis.categories.length || 10) * 50}
      />
    </Root>
  );
};

export default CalenderStats;
