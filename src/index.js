import 'helpers/initFA';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from './Main';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* <ErrorBoundary> */}
    <Main>
      <App />
    </Main>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
