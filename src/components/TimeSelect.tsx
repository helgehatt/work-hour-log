import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

interface IProps {
  timestamp: moment.Moment;
}

const Root = styled.span``;

const hours = Array.from({ length: 24 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

const TimeSelect: React.FC<IProps> = ({ timestamp }) => {
  const [hour, setHour] = React.useState(String(timestamp.hour()).padStart(2, '0'));
  const [minute, setMinute] = React.useState(String(timestamp.minute()).padStart(2, '0'));

  React.useEffect(() => {
    timestamp.hour(parseInt(hour));
    timestamp.minute(parseInt(minute));
  }, [timestamp, hour, minute]);

  return (
    <Root>
      <select value={hour} onChange={({ target: { value } }) => setHour(value)}>
        {hours.map(hour => (
          <option key={hour}>{hour}</option>
        ))}
      </select>
      <select value={minute} onChange={({ target: { value } }) => setMinute(value)}>
        {minutes.map(minute => (
          <option key={minute}>{minute}</option>
        ))}
      </select>
    </Root>
  );
};

export default TimeSelect;
