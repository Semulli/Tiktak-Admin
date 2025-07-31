import React from "react";
import styles from "./button.module.css";
interface ButtonProps {
  title: string;
  variant: string;
  click?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  title,
  variant,
  click,
  type = "button",
  disabled
}) => {
  return (
    <button onClick={click} className={styles[variant]} type={type} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
