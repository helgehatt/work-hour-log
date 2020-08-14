import React from 'react';
import CalenderView from './CalenderView';
import API from './util/API';

const today = new Date().toISOString().substr(0, 10);

const CalenderContext = React.createContext({
  active: '2020-08',
  hours: {} as WorkHourLog,
});


const Calender: React.FC = () => {
  const initial = React.useContext(CalenderContext);
  const [active, setActive] = React.useState(initial.active)
  const [hours, setHours] = React.useState<WorkHourLog>(initial.hours);

  React.useEffect(() => {
    API.read().then(setHours);
  }, []);

  return (
    <CalenderContext.Provider value={{ active, hours }}>
      <CalenderView />
    </CalenderContext.Provider>
  );
};

export const useCalender = (date: string) => {
  const current = React.useContext(CalenderContext);
  return {
    today: date === today,
    active: date.startsWith(current.active),
    hours: current.hours[date],
  }
};

export default Calender;