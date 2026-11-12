import * as React from 'react';
import type { ThemeDefinition, SemanticColorTokens } from '../../core/types/theme';
import { cn } from '../../lib/utils';

export interface ThemePreviewSwatchesProps {
  theme: ThemeDefinition;
  compact?: boolean;
}

interface SwatchBlockProps {
  label: string;
  colors: SemanticColorTokens;
  isDark?: boolean;
  compact?: boolean;
}

function SwatchBlock({ label, colors, isDark = false, compact = false }: SwatchBlockProps) {
  const swatches = [
    { name: 'Canvas', value: colors.canvas },
    { name: 'Surface', value: colors.surface },
    { name: 'Border', value: colors.border },
    { name: 'Text', value: colors.text },
    { name: 'Accent', value: colors.accent },
    { name: 'Focus', value: colors.focus },
  ];

  return (
    <div className={cn('flex flex-col gap-1', compact ? 'gap-0.5' : 'gap-1')}>
      <div className="flex items-center justify-between text-[10px] text-[var(--muted-foreground)]">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-[9px]">{colors.accent}</span>
      </div>
      <div
        className={cn(
          'flex items-center overflow-hidden rounded border border-[var(--border)] shadow-xs',
          compact ? 'h-5' : 'h-7'
        )}
      >
        {swatches.map((s) => (
          <div
            key={s.name}
            className="flex-1 h-full relative group transition-transform"
            style={{ backgroundColor: s.value }}
            title={`${label} ${s.name}: ${s.value}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ThemePreviewSwatches({ theme, compact = false }: ThemePreviewSwatchesProps) {
  return (
    <div className={cn('grid gap-2', compact ? 'grid-cols-2 gap-1.5' : 'grid-cols-1 sm:grid-cols-2')}>
      <SwatchBlock
        label="Light Mode"
        colors={theme.modes.light.colors}
        compact={compact}
      />
      <SwatchBlock
        label="Dark Mode"
        colors={theme.modes.dark.colors}
        isDark
        compact={compact}
      />
    </div>
  );
}

