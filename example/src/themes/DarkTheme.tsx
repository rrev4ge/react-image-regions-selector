import React from 'react';
import './assets/css/darkTheme.css'
import 'antd/dist/antd.dark.css';

const DarkTheme = ({ children }: { children? }): React.ReactElement => <>{children}</>;

// const DarkTheme = () => {
//   useApplyStyles(styles);
//   return null;
// };

export default DarkTheme;
