import React from 'react';
import Calender from './components/Calender';
import { ModalProvider } from './components/ModalProvider';

const App: React.FC = () => {
  return (
    <ModalProvider>
      <Calender />
    </ModalProvider>
  );
}

export default App;
