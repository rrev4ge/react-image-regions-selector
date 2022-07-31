import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const FooterLayout = (): React.ReactElement => {
  const now = new Date();
  return (
    <Layout.Footer style={{ height: '25px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'end',
        }}
      >
        <div>Copyright © {now.getFullYear()} rrev4ge</div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    </Layout.Footer>
  );
};

export default FooterLayout;
