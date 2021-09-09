import React from 'react';
import styled from 'styled-components';
import CalendarEntry from 'src/Pages/Calendar/CalendarEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import AddEntry from 'src/Pages/Calendar/AddEntry';
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';

interface IProps {
  date: string;
}

const Root = styled.div`
  min-height: 10rem;
  padding: 0;
  overflow-x: hidden;
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  > *:first-child {
    display: inline-block;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 16px;
  }

  > * {
    margin-top: 2px !important;
    min-width: unset !important;
  }
`;

const CalendarCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = CalendarHooks.useDate(date);

  const handleClick = () => {
    showModal(<AddEntry date={date} />);
  };

  return (
    <Root onClick={handleClick}>
      <div className={isToday ? 'MuiAppBar-colorSecondary' : undefined}>
        <span>{Number(date.substr(8))}</span>
      </div>
      {hours?.map(entry => (
        <CalendarEntry key={entry.id} {...entry} disabled={!isActive} />
      ))}
    </Root>
  );
};

export default CalendarCell;
