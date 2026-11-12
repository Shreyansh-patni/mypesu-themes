import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['https://www.pesuacademy.com/*'],
  runAt: 'document_start',
  main() {
    /**
     * Slice 0: Foundation Entrypoint.
     * STRICTLY INERT:
     * - Zero portal DOM manipulation
     * - Zero CSS injection
     * - Zero selector matching
     * - Zero MutationObserver
     * - Zero academic data reading or scraping
     * - Zero authentication / session credential access
     * - Zero network calls
     */
    if (process.env.NODE_ENV === 'development') {
      console.info(
        '[MyPESU Themes] Foundation content script initialized on PESU Academy (inert Slice 0).'
      );
    }
  },
});
