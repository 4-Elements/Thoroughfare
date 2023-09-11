// import
import App from './app.jsx';
import React from 'react';
import StoreProvider from './pages/Store.js';
import { createRoot } from 'react-dom/client';
import '../client/styles/styles.scss';

// render the app using the ReactDOM
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
