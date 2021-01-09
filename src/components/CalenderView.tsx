import React from 'react';
import styled from 'styled-components';
import { useCalender, useCalenderNav } from 'src/components/AppProviders/CalenderProvider';
import CalenderGrid from 'src/components/CalenderGrid';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import LoginForm from 'src/components/LoginForm';
import CalenderStats from 'src/components/CalenderStats';
import Spinner from 'src/components/atomic/Spinner';
import Button from 'src/components/atomic/Button';

const Root = styled.div`
  > .contents {
    position: relative;

    > .overlay {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #515151;
      opacity: 0.5;
    }
  }

  > button {
    margin: 0.5rem 1rem 0.5rem 0rem;
    :first-of-type {
      margin-left: 1rem;
    }
  }
`;

const CalenderView: React.FC = () => {
  const { showModal } = useModal();
  const { isLoading, showDuration, setShowDuration } = useCalender();
  const { activeMonth, currentMonth, prevMonth, nextMonth } = useCalenderNav();
  return (
    <Root>
      <div className='contents'>
        <CalenderGrid month={activeMonth} />
        {isLoading && (
          <div className='overlay'>
            <Spinner />
          </div>
        )}
      </div>
      <Button onClick={currentMonth}>Today</Button>
      <Button onClick={prevMonth}>Prev</Button>
      <Button onClick={nextMonth}>Next</Button>
      <Button onClick={() => showModal(<CalenderStats />)}>Stats</Button>
      <Button onClick={() => showModal(<LoginForm />)}>Login</Button>
      <label>
        <input type='checkbox' checked={showDuration} onChange={event => setShowDuration(event.target.checked)} />
        Show durations
      </label>
    </Root>
  );
};

export default CalenderView;
