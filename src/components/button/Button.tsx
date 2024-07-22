import { FC } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary';
  'aria-label'?: string;
}
/**
 * Button - Reusable component for Button
 * @param size - size of the button
 * @param variation - variation (type) of the button
 * @param disabled - prop to disable the button and make it non-clickable
 * @param props - custom props to customize the button
 * @returns
 */
const Button: FC<ButtonProps> = ({
  size = 'medium',
  variation = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  const classNames = `button ${size} ${variation} ${disabled ? 'disabled' : ''}`;
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
