import React, { lazy, Suspense } from 'react';
import { useTheme } from './hooks';
import { themes } from './models/Themes';

const ThemeProvider = ({ children }) => {
  const [theme] = useTheme();

  const Theme = lazy(() => import(`./${themes.find((t) => t.id === theme)?.component || 'LightTheme'}`));

  return (
    <Suspense fallback={<span />}>
      <Theme>{children}</Theme>
    </Suspense>
  );
};

export default ThemeProvider;
