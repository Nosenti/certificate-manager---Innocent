//import Button from "../button/Button";
import "./Sidebar.css"

function Sidebar(): JSX.Element {
  return (
    <>
      <div className="dccs">
			  <h1>DCCS Tuzla</h1>
      </div>
      <div className="sidebar-wrapper">
        <div>
          <div>Start</div>
          <ul className="ml">
            <p>Machine Learning</p>
            <li>Example 1</li>
            <li>Example 2</li>
            <li>Example 5</li>
          </ul>
        </div>
        {/* <Button variation="primary" size="medium">Button</Button> */}
      </div>
    </>
  );
}

export default Sidebar;
