import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TimeSelect from 'src/components/TimeSelect';
import Modal from 'src/components/Modal';
import API from 'src/API';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import { useCalenderProjects } from 'src/components/AppProviders/CalenderProvider';

interface IProps {
  entry: WorkHourEntry
}

const Root = styled(Modal)`

`;

const EditEntryModal: React.FC<IProps> = ({ entry }) => {
  const projects = useCalenderProjects();

  const [start] = React.useState(moment.utc(entry.start));
  const [stop] = React.useState(moment.utc(entry.stop));
  const [project, setProject] = React.useState(entry.project);

  const dispatch = useDispatch();

  const handleUpdate = () => dispatch(API.actions.hours.update({
    id: entry.id,
    start: start.toISOString(),
    stop: stop.toISOString(),
    project: project || undefined,
  }));

  const handleDelete = () => dispatch(API.actions.hours.delete({ id: entry.id }));

  return (
    <Root>
      <div>Start:&nbsp;<TimeSelect timestamp={start} /></div>
      <div>Stop:&nbsp;<TimeSelect timestamp={stop} /></div>
      <div>Project:&nbsp;
        <input
          type='text'
          list='projects'
          defaultValue={project}
          onChange={({ target: { value } }) => setProject(value)}
        />
        <datalist id='projects'>
          {projects.map(project => <option key={project} value={project} />)}
        </datalist>
      </div>
      <div>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </Root>
  );
};

export default EditEntryModal;