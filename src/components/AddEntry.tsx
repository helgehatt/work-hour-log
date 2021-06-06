import React from 'react';
import styled from 'styled-components';
import API from 'src/API';
import miniform from 'minimal-form-data-hoc';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';

interface IProps {
  date: string;
}

const Root = styled(Container)`
  margin-top: 5rem;

  > .MuiPaper-root {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;

    form > * {
      margin-top: 1rem;
      width: 100%;
    }
  }

  .row {
    display: flex;
    > * {
      flex-grow: 1;
      :first-child {
        margin-right: 0.5rem;
      }
    }
  }
`;

const schemeFactory = miniform.createFormScheme((props: IProps) => ({
  start: { value: '09:00' },
  stop: { value: '17:00' },
  project: { value: '' },
}));

const AddEntry: React.FC<IProps> = miniform.withFormData(schemeFactory)(props => {
  const projects = CalendarHooks.useProjects();

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      API.actions.hours.create({
        start: props.date + `T${props.start.value}:00Z`,
        stop: props.date + `T${props.stop.value}:00Z`,
        project: props.project.value || undefined,
      })
    );
  };

  return (
    <Root maxWidth='xs' disableGutters>
      <Paper>
        <Typography variant='h6'>Work Hour Entry</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <div className='row'>
            <TextField
              id='entry-start'
              label='Start'
              type='time'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 30 * 60,
              }}
              value={props.start.value}
              onChange={props.start.onChange}
            />
            <TextField
              id='entry-stop'
              label='Stop'
              type='time'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 30 * 60,
              }}
              value={props.stop.value}
              onChange={props.stop.onChange}
            />
          </div>
          <Autocomplete
            id='entry-project'
            options={projects}
            freeSolo
            value={props.project.value}
            inputValue={props.project.value}
            onInputChange={(event, value) => {
              props.project.onChange({ target: { value } });
            }}
            renderInput={params => <TextField {...params} label='Project' variant='outlined' />}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Add
          </Button>
        </form>
      </Paper>
    </Root>
  );
});

export default AddEntry;
