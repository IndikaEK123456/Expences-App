
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical error during React initialization:", error);
    container.innerHTML = `<div style="padding: 20px; color: #ef4444; font-family: sans-serif;">
      <h2>Application Error</h2>
      <p>Failed to start the application. Please refresh the page.</p>
    </div>`;
  }
} else {
  console.error("Root element not found");
}

// Global error handler for uncaught exceptions
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Uncaught error:", { message, source, lineno, colno, error });
  return false;
};
