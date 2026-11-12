import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number; // pixel dimension: 20, 24, 32, 40, etc.
}

export function BrandLogo({ size = 24, className, ...props }: BrandLogoProps) {
  // Use the verified pure black & white icon asset
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 rounded-md bg-[#FFFFFF] border border-[#000000]/15 overflow-hidden shadow-xs select-none',
        className
      )}
      style={{ width: size, height: size }}
      aria-label="MyPESU Themes Logo"
      {...props}
    >
      <img
        src="/icon-48.png"
        alt="MyPESU Themes Compass"
        width={size}
        height={size}
        className="block object-contain"
        style={{
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
}
