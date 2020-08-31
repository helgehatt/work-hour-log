import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import { useModal } from 'src/components/providers/ModalProvider';
import { useCalenderAPI } from 'src/components/providers/CalenderProvider';

interface IProps {
  date: string
}

const Root = styled.div`

`;

const AddEntry: React.FC<IProps> = ({ date }) => {
  const [start] = React.useState(moment.utc(date).hour(9).startOf('hour'));
  const [stop] = React.useState(moment.utc(date).hour(16).startOf('hour'));

  const API = useCalenderAPI();
  const { hideModal } = useModal();
  
  const handleAdd = () => {
    API.create({
      start: start.toISOString(),
      stop: stop.toISOString(),
    }).then(hideModal);
  };

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

export default AddEntry;