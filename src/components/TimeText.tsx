import React from 'react';
import styled from 'styled-components';

interface IProps {
  hours: number;
  minutes: number;
}

const Root = styled.span`
  > span:last-child {
    font-size: 0.5rem;
    vertical-align: text-top;
  }
`;

const TimeText: React.FC<IProps> = ({ hours, minutes }) => {
  return (
    <Root>
      <span>{String(hours)}</span>
      <span>{String(minutes).padStart(2, '0')}</span>
    </Root>
  );
};

export default TimeText;
