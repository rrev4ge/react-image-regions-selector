import React, { useEffect, useState } from 'react';
import CONSTANTS from '../../CONSTANTS';
import { themes } from '../models/Themes';

const getTheme = (): string =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  JSON.parse(<string>localStorage.getItem(CONSTANTS.APP_LOCAL_STORAGE_THEME_MODE_POINT)) || themes[0].id;

const useTheme = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    const initialValue = getTheme();
    if (initialValue !== theme) {
      localStorage.setItem(
        CONSTANTS.APP_LOCAL_STORAGE_THEME_MODE_POINT,
        JSON.stringify(theme),
      );
      window.location.reload();
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
