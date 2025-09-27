import { ReactNode } from "react";
import styles from './Button.module.scss'
interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${className}`}
    >
      {children}
    </button>
  );
};
