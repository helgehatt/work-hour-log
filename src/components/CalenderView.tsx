import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import CalenderCell from './CalenderCell';
import constants from './util/constants';

const Root = styled.div`
  max-width: 1024px;
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: ${constants.BORDER};
  border-left: ${constants.BORDER};

  .label {
    text-align: center;
    border-bottom: ${constants.BORDER};
    border-right: ${constants.BORDER};
  }
`;

const getCalenderSpan = (year: number, month: number) => {
  const start = moment([year,month]).subtract(moment([year,month]).day(), 'days')
  const days = moment([year,month+1]).subtract(1, 'days').diff(start, 'days')
  return Array.from(
    { length: Math.ceil(days / 7) * 7 }, 
    (_, i) => moment(start).add(i + 1, 'days').format('YYYY-MM-DD')
  );
};

const dates = getCalenderSpan(2020, 7);
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalenderView: React.FC = () => {
  return (
    <Root>
      {days.map(day => (
        <React.Fragment key={day}>
          <div className="label">{day}</div>
        </React.Fragment>
      ))}
      {dates.map(date => (
        <React.Fragment key={date}>
          <CalenderCell date={date} />
        </React.Fragment>
      ))}
    </Root>
  );
};

export default CalenderView;