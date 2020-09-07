import React from 'react';
import styled from 'styled-components';
import { useModal } from 'src/components/providers/ModalProvider';

const Overlay = styled.div`
  position: fixed !important;
  background: rgba(0,0,0,0.75);
  top: 0; bottom: 0; left: 0; right: 0;
`;

const Root = styled.div`
  background-color: white;
  margin: auto;
  margin-top: 2rem;
  width: max-content;
  max-width: 100%;
  border-radius: 0.25rem;
  padding: 1rem;
`;

const Modal: React.FC = ({ children, ...props }) => {
  const { hideModal } = useModal();
  return (
    <Overlay onClick={hideModal}>
      <Root onClick={event => event.stopPropagation()} {...props}>
        {children}
      </Root>
    </Overlay>
  );
};

export default Modal;