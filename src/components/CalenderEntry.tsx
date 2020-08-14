import React from 'react';
import styled from 'styled-components';
import { useModal } from './ModalProvider';
import CalenderModal from './CalenderModal';

interface IProps {
  entry: WorkHourEntry
}

const Root = styled.div`
  /* margin: 0.25rem; */
  padding: 0rem 0.25rem 0.1rem 0.25rem;
  color: white;
  background-color: blue;
  border-radius: 0.25rem;
`;

const CalenderEntry: React.FC<IProps> = ({ entry }) => {
  const { showModal } = useModal();
  const start = entry.start.substr(11, 5);
  const stop = entry.stop.substr(11, 5);
  return (
    <Root onClick={() => showModal(<CalenderModal />)}>
      {start} - {stop}
    </Root>
  );
};

export default CalenderEntry;