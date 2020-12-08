import React from 'react';
import EventProvider from './EventProvider';
import ModalProvider from './ModalProvider';
import CalenderProvider from './CalenderProvider';

const AppProviders: React.FC = ({ children }) => {
  return (
    <EventProvider>
      <CalenderProvider>
        <ModalProvider>{children}</ModalProvider>
      </CalenderProvider>
    </EventProvider>
  );
};

export default AppProviders;
