import React from 'react';
import moment from 'moment';
import { useAPIDispatch, useAPIEvent, APIConstants, APIActions, APIToken } from './APIProvider';
import { useModal } from './ModalProvider';

const today = moment().format(moment.HTML5_FMT.DATE);

const CalenderContext = React.createContext({
  month: moment().format(moment.HTML5_FMT.MONTH),
  hours: {} as WorkHourLog,
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

  const APIDispatch = useAPIDispatch();
  const APIEvent = useAPIEvent();
  const { hideModal } = useModal();

  React.useEffect(() => {
    switch (APIEvent.type) {
      case APIConstants.auth.AUTH_LOGIN_SUCCESS:
        APIToken.set(APIEvent.payload.token); // eslint-disable no-fallthrough
      case APIConstants.hours.HOURS_CREATE_SUCCESS:
      case APIConstants.hours.HOURS_DELETE_SUCCESS:
      case APIConstants.hours.HOURS_UPDATE_SUCCESS:
        APIDispatch(APIActions.hours.read({ month }));
        break;
    }
  }, [APIDispatch, APIEvent, month]);

  React.useEffect(() => {
    switch (APIEvent.type) {
      case APIConstants.hours.HOURS_READ_SUCCESS:
        setHours(prev => ({ ...prev, [APIEvent.request.month]: APIEvent.response }));
        hideModal();
        break;
    }
  }, [APIDispatch, APIEvent, hideModal]);

  React.useEffect(() => {
    if (APIToken.isAuthenticated() && hours[month] == null) {
      APIDispatch(APIActions.hours.read({ month }));
    }
  }, [APIDispatch, hours, month]);

  return (
    <CalenderContext.Provider value={{ month, hours, currentMonth, prevMonth, nextMonth }}>
      {children}
    </CalenderContext.Provider>
  );
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

export const useCalenderSum = (month?: string) => {
  const context = React.useContext(CalenderContext);

  const hours = context.hours[month || context.month];

  const entries = Object.values(hours || {}).reduce((acc, day) => {
    acc.push(...Object.values(day));
    return acc;
  }, [] as Array<WorkHourEntry>);

  const minutes = entries.reduce((acc, entry) => {
    return acc + moment(entry.stop).diff(entry.start, 'minutes');
  }, 0);

  const breaks = entries.reduce((acc, entry) => {
    return acc + Number(moment(entry.stop).diff(entry.start, 'minutes') >= 6 * 60);
  }, 0);

  return {
    hours: minutes / 60,
    breaks,
  };
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

export default CalenderProvider;