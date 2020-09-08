import React from 'react';
import styled from 'styled-components';
import { withFormData, createFormData } from 'src/components/util/withFormData';
import { useModal } from 'src/components/providers/ModalProvider';
import Modal from 'src/components/Modal';
import { useCalenderAPI } from 'src/components/providers/CalenderProvider';

const Root = styled(Modal)`
  form > div {
    display: flex;
    justify-content: space-between;
  }
`;

const scheme = createFormData({
  'username': { value: '' },
  'password': { value: '' },
});

const LoginModal: React.FC = withFormData(scheme)(({ data }) => {
  const { hideModal } = useModal();
  const API = useCalenderAPI();

  const [error, setError] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    API.login(data.username.value, data.password.value)
      .then(hideModal)
      .catch(() => setError('Invalid password'))
  };

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