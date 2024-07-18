import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useState } from 'react';

function Sidebar(): JSX.Element {
  const [mlExpanded, setMlExpanded] = useState(false);

  const toggleMlExpanded = () => {
    setMlExpanded(!mlExpanded);
  }

  return (
    <>
      <div className="dccs">
        <h1>DCCS Tuzla</h1>
      </div>
      <div className="sidebar-wrapper">
        <div>
          <NavLink className="nav-item" to="/start">
            <span>
              <svg
                className="icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span>Start</span>
          </NavLink>
          <div className="ml-op">
            <span>
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
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </span>
            <p
              className={mlExpanded ? "expanded" : ""}
              onClick={toggleMlExpanded}
            >
              Machine Learning
            </p>
            <span>
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
          <ul className="ml" style={{ display: mlExpanded ? "block" : "none" }}>
            <li>
              <NavLink className="example" to="/example1">
                Example 1
              </NavLink>
            </li>
            <li>
              <NavLink className="example" to="/example2">
                Example 2
              </NavLink>
            </li>
            <li>
              <NavLink className="example" to="/example3">
                Example 3
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
