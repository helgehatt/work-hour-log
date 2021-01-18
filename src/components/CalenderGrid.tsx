import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalenderCell from 'src/components/CalenderCell';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import Typography from '@material-ui/core/Typography';

interface IProps {}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  > * {
    border-right: #dadce0 1px solid;
    border-bottom: #dadce0 1px solid;
    border-radius: 0;

    :nth-child(-n + 7) {
      text-align: center;
    }

    :nth-child(7n + 0) {
      border-right: none;
    }
  }
`;

const getCalenderSpan = (month: string) => {
  const start = moment(month).subtract(moment(month).isoWeekday(), 'days');
  return Array.from({ length: 6 * 7 }, (_, i) =>
    moment(start)
      .add(i + 1, 'days')
      .format(moment.HTML5_FMT.DATE)
  );
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalenderGrid: React.FC<IProps> = () => {
  const { month } = useCalender();
  const dates = getCalenderSpan(month);
  return (
    <Root>
      {days.map(day => (
        <Typography key={day} variant='subtitle1'>
          {day}
        </Typography>
      ))}
      {dates.map(date => (
        <CalenderCell key={date} date={date} />
      ))}
    </Root>
  );
};

export default CalenderGrid;
