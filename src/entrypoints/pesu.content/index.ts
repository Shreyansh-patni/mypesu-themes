import { defineContentScript } from 'wxt/utils/define-content-script';
import { browser } from 'wxt/browser';
import { getPreferences, PREFERENCES_STORAGE_KEY } from '../../core/preferences/storage';
import { applyActiveAdapters, unmountAllAdapters } from '../../core/page-adapters/registry';
import type { UserPreferences } from '../../core/types/preferences';

export default defineContentScript({
  matches: ['https://www.pesuacademy.com/*'],
  runAt: 'document_start',
  async main() {
    let currentPreferences: UserPreferences | null = null;

    const runAdapterCycle = () => {
      if (!currentPreferences || typeof document === 'undefined') return;
      applyActiveAdapters(document, currentPreferences);
    };

    // 1. Initial preference hydration
    try {
      currentPreferences = await getPreferences();
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAdapterCycle, { once: true });
      } else {
        runAdapterCycle();
      }
    } catch (err) {
      console.warn('[MyPESU Themes] Preference hydration failed. Remaining unstyled.', err);
      if (typeof document !== 'undefined') {
        unmountAllAdapters(document);
      }
      return;
    }

    // 2. Reactive listener for preference updates from Popup / Theme Studio
    if (typeof browser !== 'undefined' && browser.storage?.onChanged) {
      browser.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local' && changes[PREFERENCES_STORAGE_KEY]) {
          const updated = changes[PREFERENCES_STORAGE_KEY].newValue;
          if (updated) {
            currentPreferences = updated;
            runAdapterCycle();
          }
        }
      });
    }

    // 3. Reactive listener for system color scheme changes (when appearanceMode === 'system')
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (currentPreferences?.appearanceMode === 'system') {
          runAdapterCycle();
        }
      });
    }
  },
});
