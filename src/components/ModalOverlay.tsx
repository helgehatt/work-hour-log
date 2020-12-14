import React from 'react';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import styled from 'styled-components';

interface IProps {}

const Root = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.75);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
`;

const ModalOverlay: React.FC<IProps> = ({ children }) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const { hideModal } = useModal();

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') hideModal();
    },
    [hideModal]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === overlayRef.current) hideModal();
    },
    [hideModal]
  );

  React.useEffect(() => {
    overlayRef.current?.focus();
  }, []);

  return (
    <Root
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      ref={overlayRef}
      tabIndex={-1} // make div focusable
    >
      {children}
    </Root>
  );
};

export default ModalOverlay;
