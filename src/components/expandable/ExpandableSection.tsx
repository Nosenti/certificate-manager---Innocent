import React, { FC, useEffect, useState } from 'react';
import './expandablesection.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  initialSelected?: string;
  isActive: boolean;
  onToggle: () => void;
}

/**
 * ExpandableSection - Create a reusable Expandable section to hold navigation links
 */
const ExpandableSection: FC<ExpandableSectionProps> = ({
  title,
  icon,
  children,
  initialSelected,
  isActive,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === initialSelected) {
      setExpanded(true);
    }
  }, [location.pathname, initialSelected]);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering any other click handlers
    setExpanded((prev) => !prev);
    onToggle();
    if (!expanded && initialSelected) {
      navigate(initialSelected);
    }
  };

  return (
    <div className={`expandable-section ${isActive ? 'active' : ''}`}>
      <div className="expandable-header">
        <span className="icon">{icon}</span>
        <p className={expanded ? 'expanded' : ''}>{title}</p>
        <span
          className={`arrow ${expanded ? 'expanded' : ''}`}
          onClick={toggleExpanded}
        >
          <svg
            className="icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
        </span>
      </div>
      <ul
        className="expandable-content"
        style={{ display: expanded ? 'block' : 'none' }}
      >
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, {
            onClick: () => {
              navigate((child as React.ReactElement<any>).props.to);
            },
          }),
        )}
      </ul>
    </div>
  );
};

export default ExpandableSection;
