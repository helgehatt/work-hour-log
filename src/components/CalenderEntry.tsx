import React from 'react';
import styled from 'styled-components';
import { useModal } from 'src/components/providers/ModalProvider';
import EditEntryModal from 'src/components/EditEntryModal';
import moment from 'moment';

const Root = styled.div`
  padding: 0rem 0.25rem 0.1rem 0.25rem;
  color: white;
  background-color: #899cd9;

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
    showModal(<EditEntryModal entry={entry} />);
  };

  return (
    <Root onClick={handleClick}>
      {start} {stop}
    </Root>
  );
};

export default CalenderEntry;