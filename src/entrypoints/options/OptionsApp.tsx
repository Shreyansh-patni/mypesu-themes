import React, { useEffect, useState } from 'react';
import { getPreferences, resetPreferences } from '../../core/preferences/storage';
import { DEFAULT_PREFERENCES, type UserPreferences } from '../../core/types/preferences';

export const OptionsApp: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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
  }, []);

  const handleReset = async () => {
    const defaults = await resetPreferences();
    setPreferences(defaults);
    setStatusMessage('Preferences reset to defaults.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div
      style={{
        maxWidth: '680px',
        margin: '40px auto',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#171717',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
      }}
    >
      <header style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '20px', fontWeight: 600 }}>MyPESU Themes — Settings</h1>
        <p style={{ margin: 0, color: '#737373' }}>
          Theme Studio Foundation Shell (Slice 0). Full interactive customization controls will be delivered in subsequent slices.
        </p>
      </header>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>Stored Preferences</h2>
        {loading ? (
          <p style={{ color: '#737373' }}>Loading preferences...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 0', color: '#737373', width: '40%' }}>Theme Pack</td>
                <td style={{ padding: '8px 0', fontWeight: 500 }}>{preferences.themeId}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 0', color: '#737373' }}>Appearance Mode</td>
                <td style={{ padding: '8px 0', fontWeight: 500 }}>{preferences.appearanceMode}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 0', color: '#737373' }}>Display Density</td>
                <td style={{ padding: '8px 0', fontWeight: 500 }}>{preferences.density}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F5F5F5' }}>
                <td style={{ padding: '8px 0', color: '#737373' }}>Font Scaling</td>
                <td style={{ padding: '8px 0', fontWeight: 500 }}>{preferences.fontScale}%</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', color: '#737373' }}>Schema Version</td>
                <td style={{ padding: '8px 0', fontWeight: 500 }}>{preferences.schemaVersion}</td>
              </tr>
            </tbody>
          </table>
        )}

        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: '#FAFAFA',
            border: '1px solid #D4D4D4',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Reset to Factory Defaults
        </button>

        {statusMessage && (
          <p style={{ marginTop: '12px', color: '#262626', fontSize: '13px' }}>{statusMessage}</p>
        )}
      </section>

      <footer style={{ borderTop: '1px solid #E5E5E5', paddingTop: '16px', fontSize: '12px', color: '#737373' }}>
        <p style={{ margin: 0 }}>
          MyPESU Themes is an independent extension. Presentation only. Never modifies academic records, attendance, or submissions.
        </p>
      </footer>
    </div>
  );
};
