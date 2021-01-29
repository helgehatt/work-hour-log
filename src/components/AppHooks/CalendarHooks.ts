import React from 'react';
import moment from 'moment';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';

const today = moment().format(moment.HTML5_FMT.DATE);

const useDate = (date: string) => {
  const context = useCalender();
  const month = date.substr(0, 7);
  return {
    isToday: date === today,
    isActive: month === context.month,
    hours: Object.values(context.hours[month]?.[date] || {}),
  };
};

const useProjects = () => {
  const { hours } = useCalender();

  return React.useMemo(() => {
    const projects = new Set<string>();

    Object.values(hours || {}).forEach(month => {
      Object.values(month).forEach(day => {
        Object.values(day).forEach(entry => {
          if (entry.project) projects.add(entry.project);
        });
      });
    });

    return Array.from(projects);
  }, [hours]);
};

const useDurations_Project_Date = () => {
  const { hours, month } = useCalender();
  const projects = useProjects();

  return React.useMemo(() => {
    const dateIndex = Object.keys(hours[month] || {}).reduce(
      (acc, date) => Object.assign(acc, { [date]: 0 }),
      {} as Record<string, number>
    );

    const projectIndex = ['Default', ...projects].reduce(
      (acc, project) => Object.assign(acc, { [project]: { ...dateIndex } }),
      {} as Record<string, Record<string, number>>
    );

    Object.entries(hours[month] || {}).forEach(([date, entries]) => {
      Object.values(entries).forEach(entry => {
        const duration = moment(entry.stop).diff(moment(entry.start), 'minutes') / 60;
        projectIndex[entry.project || 'Default'][date] += duration;
      });
    });

    return projectIndex;
  }, [hours, month, projects]);
};

const useDurations_Project_Month = () => {
  const { hours } = useCalender();
  const projects = useProjects();

  return React.useMemo(() => {
    const monthIndex = Object.keys(hours).reduce(
      (acc, month) => Object.assign(acc, { [month]: 0 }),
      {} as Record<string, number>
    );

    const projectIndex = ['Default', ...projects].reduce(
      (acc, project) => Object.assign(acc, { [project]: { ...monthIndex } }),
      {} as Record<string, Record<string, number>>
    );

    Object.entries(hours).forEach(([month, dates]) => {
      Object.values(dates).forEach(entries => {
        Object.values(entries).forEach(entry => {
          const duration = moment(entry.stop).diff(moment(entry.start), 'minutes') / 60;
          projectIndex[entry.project || 'Default'][month] += duration;
        });
      });
    });

    return projectIndex;
  }, [hours, projects]);
};

const CalendarHooks = {
  useDate,
  useProjects,
  useDurations_Project_Date,
  useDurations_Project_Month,
};

export default CalendarHooks;
