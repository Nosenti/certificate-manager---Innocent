import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { ApiProvider } from './context/ApiContext';

const container: HTMLElement | null = document.getElementById('root');

/** Check if root element exists
 * Render the page if it exists and console the error if it does not.
 */
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ApiProvider>
        <LanguageProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </LanguageProvider>
      </ApiProvider>
      
    </StrictMode>,
  );
} else {
  throw new Error('Failed to find the root element');
}
