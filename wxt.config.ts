import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: ({ browser }) => {
    const isFirefox = browser === 'firefox';
    return {
      name: 'MyPESU Themes',
      description: 'Your Academy. Your Style. Independent browser extension for customizing PESU Academy visual appearance.',
      version: '0.1.0',
      icons: {
        16: 'icon-16.png',
        24: 'icon-24.png',
        32: 'icon-32.png',
        48: 'icon-48.png',
        96: 'icon-96.png',
        128: 'icon-128.png',
      },
      action: {
        default_title: 'MyPESU Themes',
        default_popup: 'popup.html',
        default_icon: {
          16: 'icon-16.png',
          24: 'icon-24.png',
          32: 'icon-32.png',
          48: 'icon-48.png',
        },
      },
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
