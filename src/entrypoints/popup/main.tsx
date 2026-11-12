import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../styles/globals.css';
import { PopupApp } from './PopupApp';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <PopupApp />
    </React.StrictMode>
  );
}
