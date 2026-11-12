import { useEffect, useState, useCallback, useRef } from 'react';
import { browser } from 'wxt/browser';
import {
  getPreferences,
  savePreferences,
  resetPreferences as storageResetPreferences,
  PREFERENCES_STORAGE_KEY,
} from '../core/preferences/storage';
import {
  DEFAULT_PREFERENCES,
  type UserPreferences,
  type ThemeId,
  type AppearanceMode,
  type ExtensionUiAppearance,
  type DensityMode,
  type FontScale,
} from '../core/types/preferences';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyExtensionThemeToDom(effective: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (effective === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function usePreferences() {
  const [preferences, setPreferencesState] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [resolvedUiTheme, setResolvedUiTheme] = useState<'light' | 'dark'>(() => getSystemTheme());

  const saveStatusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Compute and apply the effective UI theme from extensionUiAppearance setting
  const syncUiThemeToDom = useCallback((mode: ExtensionUiAppearance) => {
    const effective = mode === 'dark' ? 'dark' : mode === 'light' ? 'light' : getSystemTheme();
    setResolvedUiTheme(effective);
    applyExtensionThemeToDom(effective);
  }, []);

  // Flash a brief "saved" status indicator
  const triggerSaveNotification = useCallback(() => {
    if (saveStatusTimeoutRef.current) {
      clearTimeout(saveStatusTimeoutRef.current);
    }
    setSaveStatus('saved');
    saveStatusTimeoutRef.current = setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);
  }, []);

  // Initial load
  useEffect(() => {
    let mounted = true;
    getPreferences()
      .then((prefs) => {
        if (!mounted) return;
        let effectivePrefs = prefs;
        if (typeof window !== 'undefined') {
          const urlUi = new URLSearchParams(window.location.search).get('ui');
          if (urlUi === 'dark' || urlUi === 'light' || urlUi === 'system') {
            effectivePrefs = { ...prefs, extensionUiAppearance: urlUi };
          }
          const urlTheme = new URLSearchParams(window.location.search).get('theme');
          if (urlTheme === 'monochrome' || urlTheme === 'apple-inspired') {
            effectivePrefs = { ...effectivePrefs, themeId: urlTheme };
          }
        }
        setPreferencesState(effectivePrefs);
        syncUiThemeToDom(effectivePrefs.extensionUiAppearance);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load preferences');
        setPreferencesState(DEFAULT_PREFERENCES);
        syncUiThemeToDom(DEFAULT_PREFERENCES.extensionUiAppearance);
        setLoading(false);
      });

    return () => {
      mounted = false;
      if (saveStatusTimeoutRef.current) {
        clearTimeout(saveStatusTimeoutRef.current);
      }
    };
  }, [syncUiThemeToDom]);

  // Reactive cross-context synchronization via browser.storage.onChanged
  useEffect(() => {
    if (typeof browser === 'undefined' || !browser.storage?.onChanged) return;

    const storageListener = (changes: Record<string, any>, areaName: string) => {
      if (areaName === 'local' && changes[PREFERENCES_STORAGE_KEY]) {
        const newPrefs = changes[PREFERENCES_STORAGE_KEY].newValue;
        if (newPrefs) {
          setPreferencesState((prev) => {
            // Only update if changed
            if (JSON.stringify(prev) !== JSON.stringify(newPrefs)) {
              if (newPrefs.extensionUiAppearance) {
                syncUiThemeToDom(newPrefs.extensionUiAppearance);
              }
              return newPrefs;
            }
            return prev;
          });
        }
      }
    };

    browser.storage.onChanged.addListener(storageListener);
    return () => {
      browser.storage.onChanged.removeListener(storageListener);
    };
  }, [syncUiThemeToDom]);

  // Listen to OS system color scheme changes (affects extension UI only when extensionUiAppearance === 'system')
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      if (preferences.extensionUiAppearance === 'system') {
        const effective = getSystemTheme();
        setResolvedUiTheme(effective);
        applyExtensionThemeToDom(effective);
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [preferences.extensionUiAppearance]);

  // Persist helper with optimistic state update
  const persist = useCallback(
    async (updater: (prev: UserPreferences) => UserPreferences): Promise<boolean> => {
      setError(null);
      setSaveStatus('saving');

      const next = updater(preferences);
      setPreferencesState(next);

      // If extension UI appearance changed, sync DOM immediately
      if (next.extensionUiAppearance !== preferences.extensionUiAppearance) {
        syncUiThemeToDom(next.extensionUiAppearance);
      }

      const success = await savePreferences(next);
      if (success) {
        triggerSaveNotification();
        return true;
      } else {
        setError('Failed to persist preferences to local storage.');
        setSaveStatus('error');
        // Revert to current storage state on failure
        const current = await getPreferences();
        setPreferencesState(current);
        syncUiThemeToDom(current.extensionUiAppearance);
        return false;
      }
    },
    [preferences, syncUiThemeToDom, triggerSaveNotification]
  );

  // Dedicated mutation handlers
  const selectTheme = useCallback(
    (themeId: ThemeId) => {
      return persist((prev) => ({
        ...prev,
        themeId,
      }));
    },
    [persist]
  );

  const setPortalAppearance = useCallback(
    (mode: AppearanceMode) => {
      return persist((prev) => ({
        ...prev,
        appearanceMode: mode,
        // Crucial invariant: Never alters extensionUiAppearance
      }));
    },
    [persist]
  );

  const setExtensionUiAppearance = useCallback(
    (appearance: ExtensionUiAppearance) => {
      return persist((prev) => ({
        ...prev,
        extensionUiAppearance: appearance,
        // Crucial invariant: Never alters portal appearanceMode
      }));
    },
    [persist]
  );

  const setDensity = useCallback(
    (density: DensityMode) => {
      return persist((prev) => ({
        ...prev,
        density,
      }));
    },
    [persist]
  );

  const setFontScale = useCallback(
    (fontScale: FontScale) => {
      return persist((prev) => ({
        ...prev,
        fontScale,
      }));
    },
    [persist]
  );

  const resetAllPreferences = useCallback(async (): Promise<boolean> => {
    setError(null);
    setSaveStatus('saving');
    try {
      const defaults = await storageResetPreferences();
      setPreferencesState(defaults);
      syncUiThemeToDom(defaults.extensionUiAppearance);
      triggerSaveNotification();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset preferences');
      setSaveStatus('error');
      return false;
    }
  }, [syncUiThemeToDom, triggerSaveNotification]);

  return {
    preferences,
    loading,
    error,
    saveStatus,
    resolvedUiTheme,
    selectTheme,
    setPortalAppearance,
    setExtensionUiAppearance,
    setDensity,
    setFontScale,
    resetAllPreferences,
  };
}
