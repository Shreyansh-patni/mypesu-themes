import React, { useEffect, useState } from 'react';
import { getPreferences } from '../../core/preferences/storage';
import { UserPreferences, DEFAULT_PREFERENCES } from '../../core/types/preferences';

export const PopupApp: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

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

  return (
    <main
      style={{
        width: '320px',
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#171717',
        backgroundColor: '#FFFFFF',
      }}
    >
      <header style={{ borderBottom: '1px solid #E5E5E5', paddingBottom: '12px', marginBottom: '12px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>MyPESU Themes</h1>
        <p style={{ margin: 0, fontSize: '12px', color: '#737373' }}>Your Academy. Your Style.</p>
      </header>

      <section style={{ marginBottom: '16px' }}>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: '#F5F5F5',
            borderRadius: '4px',
            fontSize: '12px',
            marginBottom: '12px',
          }}
        >
          <strong>Status:</strong> Foundation Shell (Slice 0 Active)
        </div>

        {loading ? (
          <p style={{ color: '#737373' }}>Loading preferences...</p>
        ) : (
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '6px' }}>
            <dt style={{ color: '#737373' }}>Active Theme:</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{preferences.themeId}</dd>
            <dt style={{ color: '#737373' }}>Mode:</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{preferences.appearanceMode}</dd>
            <dt style={{ color: '#737373' }}>Density:</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{preferences.density}</dd>
            <dt style={{ color: '#737373' }}>Font Scale:</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{preferences.fontScale}%</dd>
          </dl>
        )}
      </section>

      <footer style={{ borderTop: '1px solid #E5E5E5', paddingTop: '8px', fontSize: '11px', color: '#737373' }}>
        <span>Target: PESU Academy Portal</span>
      </footer>
    </main>
  );
};
