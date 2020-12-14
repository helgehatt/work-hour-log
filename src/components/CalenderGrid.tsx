import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalenderCell from 'src/components/CalenderCell';
import constants from 'src/components/util/constants';

interface IProps {
  month: string;
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  > div {
    border-right: ${constants.BORDER};
    border-bottom: ${constants.BORDER};

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

const CalenderGrid: React.FC<IProps> = ({ month }) => {
  const dates = getCalenderSpan(month);
  return (
    <Root>
      {days.map(day => (
        <div key={day}>{day}</div>
      ))}
      {dates.map(date => (
        <CalenderCell key={date} date={date} />
      ))}
    </Root>
  );
};

export default CalenderGrid;
