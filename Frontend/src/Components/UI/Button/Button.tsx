import React from "react";
import "./Button.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean; // kept for compatibility
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = "", type = "button", asChild, ...props }, ref) => {
    return (
      <button ref={ref} type={type} className={`dh-button ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
