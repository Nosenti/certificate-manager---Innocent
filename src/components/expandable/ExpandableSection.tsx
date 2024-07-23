import { FC, useEffect, useState, Children, ReactElement, cloneElement, ReactNode } from 'react';
import './expandablesection.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../public/assets/arrow.svg';

interface ExpandableSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
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
    e.stopPropagation();
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
          <ArrowIcon/>
        </span>
      </div>
      <ul
        className="expandable-content"
        style={{ display: expanded ? 'block' : 'none' }}
      >
        {Children.map(children, (child) =>
          cloneElement(child as ReactElement<any>, {
            onClick: () => {
              navigate((child as ReactElement<any>).props.to);
            },
          }),
        )}
      </ul>
    </div>
  );
};

export default ExpandableSection;
