import React from 'react';
import ReactDOM from 'react-dom/client';
import ClickDetector from './components/ClickDetector';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ClickDetector />
  </React.StrictMode>
);
