import { cn } from '@/lib/utils';
import React, { ReactNode, forwardRef } from 'react';

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        className={cn(
          'text-muted-foreground hover:text-primary transition',
          className,
        )}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

CustomButton.displayName = 'CustomButton';
