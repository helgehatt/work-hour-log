import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'src/App';
import AppProviders from 'src/components/AppProviders';
import AppEffects from 'src/components/AppEffects';
import GlobalStyle from 'src/GlobalStyle';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AppProviders>
        <AppEffects>
          <App />
        </AppEffects>
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
