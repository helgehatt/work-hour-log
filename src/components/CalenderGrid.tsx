import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalenderCell from 'src/components/CalenderCell';
import constants from 'src/components/util/constants';

interface IProps {
  month: string
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: ${constants.BORDER};
  border-left: ${constants.BORDER};
`;

const Label = styled.div`
  text-align: center;
  border-bottom: ${constants.BORDER};
  border-right: ${constants.BORDER};
`;

const getCalenderSpan = (month: string) => {
  const start = moment(month).subtract(moment(month).isoWeekday(), 'days')
  const days = moment(month).add(1, 'month').subtract(1, 'days').diff(start, 'days')
  return Array.from(
    { length: Math.ceil(days / 7) * 7 }, 
    (_, i) => moment(start).add(i + 1, 'days').format(moment.HTML5_FMT.DATE),
  );
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalenderGrid: React.FC<IProps> = ({ month }) => {
  const dates = getCalenderSpan(month);
  return (
    <Root>
      {days.map(day => <Label key={day}>{day}</Label>)}
      {dates.map(date => <CalenderCell key={date} date={date} />)}
    </Root>
  );
};

export default CalenderGrid;