import "./Button.css"

const Button = ({ size = "small", variation = "sidebar", ...props }) => {
  const classNames = `button ${size} ${variation}`;
  return <button className={classNames} {...props} />;
};

export default Button;