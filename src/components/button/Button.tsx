import { FC } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary';
  'aria-label'?: string;
}
const Button: FC<ButtonProps> = ({
  size = 'medium',
  variation = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  const classNames = `button ${size} ${variation} ${disabled? 'disabled': ''}`;
  return (
    <button
      className={classNames}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    />
  );
};

export default Button;
