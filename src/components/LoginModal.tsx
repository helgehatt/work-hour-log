import React from 'react';
import styled from 'styled-components';
import { withFormData, createFormData } from 'src/components/util/withFormData';
import { useModal } from 'src/components/providers/ModalProvider';
import Modal from 'src/components/Modal';
import API from 'src/components/util/API';

const Root = styled(Modal)`

`;

const scheme = createFormData({
  'username': { value: '' },
  'password': { value: '' },
});

const LoginModal: React.FC = withFormData(scheme)(({ data }) => {
  const { hideModal } = useModal();

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
        <input 
          type='text' 
          value={data.username.value} 
          onChange={data.username.onChange}
        />
        <input 
          type='password' 
          value={data.password.value} 
          onChange={data.password.onChange}
        />
        <button type='submit'>Submit</button>
      </form>
      {error}
    </Root>
  );
});

export default LoginModal;