import React from 'react';
import Modal from 'src/components/Modal';
import { useCalenderSum } from 'src/components/AppProviders/CalenderProvider';
import styled from 'styled-components';

const Root = styled(Modal)``;

const CalenderStatsModal: React.FC = () => {
  const { hours, breaks } = useCalenderSum();
  return (
    <Root>
      <div>Hours: {hours}</div>
      <div>Hours w/o breaks: {hours - breaks * 0.5}</div>
    </Root>
  );
};

export default CalenderStatsModal;
