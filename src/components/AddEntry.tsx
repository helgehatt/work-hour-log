import React from 'react';
import styled from 'styled-components';
import TimeSelect from 'src/components/TimeSelect';
import moment from 'moment';
import Modal from 'src/components/atomic/Modal';
import API from 'src/API';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import { useCalenderProjects } from 'src/components/AppProviders/CalenderProvider';

interface IProps {
  date: string;
}

const Root = styled(Modal)``;

const AddEntry: React.FC<IProps> = ({ date }) => {
  const projects = useCalenderProjects();

  const [start] = React.useState(moment.utc(date).hour(9).startOf('hour'));
  const [stop] = React.useState(moment.utc(date).hour(16).startOf('hour'));
  const [project, setProject] = React.useState<string>();

  const dispatch = useDispatch();

  const handleAdd = () =>
    dispatch(
      API.actions.hours.create({
        start: start.toISOString(),
        stop: stop.toISOString(),
        project: project || undefined,
      })
    );

  return (
    <Root>
      <div>
        Start:&nbsp;
        <TimeSelect timestamp={start} />
      </div>
      <div>
        Stop:&nbsp;
        <TimeSelect timestamp={stop} />
      </div>
      <div>
        Project:&nbsp;
        <input type='text' list='projects' onChange={({ target: { value } }) => setProject(value)} />
        <datalist id='projects'>
          {projects.map(project => (
            <option key={project} value={project} />
          ))}
        </datalist>
      </div>
      <div>
        <button onClick={handleAdd}>Add</button>
      </div>
    </Root>
  );
};

export default AddEntry;
