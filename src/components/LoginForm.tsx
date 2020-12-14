import React from 'react';
import styled from 'styled-components';
import { withFormData, createFormScheme } from 'minimal-form-data-hoc';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import Modal from 'src/components/atomic/Modal';
import API from 'src/API';

const Root = styled(Modal)`
  form > div {
    display: flex;
    justify-content: space-between;
  }
`;

const scheme = createFormScheme({
  username: { value: '' },
  password: { value: '' },
});

const LoginForm: React.FC = withFormData(scheme)(({ data }) => {
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
    <Root>
      Login
      <form onSubmit={handleSubmit}>
        <div>
          Username:&nbsp;
          <input type='text' value={data.username.value} onChange={data.username.onChange} />
        </div>
        <div>
          Password:&nbsp;
          <input type='password' value={data.password.value} onChange={data.password.onChange} />
        </div>
        <div>
          <span />
          <button type='submit'>Submit</button>
        </div>
      </form>
      {error}
    </Root>
  );
});

export default LoginForm;
