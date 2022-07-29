import { Theme } from './_interfaces';

export const themes: Theme[] = [
  {
    id: 'light',
    displayName: 'Light',
    filename: 'antd-light.less',
    component: 'LightTheme',
  },
  {
    id: 'dark',
    displayName: 'Dark',
    filename: 'antd-dark.less',
    component: 'DarkTheme',
  },
];
