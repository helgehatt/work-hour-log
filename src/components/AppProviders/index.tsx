import React from 'react';
import AuthProvider from 'src/components/AppProviders/AuthProvider';
import CalendarProvider from 'src/components/AppProviders/CalendarProvider';
import EventProvider from 'src/components/AppProviders/EventProvider';
import ModalProvider from 'src/components/AppProviders/ModalProvider';

const AppProviders: React.FC = ({ children }) => {
  return (
    <EventProvider>
      <AuthProvider>
        <CalendarProvider>
          <ModalProvider>{children}</ModalProvider>
        </CalendarProvider>
      </AuthProvider>
    </EventProvider>
  );
};

export default AppProviders;
