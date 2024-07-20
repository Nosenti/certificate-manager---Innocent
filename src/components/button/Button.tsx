import { FC } from "react";
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variation?: 'primary' | 'secondary';
}
const Button: FC<ButtonProps> = ({ size = "small", variation = "sidebar", ...props }) => {
  const classNames = `${styles.button} ${styles[size]} ${styles[variation]}`;
  return <button className={classNames} {...props} />;
};

export default Button;
