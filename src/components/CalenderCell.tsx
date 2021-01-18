import React from 'react';
import styled from 'styled-components';
import { useCalenderDate } from 'src/components/AppProviders/CalenderProvider';
import CalenderEntry from 'src/components/CalenderEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import AddEntry from 'src/components/AddEntry';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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
`;

const CalenderCell: React.FC<IProps> = ({ date }) => {
  const { showModal } = useModal();
  const { isToday, isActive, hours } = useCalenderDate(date);

  const handleClick = () => {
    showModal(<AddEntry date={date} />);
  };

  const classes = ['MuiButtonBase-root', 'MuiButton-root'];

  if (!isActive) {
    classes.push('Mui-disabled');
  }

  return (
    <Root onClick={handleClick} className={classes.join(' ')}>
      {isToday ? (
        <Chip label={Number(date.substr(8))} color='secondary' size='small' style={{ marginBottom: '-2px' }} />
      ) : (
        <Typography variant='subtitle2'>{Number(date.substr(8))}</Typography>
      )}
      {hours?.map(entry => (
        <CalenderEntry key={entry.id} {...entry} disabled={!isActive} />
      ))}
    </Root>
  );
};

export default CalenderCell;
