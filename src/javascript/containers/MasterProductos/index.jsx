import React from 'react';
import { Tabs } from 'antd';
// ---Components
import AuthValidate from 'Comp/Master/AuthValidate';
// Container
import ManageProducts from './ManageProducts';
import ProductsChecker from './ProductsChecker';

const { TabPane } = Tabs;

const MasterProductos = () => {
  function onChangeTab(e) {
    console.log('onChangeTab', e);
  }
  return (
    <AuthValidate>
      <Tabs
        style={{ width: '96%', margin: '15px auto 30px auto' }}
        defaultActiveKey="2"
        onChange={onChangeTab}
      >
        <TabPane tab="Admin" key="1">
          <ManageProducts />
        </TabPane>
        <TabPane tab="Updater" key="2">
          <ProductsChecker />
        </TabPane>
        <TabPane tab="Masive loader" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </AuthValidate>
  );
};

export default MasterProductos;
