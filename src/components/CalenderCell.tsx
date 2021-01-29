import React from 'react';
import styled from 'styled-components';
import CalenderEntry from 'src/components/CalenderEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import AddEntry from 'src/components/AddEntry';
import Chip from '@material-ui/core/Chip';
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';

interface IProps {
  date: string;
}

const Root = styled.div`
  display: block;
  text-align: center;
  min-height: 10rem;
  padding: 0;
  overflow-x: hidden;

  > span {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .MuiChip-colorNone {
    background-color: unset;
  }
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = CalendarHooks.useDate(date);

  const handleClick = () => {
    showModal(<AddEntry date={date} />);
  };

  const classes = ['MuiButtonBase-root', 'MuiButton-root'];

  if (!isActive) {
    classes.push('Mui-disabled');
  }

  return (
    <Root onClick={handleClick} className={classes.join(' ')}>
      <Chip
        label={Number(date.substr(8))}
        size='small'
        className={isToday ? 'MuiChip-colorSecondary' : 'MuiChip-colorNone'}
      />
      {hours?.map(entry => (
        <CalenderEntry key={entry.id} {...entry} disabled={!isActive} />
      ))}
    </Root>
  );
};

export default CalenderCell;
