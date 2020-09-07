import React from 'react';
import styled, { css } from 'styled-components';
import constants from 'src/components/util/constants';
import { useCalenderDate } from 'src/components/providers/CalenderProvider';
import CalenderEntry from 'src/components/CalenderEntry';
import { useModal } from 'src/components/providers/ModalProvider';
import AddEntryModal from 'src/components/AddEntryModal';

interface IProps {
  date: string;
}

const Root = styled.div<{ isToday: boolean }>`
  min-height: 5rem;
  border-right: ${constants.BORDER};
  border-bottom: ${constants.BORDER};
  ${({ isToday }) => isToday ? css`
    background-color: ${constants.BORDER_COLOR};
  ` : ''}
`;

const CellLabel = styled.span<{ isActive: boolean }>`
  font-size: 0.9rem;
  padding: 0.25rem;
  ${({ isActive }) => !isActive ? css`
    color: ${constants.BORDER_COLOR};
  ` : ''}
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = useCalenderDate(date);

  const handleClick = () => {
    showModal(<AddEntryModal date={date} />);
  };

  return (
    <Root isToday={isToday} onClick={handleClick}>
      <CellLabel isActive={isActive}>
        {Number(date.substr(8))}
      </CellLabel>
      {isActive && hours?.map(entry => (
        <React.Fragment key={entry.id}>
          <CalenderEntry {...entry} />
        </React.Fragment>
      ))}
    </Root>
  );
};

export default CalenderCell;