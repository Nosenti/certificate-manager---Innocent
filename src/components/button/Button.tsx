import { FC } from 'react';
import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary' | 'contained' | 'transparent';
}
const Button: FC<ButtonProps> = ({ size = "small", variation = "primary", ...props }) => {
  const classNames = `button ${size} ${variation}`;
  return <button className={classNames} {...props} />;
};

export default Button;
