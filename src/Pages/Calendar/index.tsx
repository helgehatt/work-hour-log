import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalendarCell from 'src/Pages/Calendar/CalendarCell';
import { useCalendar } from 'src/components/AppProviders/CalendarProvider';
import Typography from '@material-ui/core/Typography';

interface IProps {}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;

  > * {
    border-right: #dadce0 1px solid;
    border-bottom: #dadce0 1px solid;

    :nth-child(7n + 0) {
      border-right: none;
    }
  }
`;

const getCalendarSpan = (month: string) => {
  const start = moment(month).subtract(moment(month).isoWeekday(), 'days');
  return Array.from({ length: 6 * 7 }, (_, i) =>
    moment(start)
      .add(i + 1, 'days')
      .format(moment.HTML5_FMT.DATE)
  );
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar: React.FC<IProps> = () => {
  const { month } = useCalendar();
  const dates = getCalendarSpan(month);
  return (
    <Root>
      {days.map(day => (
        <Typography key={day} variant='subtitle1'>
          {day}
        </Typography>
      ))}
      {dates.map(date => (
        <CalendarCell key={date} date={date} />
      ))}
    </Root>
  );
};

export default Calendar;
