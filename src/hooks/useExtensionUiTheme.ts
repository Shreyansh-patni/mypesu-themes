import { useEffect, useState, useCallback } from 'react';
import { browser } from 'wxt/browser';
import { getPreferences, savePreferences, PREFERENCES_STORAGE_KEY } from '../core/preferences/storage';
import { ExtensionUiAppearance, DEFAULT_PREFERENCES } from '../core/types/preferences';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function useExtensionUiTheme() {
  const [appearance, setAppearanceState] = useState<ExtensionUiAppearance>(DEFAULT_PREFERENCES.extensionUiAppearance);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);

  // Apply effective theme to document root
  const applyThemeToDom = useCallback((effective: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (effective === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Compute effective theme from appearance setting
  const computeEffective = useCallback((mode: ExtensionUiAppearance): 'light' | 'dark' => {
    if (mode === 'dark') return 'dark';
    if (mode === 'light') return 'light';
    return getSystemTheme();
  }, []);

  // Update both state and DOM
  const updateAppearance = useCallback((mode: ExtensionUiAppearance) => {
    setAppearanceState(mode);
    const effective = computeEffective(mode);
    setResolvedTheme(effective);
    applyThemeToDom(effective);
  }, [computeEffective, applyThemeToDom]);

  // Load initial preferences
  useEffect(() => {
    let mounted = true;
    getPreferences().then((prefs) => {
      if (!mounted) return;
      updateAppearance(prefs.extensionUiAppearance);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [updateAppearance]);

  // Listen for storage changes across Popup and Options
  useEffect(() => {
    if (typeof browser === 'undefined' || !browser.storage?.onChanged) return;

    const storageListener = (changes: Record<string, any>, areaName: string) => {
      if (areaName === 'local' && changes[PREFERENCES_STORAGE_KEY]) {
        const newPrefs = changes[PREFERENCES_STORAGE_KEY].newValue;
        if (newPrefs?.extensionUiAppearance) {
          updateAppearance(newPrefs.extensionUiAppearance);
        }
      }
    };

    browser.storage.onChanged.addListener(storageListener);
    return () => {
      browser.storage.onChanged.removeListener(storageListener);
    };
  }, [updateAppearance]);

  // Listen for system theme media query changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      if (appearance === 'system') {
        const effective = getSystemTheme();
        setResolvedTheme(effective);
        applyThemeToDom(effective);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [appearance, applyThemeToDom]);

  // Persist updated appearance setting
  const setAppearance = useCallback(async (newAppearance: ExtensionUiAppearance) => {
    updateAppearance(newAppearance);
    const current = await getPreferences();
    await savePreferences({
      ...current,
      extensionUiAppearance: newAppearance,
    });
  }, [updateAppearance]);

  return {
    appearance,
    resolvedTheme,
    loading,
    setAppearance,
  };
}
