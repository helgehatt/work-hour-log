import React from 'react';
import styled from 'styled-components';
import { useCalenderNav } from 'src/components/AppProviders/CalenderProvider';
import CalenderGrid from 'src/components/CalenderGrid';
import constants from 'src/components/util/constants';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import LoginModal from 'src/components/LoginModal';
import CalenderStatsModal from 'src/components/CalenderStatsModal';

const Root = styled.div``;

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
  const { activeMonth, currentMonth, prevMonth, nextMonth } = useCalenderNav();
  return (
    <Root>
      <CalenderGrid month={activeMonth} />
      <Button onClick={currentMonth}>Today</Button>
      <Button onClick={prevMonth}>Prev</Button>
      <Button onClick={nextMonth}>Next</Button>
      <Button onClick={() => showModal(<CalenderStatsModal />)}>Stats</Button>
      <Button onClick={() => showModal(<LoginModal />)}>Login</Button>
    </Root>
  );
};

export default CalenderView;
