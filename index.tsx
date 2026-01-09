import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Starting SpendWise Pro...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React application mounted successfully.");
  } catch (error) {
    console.error("Critical error during React initialization:", error);
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; color: #334155;">
        <h2 style="color: #ef4444;">App failed to load</h2>
        <p>Please check your internet connection and refresh the page.</p>
        <button onclick="window.location.reload()" style="margin-top: 16px; padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 8px; font-weight: bold;">Refresh</button>
      </div>
    `;
  }
} else {
  console.error("The #root element was not found in the DOM.");
}

// Global error tracking for deployment debugging
window.addEventListener('error', (event) => {
  console.error("Runtime error caught:", event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});