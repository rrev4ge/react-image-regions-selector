import React from 'react';
import { BackTop, Layout } from 'antd';
import FooterLayout from './FooterLayout';

const ContentLayout = ({
  collapsedActions,
  children,
  ...rest
}): React.ReactElement => {
  const { margin } = collapsedActions;

  return (
    <Layout
      style={{
        minHeight: '93vh',
        display: 'flex',
        padding: '10px 24px',
      }}
    >
      <Layout.Content style={{ flexGrow: 1 }}>
        <BackTop visibilityHeight={2} />
        {children}
      </Layout.Content>
      <FooterLayout />
    </Layout>
  );
};

export default ContentLayout;
