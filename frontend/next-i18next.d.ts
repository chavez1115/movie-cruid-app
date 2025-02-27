import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    en: typeof import('./public/locales/en/common.json');
    es: typeof import('./public/locales/es/common.json');
  }
}
