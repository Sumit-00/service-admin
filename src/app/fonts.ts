import localFont from 'next/font/local';

export const weworkSerif = localFont({
  src: '../styles/fonts/wework-serif/wework-serif-regular.woff2',
  variable: '--wework-serif',
  weight: '400',
  fallback: ['system-ui'],
});

export const apercuPro = localFont({
  src: '../styles/fonts/apercu-pro/ApercuPro-Regular.woff2',
  variable: '--apercu-pro',
  weight: '400',
  fallback: ['system-ui'],
});
