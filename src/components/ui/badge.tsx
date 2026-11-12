import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'active';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors',
        variant === 'default' &&
          'bg-[var(--primary)] text-[var(--primary-foreground)]',
        variant === 'secondary' &&
          'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
        variant === 'outline' &&
          'border border-[var(--border)] text-[var(--foreground)]',
        variant === 'active' &&
          'bg-[var(--foreground)] text-[var(--background)] font-medium',
        className
      )}
      {...props}
    />
  );
}
