import React from 'react';
import Modal from 'src/components/atomic/Modal';
import { useCalenderSum } from 'src/components/AppProviders/CalenderProvider';
import styled from 'styled-components';

const Root = styled(Modal)`
  > :first-child {
    margin-top: 0;
    font-weight: 500;
  }
  > :last-child {
    margin-bottom: 0;
  }
`;

const CalenderStats: React.FC = () => {
  const hours = useCalenderSum();
  return (
    <Root>
      <p>Hours per project</p>
      {Object.entries(hours)
        .sort()
        .map(([key, value]) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))}
    </Root>
  );
};

export default CalenderStats;
