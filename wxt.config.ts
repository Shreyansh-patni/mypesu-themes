import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  manifest: ({ browser }) => {
    const isFirefox = browser === 'firefox';
    return {
      name: 'MyPESU Themes',
      description: 'Your Academy. Your Style. Independent browser extension for customizing PESU Academy visual appearance.',
      version: '0.1.0',
      permissions: ['storage'],
      browser_specific_settings: isFirefox
        ? {
            gecko: {
              data_collection_permissions: {
                required: ['none'],
              },
            },
          }
        : undefined,
    };
  },
});

