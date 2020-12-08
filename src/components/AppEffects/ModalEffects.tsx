import React from 'react';
import API from 'src/API';
import { useModal } from 'src/components/AppProviders/ModalProvider';

const ModalEffects: React.FC = ({ children }) => {
  const { hideModal } = useModal();

  React.useEffect(() => {
    const fn = API.subscriptions.add(event => {
      switch (event.type) {
        case API.constants.hours.HOURS_READ_SUCCESS:
          hideModal();
      }
    });
    return () => API.subscriptions.remove(fn);
  }, [hideModal]);

  return <>{children}</>;
};

export default ModalEffects;
