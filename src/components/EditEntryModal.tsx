import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import Modal from 'src/components/Modal';
import API from 'src/API';

interface IProps {
  entry: WorkHourEntry
}

const Root = styled(Modal)`

`;

const EditEntryModal: React.FC<IProps> = ({ entry }) => {
  const [start] = React.useState(moment.utc(entry.start));
  const [stop] = React.useState(moment.utc(entry.stop));

  const dispatch = useDispatch();

  const handleUpdate = () => dispatch(API.actions.hours.update({
    id: entry.id,
    start: start.toISOString(),
    stop: stop.toISOString(),
  }));

  const handleDelete = () => dispatch(API.actions.hours.delete({ id: entry.id }));

  return (
    <Root>
      <div>Start: <TimeSelect timestamp={start} /></div>
      <div>Stop: <TimeSelect timestamp={stop} /></div>
      <div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Root>
  );
};

export default EditEntryModal;