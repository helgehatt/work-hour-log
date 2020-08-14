import React from 'react';
import styled, { css } from 'styled-components';
import constants from './util/constants';
import { useCalender } from './Calender';
import CalenderEntry from './CalenderEntry';

interface IProps {
  date: string;
}

const Root = styled.div<{ active: boolean }>`
  padding: 0.25rem;
  min-height: 5rem;
  border-right: ${constants.BORDER};
  border-bottom: ${constants.BORDER};
  ${({ active }) => !active ? css`
    color: ${constants.BORDER_COLOR};
  ` : ''}
`;

const CellLabel = styled.span<{ today: boolean }>`
  font-size: 0.9rem;
  padding: 0.25rem;
  ${({ today }) => today ? css`
    color: white;
    background-color: red;
    border-radius: 50%;
  ` : ''}
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { today, active, hours } = useCalender(date);
  return (
    <Root active={active}>
      <CellLabel today={today}>
        {Number(date.substr(8))}
      </CellLabel>
      {hours?.map(entry => (
        <React.Fragment key={entry._id}>
          <CalenderEntry entry={entry} />
        </React.Fragment>
      ))}
    </Root>
  );
}

export default CalenderCell;