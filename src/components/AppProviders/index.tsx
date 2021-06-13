import React from 'react';
import AuthProvider from 'src/components/AppProviders/AuthProvider';
import CalenderProvider from 'src/components/AppProviders/CalenderProvider';
import EventProvider from 'src/components/AppProviders/EventProvider';
import ModalProvider from 'src/components/AppProviders/ModalProvider';

const AppProviders: React.FC = ({ children }) => {
  return (
    <EventProvider>
      <AuthProvider>
        <CalenderProvider>
          <ModalProvider>{children}</ModalProvider>
        </CalenderProvider>
      </AuthProvider>
    </EventProvider>
  );
};

export default AppProviders;
