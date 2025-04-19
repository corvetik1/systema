import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'base';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-h1 font-semibold text-neutral700',
  h2: 'text-h2 font-semibold text-neutral700',
  h3: 'text-h3 font-medium text-neutral700',
  base: 'text-base font-normal text-neutral700',
};

const Typography: React.FC<TypographyProps> = ({ variant = 'base', as: Component = 'p', className = '', children, ...rest }) => {
  const classes = `${variantClasses[variant]} ${className}`;
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default Typography;
