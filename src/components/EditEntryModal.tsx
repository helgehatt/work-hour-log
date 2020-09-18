import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import { useAPIDispatch, APIActions } from 'src/components/providers/APIProvider';
import Modal from 'src/components/Modal';

interface IProps {
  entry: WorkHourEntry
}

const Root = styled(Modal)`

`;

const EditEntryModal: React.FC<IProps> = ({ entry }) => {
  const [start] = React.useState(moment.utc(entry.start));
  const [stop] = React.useState(moment.utc(entry.stop));

  const APIDispatch = useAPIDispatch();

  const handleUpdate = () => APIDispatch(APIActions.hours.update({
    id: entry.id,
    start: start.toISOString(),
    stop: stop.toISOString(),
  }));

  const handleDelete = () => APIDispatch(APIActions.hours.delete({ id: entry.id }));

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