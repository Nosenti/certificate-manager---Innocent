import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { CommentProvider } from './context/CommentContext';

const container: HTMLElement | null = document.getElementById('root');

/** Check if root element exists
 * Render the page if it exists and console the error if it does not.
 */
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <LanguageProvider>
        <UserProvider>
          <CommentProvider>
            <App />
            </CommentProvider>
          </UserProvider>
      </LanguageProvider>
      
    </StrictMode>,
  );
} else {
  throw new Error('Failed to find the root element');
}
