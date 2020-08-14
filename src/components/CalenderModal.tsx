import React from 'react';
import styled from 'styled-components';
import { useModal } from './ModalProvider';

const Root = styled.div`
  position: fixed !important;
  background: rgba(0,0,0,0.75);

  .modal {
    background-color: white;
    margin: auto;
    margin-top: 2rem;
    width: 450px;
    height: 600px;
    border-radius: 0.25rem;
  }
`;


const CalenderModal: React.FC = () => {
  const { hideModal } = useModal();
  return (
    <Root className='overlay' onClick={hideModal}>
      <div className='modal'>
        hello
      </div>
    </Root>
  );
};

export default CalenderModal;