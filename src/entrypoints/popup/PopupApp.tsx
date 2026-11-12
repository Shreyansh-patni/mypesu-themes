import React, { useEffect, useState } from 'react';
import { getPreferences } from '../../core/preferences/storage';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../../core/types/preferences';
import { useExtensionUiTheme } from '../../hooks/useExtensionUiTheme';

export const PopupApp: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const { appearance, resolvedTheme } = useExtensionUiTheme();

  useEffect(() => {
    let mounted = true;
    getPreferences().then((prefs) => {
      if (mounted) {
        setPreferences(prefs);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [appearance]);

  return (
    <main className="w-80 p-4 bg-[var(--card)] text-[var(--card-foreground)] font-sans text-sm leading-normal transition-colors duration-200">
      <header className="border-b border-[var(--border)] pb-3 mb-3">
        <h1 className="text-base font-semibold tracking-tight m-0">MyPESU Themes</h1>
        <p className="text-xs text-[var(--muted-foreground)] m-0 mt-0.5">Your Academy. Your Style.</p>
      </header>

      <section className="mb-4">
        <div className="p-2.5 bg-[var(--muted)]/60 rounded-md text-xs mb-3 border border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[var(--foreground)]">Extension UI:</span>
            <span className="font-medium capitalize text-[var(--muted-foreground)]">
              {appearance} ({resolvedTheme})
            </span>
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-[var(--muted-foreground)]">Loading preferences...</p>
        ) : (
          <dl className="grid grid-cols-2 gap-y-1.5 text-xs m-0">
            <dt className="text-[var(--muted-foreground)]">UI Appearance:</dt>
            <dd className="font-medium m-0 capitalize">{preferences.extensionUiAppearance}</dd>
            <dt className="text-[var(--muted-foreground)]">Portal Theme:</dt>
            <dd className="font-medium m-0 capitalize">{preferences.themeId}</dd>
            <dt className="text-[var(--muted-foreground)]">Portal Mode:</dt>
            <dd className="font-medium m-0 capitalize">{preferences.appearanceMode}</dd>
            <dt className="text-[var(--muted-foreground)]">Display Density:</dt>
            <dd className="font-medium m-0 capitalize">{preferences.density}</dd>
            <dt className="text-[var(--muted-foreground)]">Font Scale:</dt>
            <dd className="font-medium m-0">{preferences.fontScale}%</dd>
          </dl>
        )}
      </section>

      <footer className="border-t border-[var(--border)] pt-2 text-[11px] text-[var(--muted-foreground)] flex items-center justify-between">
        <span>Target: PESU Academy</span>
        <span className="font-medium">Stage 5.1 UI Shell</span>
      </footer>
    </main>
  );
};
