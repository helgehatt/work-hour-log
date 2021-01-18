import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import EditEntry from 'src/components/EditEntry';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface IProps extends WorkHourEntry {
  disabled?: boolean;
}

const Root = styled(Button)`
  margin-top: 2px;
`;

const CalenderEntry: React.FC<IProps> = ({ disabled, ...entry }) => {
  const { showModal } = useModal();
  const { showDuration } = useCalender();

  const handleClick = (event: React.SyntheticEvent) => {
    // Avoid propagation to CalenderCell
    event.stopPropagation();
    showModal(<EditEntry entry={entry} />);
  };

  return (
    <Root
      onClick={handleClick}
      color={!entry.project ? 'primary' : 'secondary'}
      variant='contained'
      size='small'
      fullWidth
      disabled={disabled}
    >
      <Typography variant='body2'>
        {showDuration
          ? getDuration(entry.start, entry.stop)
          : `${getTime(entry.start)}\u00A0-\u00A0${getTime(entry.stop)}`}
      </Typography>
    </Root>
  );
};

const getTime = (timestamp: string) =>
  moment.utc(timestamp).format(moment.HTML5_FMT.TIME).replace(/:00$/, '').replace(/:30$/, '\u00BD').replace(/^0/, '');

const getDuration = (start: string, stop: string) =>
  String(moment.utc(stop).diff(moment.utc(start), 'minutes') / 60).replace(/.5$/, '\u00BD');

export default CalenderEntry;
