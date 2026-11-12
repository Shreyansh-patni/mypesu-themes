import React, { useEffect, useState } from 'react';
import { getPreferences, resetPreferences } from '../../core/preferences/storage';
import { UserPreferences, DEFAULT_PREFERENCES, ExtensionUiAppearance } from '../../core/types/preferences';
import { useExtensionUiTheme } from '../../hooks/useExtensionUiTheme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export const OptionsApp: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { appearance, resolvedTheme, setAppearance } = useExtensionUiTheme();

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

  const handleReset = async () => {
    const defaults = await resetPreferences();
    setPreferences(defaults);
    await setAppearance(defaults.extensionUiAppearance);
    setStatusMessage('Preferences reset to defaults.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleAppearanceChange = async (val: string) => {
    await setAppearance(val as ExtensionUiAppearance);
    const updated = await getPreferences();
    setPreferences(updated);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-[var(--card)] text-[var(--card-foreground)] rounded-lg border border-[var(--border)] shadow-sm transition-colors duration-200">
      <header className="border-b border-[var(--border)] pb-4 mb-6">
        <h1 className="text-xl font-semibold tracking-tight">MyPESU Themes — Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Extension UI Foundation (Stage 5.1 Addendum) with shadcn/ui & Tailwind CSS.
        </p>
      </header>

      {/* Extension UI Appearance Setting (Independent from portal theme) */}
      <section className="mb-6 p-4 rounded-md bg-[var(--muted)]/50 border border-[var(--border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold">Extension UI Appearance</h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
              Controls the Popup and Options color mode. Independent from portal theme settings.
            </p>
          </div>
          <div className="w-40">
            <Select value={appearance} onValueChange={handleAppearanceChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select appearance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System (Auto)</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-2 text-xs text-[var(--muted-foreground)]">
          Current effective UI mode: <span className="font-medium text-[var(--foreground)] capitalize">{resolvedTheme}</span>
        </div>
      </section>

      {/* Stored Preferences Summary */}
      <section className="mb-6">
        <h2 className="text-base font-semibold mb-3">Stored Configuration Baseline</h2>
        {loading ? (
          <p className="text-sm text-[var(--muted-foreground)]">Loading preferences...</p>
        ) : (
          <table className="w-full text-sm border-collapse mb-4">
            <tbody>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2 text-[var(--muted-foreground)] w-2/5">Extension UI Appearance</td>
                <td className="py-2 font-medium capitalize">{preferences.extensionUiAppearance}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2 text-[var(--muted-foreground)]">PESU Portal Theme</td>
                <td className="py-2 font-medium capitalize">{preferences.themeId}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2 text-[var(--muted-foreground)]">PESU Portal Mode</td>
                <td className="py-2 font-medium capitalize">{preferences.appearanceMode}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2 text-[var(--muted-foreground)]">Display Density</td>
                <td className="py-2 font-medium capitalize">{preferences.density}</td>
              </tr>
              <tr className="border-b border-[var(--border)]">
                <td className="py-2 text-[var(--muted-foreground)]">Font Scaling</td>
                <td className="py-2 font-medium">{preferences.fontScale}%</td>
              </tr>
              <tr>
                <td className="py-2 text-[var(--muted-foreground)]">Schema Version</td>
                <td className="py-2 font-medium">{preferences.schemaVersion}</td>
              </tr>
            </tbody>
          </table>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80 border border-[var(--border)] rounded-md text-xs font-medium cursor-pointer transition-colors"
        >
          Reset to Factory Defaults
        </button>

        {statusMessage && (
          <p className="mt-3 text-xs text-[var(--foreground)]">{statusMessage}</p>
        )}
      </section>

      <footer className="border-t border-[var(--border)] pt-4 text-xs text-[var(--muted-foreground)]">
        <p className="m-0">
          MyPESU Themes is an independent extension. Presentation only. Never touches official academic records or credentials.
        </p>
      </footer>
    </div>
  );
};
