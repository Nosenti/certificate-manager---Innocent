import { FC } from 'react';
import './start.css';

interface StartProps {
  title?: string;
}
/**
 * Start - Placeholder component
 * Description - Placeholder for the Home page
 */
const Start: FC<StartProps> = ({ title = 'Home' }) => {
  return (
    <div className="start-text">
      <h1>{title}</h1>
    </div>
  );
};

export default Start;
