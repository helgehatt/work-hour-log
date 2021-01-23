import React from 'react';
import styled from 'styled-components';
import API from 'src/API';
import { createFormScheme, withFormData } from 'minimal-form-data-hoc';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import { useCalenderProjects } from 'src/components/AppProviders/CalenderProvider';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

const schemeFactory = (props: IProps) =>
  createFormScheme({
    start: { value: '09:00' },
    stop: { value: '17:00' },
    project: { value: '' },
  });

const AddEntry: React.FC<IProps> = withFormData(schemeFactory)(({ data, date }) => {
  const projects = useCalenderProjects();

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      API.actions.hours.create({
        start: date + `T${data.start.value}:00Z`,
        stop: date + `T${data.stop.value}:00Z`,
        project: data.project.value || undefined,
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
              value={data.start.value}
              onChange={data.start.onChange}
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
              value={data.stop.value}
              onChange={data.stop.onChange}
            />
          </div>
          <Autocomplete
            id='entry-project'
            options={projects}
            freeSolo
            value={data.project.value}
            inputValue={data.project.value}
            onInputChange={(event, value) => {
              data.project.onChange({ target: { value } });
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
