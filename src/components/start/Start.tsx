import { FC } from 'react';
import './Start.css';

interface StartProps {
  title?: string;
}
/**
 * Start - Placeholder component
 * Description - Placeholder for the Start page
 */
const Start: FC<StartProps> = ({ title = 'Start' }) => {
  return (
    <div className="start">
      <h1>{title}</h1>
    </div>
  );
};

export default Start;
