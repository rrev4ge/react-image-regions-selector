// const env = process.env.APP_ENV || 'development';

export interface IConstants {
  APP_TITLE: string;
  APP_LOCAL_STORAGE_THEME_MODE_POINT: string;
}

const CONSTANTS: IConstants = {
  APP_TITLE: process.env.REACT_APP_TITLE || 'React App',
  APP_LOCAL_STORAGE_THEME_MODE_POINT: 'app-theme-mode',
};

export default CONSTANTS;
