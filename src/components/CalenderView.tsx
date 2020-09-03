import React from 'react';
import styled from 'styled-components';
import { useCalenderNav, useCalenderSum } from 'src/components/providers/CalenderProvider';
import CalenderGrid from 'src/components/CalenderGrid';
import constants from 'src/components/util/constants';
import { useModal } from 'src/components/providers/ModalProvider';
import LoginModal from 'src/components/LoginModal';

const Root = styled.div`
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 0.25rem;
  border: ${constants.BORDER};
  margin: 0.5rem 0rem 0.5rem 1rem;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${constants.BORDER_COLOR};
    cursor: pointer;
  }
`;

const CalenderView: React.FC = () => {
  const { showModal } = useModal();
  const { hours, breaks } = useCalenderSum();
  const { activeMonth, currentMonth, prevMonth, nextMonth } = useCalenderNav();
  return (
    <Root>
      <Button onClick={currentMonth}>Today</Button>
      <Button onClick={prevMonth}>Prev</Button>
      <Button onClick={nextMonth}>Next</Button>
      <Button onClick={() => showModal(<LoginModal />)}>Login</Button>
      <CalenderGrid month={activeMonth} />
      <div>Hours: {hours}</div>
      <div>Hours w/o breaks: {hours - breaks * 0.5}</div>
    </Root>
  );
};

export default CalenderView;