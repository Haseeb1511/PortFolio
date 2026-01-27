import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('main.jsx is running'); // Debug log

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement); // Debug log

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React rendered successfully');
  } catch (error) {
    console.error('Error rendering React app:', error);
    rootElement.innerHTML = `<div style="color: red; padding: 20px;"><h1>Error</h1><pre>${error.message}</pre></div>`;
  }
} else {
  console.error('Root element not found');
}
