import React from 'react';
import AppProviders from 'src/components/AppProviders';
import CalenderView from 'src/components/CalenderView';
import AppEffects from './components/AppEffects';

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppEffects>
        <CalenderView />
      </AppEffects>
    </AppProviders>
  );
};

export default App;
