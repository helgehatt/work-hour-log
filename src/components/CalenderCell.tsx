import React from 'react';
import styled from 'styled-components';
import constants from 'src/components/util/constants';
import { useCalenderDate } from 'src/components/AppProviders/CalenderProvider';
import CalenderEntry from 'src/components/CalenderEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import AddEntryModal from 'src/components/AddEntryModal';

interface IProps {
  date: string;
}

const Root = styled.div<{ isToday: boolean }>`
  min-height: 5rem;
  font-size: min(5vw, 1rem);
  overflow-x: hidden;

  ${({ isToday }) => isToday && `background-color: ${constants.BORDER_COLOR};`}

  > div:last-child {
    margin-bottom: 1rem;
  }
`;

const CellLabel = styled.span<{ isActive: boolean }>`
  font-size: 0.9rem;
  padding: 0.25rem;
  ${({ isActive }) => !isActive && `color: ${constants.BORDER_COLOR};`}
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = useCalenderDate(date);

  const handleClick = () => {
    showModal(<AddEntryModal date={date} />);
  };

  return (
    <Root isToday={isToday} onClick={handleClick}>
      <CellLabel isActive={isActive}>{Number(date.substr(8))}</CellLabel>
      {isActive &&
        hours?.map(entry => (
          <React.Fragment key={entry.id}>
            <CalenderEntry {...entry} />
          </React.Fragment>
        ))}
    </Root>
  );
};

export default CalenderCell;
