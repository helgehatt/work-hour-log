import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import Modal from 'src/components/Modal';
import { useAPIDispatch, APIActions } from './providers/APIProvider';

interface IProps {
  date: string
}

const Root = styled(Modal)`

`;

const AddEntryModal: React.FC<IProps> = ({ date }) => {
  const [start] = React.useState(moment.utc(date).hour(9).startOf('hour'));
  const [stop] = React.useState(moment.utc(date).hour(16).startOf('hour'));

  const APIDispatch = useAPIDispatch();
  
  const handleAdd = () => APIDispatch(APIActions.hours.create({
    start: start.toISOString(),
    stop: stop.toISOString(),
  }));

  return (
    <Root>
      <div>Start: <TimeSelect timestamp={start} /></div>
      <div>Stop: <TimeSelect timestamp={stop} /></div>
      <div>
        <button onClick={handleAdd}>Add</button>
      </div>
    </Root>
  );
};

export default AddEntryModal;