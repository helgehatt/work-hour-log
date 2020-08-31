import React from 'react';
import styled from 'styled-components';
import { useModal } from 'src/components/providers/ModalProvider';
import Modal from 'src/components/Modal';
import EditEntry from 'src/components/EditEntry';
import moment from 'moment';

const Root = styled.div`
  /* margin: 0.25rem; */
  padding: 0rem 0.25rem 0.1rem 0.25rem;
  color: white;
  background-color: blue;
  border-radius: 0.25rem;

  &:hover {
    cursor: pointer;
  }
`;

const CalenderEntry: React.FC<WorkHourEntry> = (entry) => {
  const { showModal } = useModal();

  const start = moment.utc(entry.start).format(moment.HTML5_FMT.TIME);
  const stop = moment.utc(entry.stop).format(moment.HTML5_FMT.TIME);

  const handleClick = (event: React.SyntheticEvent) => {
    // Avoid propagation to CalenderCell
    event.stopPropagation();
    showModal(
      <Modal>
        <EditEntry entry={entry} />
      </Modal>
    );
  };

  return (
    <Root onClick={handleClick}>
      {start} - {stop}
    </Root>
  );
};

export default CalenderEntry;