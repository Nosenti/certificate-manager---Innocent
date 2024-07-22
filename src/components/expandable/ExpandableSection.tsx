import React, { FC, useEffect, useState } from 'react';
import './expandablesection.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface ExpandableSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  initialSelected?: string;
}

const ExpandableSection: FC<ExpandableSectionProps> = ({
  title,
  icon,
  children,
  initialSelected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeChild, setActiveChild] = useState(initialSelected);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (expanded && initialSelected && location.pathname === initialSelected) {
      setActiveChild(initialSelected);
    }
  }, [expanded, initialSelected, location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith('/example')) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [location.pathname]);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
    if (!expanded && initialSelected) {
      navigate(initialSelected);
    }
  };

  return (
    <div className={`expandable-section ${expanded ? 'active' : ''}`}>
      <div className="expandable-header" onClick={toggleExpanded}>
        <span className="icon">{icon}</span>
        <p className={expanded ? 'expanded' : ''}>{title}</p>
        <span className={`arrow ${expanded ? 'expanded' : ''}`}>
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
      <ul className="expandable-content" style={{ display: expanded ? 'block' : 'none' }}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement<any>, {
            isActive: activeChild === (child as React.ReactElement<any>).props.to,
            onClick: () => {
              setActiveChild((child as React.ReactElement<any>).props.to);
              navigate((child as React.ReactElement<any>).props.to);
            },
          })
        )}
      </ul>
    </div>
  );
};

export default ExpandableSection;
