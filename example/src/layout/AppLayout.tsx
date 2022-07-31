import React from 'react';
import { Layout } from 'antd';
import HeaderLayout from './HeaderLayout';
import ContentLayout from './ContentLayout';
import SiderLayout from './SiderLayout';
import { useCollapsed } from '../hooks';

const AppLayout = ({ children, ...rest }) => {
  const collapsedActions = useCollapsed();

  return (
    <Layout>
      <HeaderLayout />
      <Layout>
         {/*<SiderLayout collapsedActions={collapsedActions} /> */}
        <ContentLayout collapsedActions={collapsedActions}>
          {children}
        </ContentLayout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
