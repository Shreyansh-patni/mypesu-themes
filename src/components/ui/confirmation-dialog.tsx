import * as React from 'react';
import { Button } from './button';
import { AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in-0"
    >
      <div
        className={cn(
          'w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-lg animate-in zoom-in-95',
          'focus:outline-none'
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'p-2 rounded-full shrink-0',
              isDestructive
                ? 'bg-[var(--destructive)]/10 text-[var(--destructive)]'
                : 'bg-[var(--muted)] text-[var(--foreground)]'
            )}
          >
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 id="dialog-title" className="text-sm font-semibold text-[var(--foreground)]">
              {title}
            </h3>
            <p id="dialog-description" className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'destructive' : 'default'}
            size="sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

