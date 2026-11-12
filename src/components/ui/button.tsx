import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]',
          'disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' &&
            'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 shadow-xs',
          variant === 'secondary' &&
            'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80',
          variant === 'outline' &&
            'border border-[var(--border)] bg-transparent hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
          variant === 'ghost' &&
            'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
          variant === 'destructive' &&
            'bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90 shadow-xs',
          size === 'default' && 'h-8 px-3 py-1.5',
          size === 'sm' && 'h-7 px-2.5 text-[11px] rounded',
          size === 'lg' && 'h-9 px-4 text-sm',
          size === 'icon' && 'h-8 w-8 p-0',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

