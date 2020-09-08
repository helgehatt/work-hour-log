import React from 'react';
import API from 'src/components/util/API';
import moment from 'moment';

const today = moment().format(moment.HTML5_FMT.DATE);

const CalenderContext = React.createContext({
  month: moment().format(moment.HTML5_FMT.MONTH),
  hours: {} as WorkHourLog,
  loadHours: (): void => { throw new Error('Invalid context') },
  prevMonth: (): void => { throw new Error('Invalid context') },
  nextMonth: (): void => { throw new Error('Invalid context') },
  currentMonth: (): void => { throw new Error('Invalid context') },
});


const CalenderProvider: React.FC = ({ children }) => {
  const initial = React.useContext(CalenderContext);
  const [month, setMonth] = React.useState(initial.month)
  const [hours, setHours] = React.useState<WorkHourLog>(initial.hours);
  const currentMonth = () => setMonth(moment(today).format(moment.HTML5_FMT.MONTH));
  const prevMonth = () => setMonth(moment(month).subtract(1, 'month').format(moment.HTML5_FMT.MONTH));
  const nextMonth = () => setMonth(moment(month).add(1, 'month').format(moment.HTML5_FMT.MONTH));
  const loadHours = () => API.read().then(setHours);

  React.useEffect(() => {
    if (API.isAuthenticated()) loadHours();
  }, []);

  return (
    <CalenderContext.Provider value={{ month, hours, loadHours, currentMonth, prevMonth, nextMonth }}>
      {children}
    </CalenderContext.Provider>
  );
};

export const useCalenderAPI = () => {
  const context = React.useContext(CalenderContext);
  
  const wrapper = <Fn extends (...args: any) => Promise<any>>(fn: Fn) => {
    return (...args: Parameters<Fn>): Promise<void> => {
      return fn(...args).then(context.loadHours);
    };
  };

  return {
    create: wrapper(API.create),
    delete: wrapper(API.delete),
    update: wrapper(API.update),
    login: wrapper(API.login),
  };
};

export const useCalenderNav = () => {
  const context = React.useContext(CalenderContext);
  return {
    activeMonth: context.month,
    currentMonth: context.currentMonth,
    prevMonth: context.prevMonth,
    nextMonth: context.nextMonth,
  };
};

export const useCalenderSum = () => {
  const context = React.useContext(CalenderContext);

  const entries = Object.values(context.hours).reduce((acc, day) => {
    acc.push(...Object.values(day));
    return acc;
  }, [] as Array<WorkHourEntry>);

  const minutes = entries.reduce((acc, entry) => {
    return acc + moment(entry.stop).diff(entry.start, 'minutes');
  }, 0);

  const breaks = entries.reduce((acc, entry) => {
    return acc + Number(moment(entry.stop).diff(entry.start, 'minutes') > 5.5 * 60);
  }, 0);

  return {
    hours: minutes / 60,
    breaks,
  };
};

export const useCalenderDate = (date: string) => {
  const context = React.useContext(CalenderContext);
  return {
    isToday: date === today,
    isActive: date.startsWith(context.month),
    hours: Object.values(context.hours[date] || {}),
  };
};

export default CalenderProvider;