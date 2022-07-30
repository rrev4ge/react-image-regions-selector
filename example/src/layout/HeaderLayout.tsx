import { Layout } from 'antd';
import React from 'react';
import CONSTANTS from '../CONSTANTS';
import { ThemeSwitcher } from '../themes';

const HeaderLayout = (): React.ReactElement => (
  <Layout.Header
    style={{
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '320px',
          margin: '5px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '10px',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            fontFamily: 'monospace',
            fontSize: '18px',
            color: 'white',
            lineHeight: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {CONSTANTS.APP_TITLE}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: 10,
          justifyContent: 'right',
        }}
      >
        <ThemeSwitcher />
      </div>
    </div>
  </Layout.Header>
);

export default HeaderLayout;
