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
    let spaObserver: MutationObserver | null = null;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const runAdapterCycle = () => {
      if (!currentPreferences || typeof document === 'undefined') return;
      applyActiveAdapters(document, currentPreferences);
    };

    const debouncedAdapterCycle = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        runAdapterCycle();
      }, 50);
    };

    /**
     * Initializes a narrowly-scoped MutationObserver on the SPA content root (#StudentProfilePESUContent)
     * or document body to detect AJAX/SPA view transitions between Dashboard, Courses, etc.
     * Observes strictly structural childList mutations without inspecting or processing academic text.
     */
    const setupSpaObserver = () => {
      if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
      if (spaObserver) {
        spaObserver.disconnect();
        spaObserver = null;
      }

      const targetRoot =
        document.getElementById('StudentProfilePESUContent') ||
        document.querySelector('.content-right-wrapper') ||
        document.body;

      if (!targetRoot) return;

      spaObserver = new MutationObserver((mutations) => {
        // Check if any structural child list changes occurred
        let hasStructuralChange = false;
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
            hasStructuralChange = true;
            break;
          }
        }
        if (hasStructuralChange) {
          debouncedAdapterCycle();
        }
      });

      spaObserver.observe(targetRoot, {
        childList: true,
        subtree: true,
      });
    };

    // 1. Initial preference hydration & DOM lifecycle setup
    try {
      currentPreferences = await getPreferences();
      if (document.readyState === 'loading') {
        document.addEventListener(
          'DOMContentLoaded',
          () => {
            runAdapterCycle();
            setupSpaObserver();
          },
          { once: true }
        );
      } else {
        runAdapterCycle();
        setupSpaObserver();
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
          getPreferences()
            .then((prefs) => {
              currentPreferences = prefs;
              runAdapterCycle();
            })
            .catch(() => {
              if (typeof document !== 'undefined') {
                unmountAllAdapters(document);
              }
            });
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
