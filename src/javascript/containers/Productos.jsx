// ---Dependencys
import React, { useState, useEffect } from 'react';
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
//  ---Components
import MapProduct from 'Comp/Productos/MapProduct';
// ---ComonComponents
import LoadingScreen from 'CommonComps/LoadingScreen';

// Functions
import { getAllLaptopsPublic } from 'Others/peticiones';

const { TabPane } = Tabs;

const mockPagination = {
  page: 1,
  size: 30,
  categoria: 'Laptops'
};

const Productos = () => {
  const [currentList, setCurrentList] = useState([]);
  function onLoadLaptops() {
    getAllLaptopsPublic(mockPagination).then(data => {
      setCurrentList(data.data);
    });
  }

  useEffect(() => {
    onLoadLaptops();
  }, []);
  const callback = key => {
    console.log('callback tab: ', key);
  };
  return (
    <div className="products-cont">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane
          tab={
            <span>
              <DeploymentUnitOutlined />
              Laptops
            </span>
          }
          key="1"
        >
          {currentList && currentList.length > 0 && (
            <MapProduct currentList={currentList} />
          )}
          {!currentList || (currentList.length === 0 && <LoadingScreen />)}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Productos;
