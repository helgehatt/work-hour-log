import React from 'react';
import moment from 'moment';

const today = moment().format(moment.HTML5_FMT.DATE);

const CalenderContext = React.createContext({
  isLoading: false,
  setLoading: (state: boolean): void => {
    throw new Error('Invalid context');
  },
  showDuration: false,
  setShowDuration: (state: boolean): void => {
    throw new Error('Invalid context');
  },
  month: moment().format(moment.HTML5_FMT.MONTH),
  hours: {} as WorkHourLog,
  prevMonth: (): void => {
    throw new Error('Invalid context');
  },
  nextMonth: (): void => {
    throw new Error('Invalid context');
  },
  currentMonth: (): void => {
    throw new Error('Invalid context');
  },
  addHours: (month: string, hours: WorkHourMonth): void => {
    throw new Error('Invalid context');
  },
});

const CalenderProvider: React.FC = ({ children }) => {
  const initial = React.useContext(CalenderContext);
  const [isLoading, setLoading] = React.useState(initial.isLoading);
  const [showDuration, setShowDuration] = React.useState(initial.showDuration);
  const [month, setMonth] = React.useState(initial.month);
  const [hours, setHours] = React.useState<WorkHourLog>(initial.hours);
  const currentMonth = () => setMonth(moment(today).format(moment.HTML5_FMT.MONTH));
  const prevMonth = () => setMonth(moment(month).subtract(1, 'month').format(moment.HTML5_FMT.MONTH));
  const nextMonth = () => setMonth(moment(month).add(1, 'month').format(moment.HTML5_FMT.MONTH));
  const addHours = React.useCallback((month: string, hours: WorkHourMonth) => {
    setHours(prev => ({ ...prev, [month]: hours }));
  }, []);

  return (
    <CalenderContext.Provider
      value={{
        isLoading,
        setLoading,
        showDuration,
        setShowDuration,
        month,
        hours,
        currentMonth,
        prevMonth,
        nextMonth,
        addHours,
      }}
    >
      {children}
    </CalenderContext.Provider>
  );
};

export const useCalender = () => React.useContext(CalenderContext);

export const useCalenderNav = () => {
  const context = React.useContext(CalenderContext);
  return {
    activeMonth: context.month,
    currentMonth: context.currentMonth,
    prevMonth: context.prevMonth,
    nextMonth: context.nextMonth,
  };
};

export const useCalenderSum = (month?: string) => {
  const context = React.useContext(CalenderContext);

  const hours = context.hours[month || context.month];

  const entries = Object.values(hours || {}).reduce((acc, day) => {
    acc.push(...Object.values(day));
    return acc;
  }, [] as Array<WorkHourEntry>);

  return entries.reduce((acc, entry) => {
    const project = entry.project || 'Default';
    const diff = moment(entry.stop).diff(entry.start, 'minutes') / 60;
    acc[project] = (acc[project] || 0) + diff;
    return acc;
  }, {} as Record<string, number>);
};

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
