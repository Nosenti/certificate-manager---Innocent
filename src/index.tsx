import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container: HTMLElement | null = document.getElementById('root');

/** Check if root element exists
 * Render the page if it exists and console the erro if it does nto. 
 */
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('Failed to find the root element');
}
