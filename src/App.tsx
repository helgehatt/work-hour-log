import React from 'react';
import CalenderProvider from 'src/components/providers/CalenderProvider';
import ModalProvider from 'src/components/providers/ModalProvider';
import CalenderView from 'src/components/CalenderView';

const App: React.FC = () => {
  return (
    <CalenderProvider>
      <ModalProvider>
        <CalenderView />
      </ModalProvider>
    </CalenderProvider>
  );
}

export default App;
