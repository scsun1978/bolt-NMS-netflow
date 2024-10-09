import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('index.tsx: Starting to render');

window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message, source, lineno, colno, error);
  return false;
};

try {
  const root = document.getElementById('root');
  if (root) {
    console.log('Root element found, rendering App');
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('Render complete');
  } else {
    console.error('Root element not found');
  }
} catch (error) {
  console.error('Error during rendering:', error);
}

console.log('index.tsx: Execution complete');