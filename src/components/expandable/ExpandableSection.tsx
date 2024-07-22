import React, { FC, useState } from 'react'
import "./ExpandableSection.css"

interface ExpandableSectionProps {
	title: string,
	icon: React.ReactNode,
	children: React.ReactNode
}
const ExpandableSection: FC<ExpandableSectionProps> = ({ title, icon, children }) => {

	const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  return (
	 <div>
      <div className="expandable-header" onClick={toggleExpanded}>
        <span className="icon">{icon}</span>
        <p className={expanded ? "expanded" : ''}>{title}</p>
        <span className={`arrow ${expanded ? "expanded" : ''}`}>
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
        {children}
      </ul>
    </div>
  )
}

export default ExpandableSection
