import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EditEntry from 'src/components/EditEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';

const Root = styled.div<{ isDefault: boolean }>`
  padding: 0rem 0.25rem 0.1rem 0.25rem;
  color: white;
  background-color: ${({ isDefault }) => (isDefault ? '#899cd9' : '#90d989')};

  &:hover {
    cursor: pointer;
  }
`;

const CalenderEntry: React.FC<WorkHourEntry> = entry => {
  const { showModal } = useModal();

  const start = moment.utc(entry.start).format(moment.HTML5_FMT.TIME);
  const stop = moment.utc(entry.stop).format(moment.HTML5_FMT.TIME);

  const handleClick = (event: React.SyntheticEvent) => {
    // Avoid propagation to CalenderCell
    event.stopPropagation();
    showModal(<EditEntry entry={entry} />);
  };

  return (
    <Root isDefault={!entry.project} onClick={handleClick}>
      {start}&nbsp;{stop}
    </Root>
  );
};

export default CalenderEntry;
