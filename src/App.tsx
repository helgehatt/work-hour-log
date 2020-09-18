import React from 'react';
import APIProvider from 'src/components/providers/APIProvider';
import CalenderProvider from 'src/components/providers/CalenderProvider';
import ModalProvider from 'src/components/providers/ModalProvider';
import CalenderView from 'src/components/CalenderView';

const App: React.FC = () => {
  return (
    <APIProvider>
      <ModalProvider>
        <CalenderProvider>
          <CalenderView />
        </CalenderProvider>
      </ModalProvider>
    </APIProvider>
  );
}

export default App;
