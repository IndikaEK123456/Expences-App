import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const startApp = () => {
  const container = document.getElementById('root');
  if (!container) return;

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("React Mounting Error:", error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif;">
        <h2 style="color: #ef4444;">Initialization Error</h2>
        <p style="color: #64748b;">The app failed to load. Please try refreshing.</p>
      </div>
    `;
  }
};

// Handle potential race conditions with DOM loading
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startApp();
} else {
  document.addEventListener('DOMContentLoaded', startApp);
}

// Global catch-all for module errors
window.addEventListener('error', (e) => {
  console.error("Global script error:", e.message);
});