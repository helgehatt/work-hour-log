import React from 'react';
import moment from 'moment';

const CalendarContext = React.createContext({
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

const CalendarProvider: React.FC = ({ children }) => {
  const initial = React.useContext(CalendarContext);
  const [isLoading, setLoading] = React.useState(initial.isLoading);
  const [showDuration, setShowDuration] = React.useState(initial.showDuration);
  const [month, setMonth] = React.useState(initial.month);
  const [hours, setHours] = React.useState(initial.hours);

  return (
    <CalendarContext.Provider
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
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => React.useContext(CalendarContext);

export default CalendarProvider;
