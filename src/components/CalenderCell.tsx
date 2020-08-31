import React from 'react';
import styled, { css } from 'styled-components';
import constants from 'src/components/util/constants';
import { useCalenderDate } from 'src/components/providers/CalenderProvider';
import CalenderEntry from 'src/components/CalenderEntry';
import { useModal } from 'src/components/providers/ModalProvider';
import Modal from 'src/components/Modal';
import AddEntry from 'src/components/AddEntry';

interface IProps {
  date: string;
}

const Root = styled.div<{ isActive: boolean }>`
  padding: 0.25rem;
  min-height: 5rem;
  border-right: ${constants.BORDER};
  border-bottom: ${constants.BORDER};
  ${({ isActive }) => !isActive ? css`
    color: ${constants.BORDER_COLOR};
  ` : ''}
`;

const CellLabel = styled.span<{ isToday: boolean }>`
  font-size: 0.9rem;
  padding: 0.25rem;
  ${({ isToday }) => isToday ? css`
    color: white;
    background-color: red;
    border-radius: 50%;
  ` : ''}
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = useCalenderDate(date);

  const handleClick = () => {
    showModal(
      <Modal>
        <AddEntry date={date} />
      </Modal>
    );
  };

  return (
    <Root isActive={isActive} onClick={handleClick}>
      <CellLabel isToday={isToday}>
        {Number(date.substr(8))}
      </CellLabel>
      {hours?.map(entry => (
        <React.Fragment key={entry.id}>
          <CalenderEntry {...entry} />
        </React.Fragment>
      ))}
    </Root>
  );
};

export default CalenderCell;