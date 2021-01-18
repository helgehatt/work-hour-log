import React from 'react';
import styled from 'styled-components';
import { withFormData, createFormScheme } from 'minimal-form-data-hoc';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import API from 'src/API';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

interface IProps {}

const Root = styled(Container)`
  margin-top: 5rem;

  > .MuiPaper-root {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .MuiAvatar-root {
      margin: 0.5rem;
      background-color: #f50057; // TODO:
    }

    form > * {
      margin-top: 1rem;
      width: 100%;
    }
  }
`;

const schemeFactory = (props: IProps) =>
  createFormScheme({
    username: { value: '' },
    password: { value: '' },
  });

const LoginForm: React.FC<IProps> = withFormData(schemeFactory)(({ data }) => {
  const dispatch = useDispatch();

  const [error, setError] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      API.actions.auth.login({
        username: data.username.value,
        password: data.password.value,
      })
    );
  };

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      if (event?.type === API.constants.auth.AUTH_LOGIN_FAILURE) {
        setError('Invalid username or password');
      }
    });
    return () => API.subscriptions.remove(fn);
  }, []);

  return (
    <Root maxWidth='xs' disableGutters>
      <Paper>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign in</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={data.username.value}
            onChange={data.username.onChange}
            error={!!error}
          />
          <TextField
            variant='outlined'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={data.password.value}
            onChange={data.password.onChange}
            error={!!error}
            helperText={error}
          />
          <Button type='submit' variant='contained' color='primary'>
            Sign In
          </Button>
        </form>
      </Paper>
    </Root>
  );
});

export default LoginForm;
