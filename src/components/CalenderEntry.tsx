import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EditEntry from 'src/components/EditEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TimeText from 'src/components/TimeText';

interface IProps extends WorkHourEntry {
  disabled?: boolean;
}

const Root = styled(Button)`
  > span {
    justify-content: space-evenly;
  }
`;

const CalenderEntry: React.FC<IProps> = ({ disabled, ...entry }) => {
  const { showModal } = useModal();
  const { showDuration } = useCalender();

  const handleClick = (event: React.SyntheticEvent) => {
    // Avoid propagation to CalenderCell
    event.stopPropagation();
    showModal(<EditEntry entry={entry} />);
  };

  const start = moment.utc(entry.start);
  const stop = moment.utc(entry.stop);
  const break_ = (entry.break ?? '00:00')
    .split(':')
    .map(Number)
    .map((v, i) => v * [60, 1][i]) // Convert hours to minutes
    .reduce((x, y) => x + y, 0); // Sum list of minutes

  const duration = stop.diff(start, 'minutes') - break_;

  return (
    <Root
      onClick={handleClick}
      color={!entry.project ? 'primary' : 'secondary'}
      variant='contained'
      size='small'
      fullWidth
      disabled={disabled}
    >
      {showDuration ? (
        <Typography variant='body2'>
          <TimeText hours={Math.floor(duration / 60)} minutes={duration % 60} />
        </Typography>
      ) : (
        <>
          <Typography variant='body2'>
            <TimeText hours={start.hours()} minutes={start.minutes()} />
          </Typography>
          <Typography variant='body2'>
            <TimeText hours={stop.hours()} minutes={stop.minutes()} />
          </Typography>
        </>
      )}
    </Root>
  );
};

export default CalenderEntry;
