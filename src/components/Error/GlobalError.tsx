import React from 'react';
import './GlobalError.css';

/**
 * GlobalError - Component which displays an error
 * Description - Displays the error globally regardless of where it happened.
 */
function GlobalError(): JSX.Element {
  return (
    <div>
      <p>Error: Testing</p>
    </div>
  );
}

export default GlobalError;
