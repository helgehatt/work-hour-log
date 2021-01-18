import React from 'react';
import moment from 'moment';

const today = moment().format(moment.HTML5_FMT.DATE);

const CalenderContext = React.createContext({
  isLoading: false,
  setLoading: (state: React.SetStateAction<boolean>): void => {
    throw new Error('Invalid context');
  },
  showDuration: false,
  setShowDuration: (state: React.SetStateAction<boolean>): void => {
    throw new Error('Invalid context');
  },
  month: moment().format(moment.HTML5_FMT.MONTH),
  setMonth: (state: React.SetStateAction<string>): void => {
    throw new Error('Invalid context');
  },
  hours: {} as WorkHourLog,
  setHours: (state: React.SetStateAction<WorkHourLog>): void => {
    throw new Error('Invalid context');
  },
});

const CalenderProvider: React.FC = ({ children }) => {
  const initial = React.useContext(CalenderContext);
  const [isLoading, setLoading] = React.useState(initial.isLoading);
  const [showDuration, setShowDuration] = React.useState(initial.showDuration);
  const [month, setMonth] = React.useState(initial.month);
  const [hours, setHours] = React.useState(initial.hours);

  return (
    <CalenderContext.Provider
      value={{
        isLoading,
        setLoading,
        showDuration,
        setShowDuration,
        month,
        setMonth,
        hours,
        setHours,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
};

export const useCalender = () => React.useContext(CalenderContext);

export const useCalenderDate = (date: string) => {
  const context = React.useContext(CalenderContext);
  const month = date.substr(0, 7);
  return {
    isToday: date === today,
    isActive: month === context.month,
    hours: Object.values(context.hours[month]?.[date] || {}),
  };
};

export const useCalenderProjects = () => {
  const context = React.useContext(CalenderContext);

  const projects = new Set<string>();

  Object.values(context.hours || {}).forEach(month => {
    Object.values(month).forEach(day => {
      Object.values(day).forEach(entry => {
        if (entry.project) projects.add(entry.project);
      });
    });
  });

  return Array.from(projects);
};

export default CalenderProvider;
