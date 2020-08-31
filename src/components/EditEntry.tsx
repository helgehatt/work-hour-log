import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import { useModal } from 'src/components/providers/ModalProvider';
import { useCalenderAPI } from 'src/components/providers/CalenderProvider';

interface IProps {
  entry: WorkHourEntry
}

const Root = styled.div`

`;

const EditEntry: React.FC<IProps> = ({ entry }) => {
  const [start] = React.useState(moment.utc(entry.start));
  const [stop] = React.useState(moment.utc(entry.stop));

  const API = useCalenderAPI();
  const { hideModal } = useModal();

  const handleUpdate = () => {
    API.update({
      id: entry.id,
      start: start.toISOString(),
      stop: stop.toISOString(),
    }).then(hideModal);
  };

  const handleDelete = () => {
    API.delete(entry.id).then(hideModal);
  };

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

export default EditEntry;