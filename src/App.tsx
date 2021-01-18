import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppProviders from 'src/components/AppProviders';
import CalenderView from 'src/components/CalenderView';
import AppEffects from './components/AppEffects';

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppEffects>
        <CssBaseline />
        <CalenderView />
      </AppEffects>
    </AppProviders>
  );
};

export default App;
