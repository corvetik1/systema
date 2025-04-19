import React, { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-opacity-90 focus:ring-2 focus:ring-primary/50',
  secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-2 focus:ring-secondary/50',
  danger: 'bg-danger text-white hover:bg-opacity-90 focus:ring-2 focus:ring-danger/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}) => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...rest}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
