import React from 'react';
import styled from 'styled-components';
import { withFormData, createFormScheme } from 'src/components/util/withFormData';
import { useAPIDispatch, APIActions, useAPIEvent, APIConstants } from 'src/components/providers/APIProvider';
import Modal from 'src/components/Modal';

const Root = styled(Modal)`
  form > div {
    display: flex;
    justify-content: space-between;
  }
`;

const scheme = createFormScheme({
  'username': { value: '' },
  'password': { value: '' },
});

const LoginModal: React.FC = withFormData(scheme)(({ data }) => {
  const APIDispatch = useAPIDispatch();
  const APIEvent = useAPIEvent();

  const [error, setError] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    APIDispatch(APIActions.auth.login({ 
      username: data.username.value, 
      password: data.password.value,
    }));
  };

  React.useEffect(() => {
    if (APIEvent?.type === APIConstants.auth.AUTH_LOGIN_FAILURE) {
      setError('Invalid username or password');
    }
  }, [APIEvent]);

  return (
    <Root>
      Login
      <form onSubmit={handleSubmit}>
        <div>
          Username:&nbsp;
          <input 
            type='text' 
            value={data.username.value} 
            onChange={data.username.onChange}
          />
        </div>
        <div>
          Password:&nbsp;
          <input 
            type='password' 
            value={data.password.value} 
            onChange={data.password.onChange}
          />
        </div>
        <div>
          <span/>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {error}
    </Root>
  );
});

export default LoginModal;