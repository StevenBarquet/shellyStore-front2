// ---Dependencys
import React, { useReducer, useEffect } from 'react';
import {
  LaptopOutlined,
  DeploymentUnitOutlined,
  RocketOutlined,
  SaveFilled,
  CustomerServiceOutlined,
  WifiOutlined,
  CoffeeOutlined,
  AndroidFilled,
  CarFilled,
  DislikeFilled
} from '@ant-design/icons';
import { Tabs } from 'antd';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';
//  ---Components
import MapProduct from 'Comp/Productos/MapProduct';
// ---ComonComponents
import LoadingScreen from 'CommonComps/LoadingScreen';
// ---Requests
import { getAllLaptopsPublic as getAllProducts } from 'Others/peticiones';
// ---Others
import { productos as storeData } from 'Others/store-data.json';

const { TabPane } = Tabs;

const defaultIcon = <DeploymentUnitOutlined />;

const tabIcons = [
  <LaptopOutlined />,
  <AndroidFilled />,
  <RocketOutlined />,
  <SaveFilled />,
  <CustomerServiceOutlined />,
  <WifiOutlined />,
  <CoffeeOutlined />,
  <CarFilled />,
  <DislikeFilled />
];

const titlesJson = storeData.categorias;

const tabTitles = titlesJson.map((title, index) => {
  return (
    <span>
      {tabIcons[index] || defaultIcon}
      {titlesJson[index].label}
    </span>
  );
});

const typesR = {
  SET_DATA: 'SET_DATA',
  SET_LOADING: 'SET_LOADING',
  REFRESH_DATA: 'REFRESH_DATA',
  STOP_LOADING: 'STOP_LOADING'
};

function reducerProductos(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.SET_DATA:
      return { ...state, ...payload };

    case typesR.SET_LOADING:
      return { ...state, loading: true };

    case typesR.STOP_LOADING:
      return { ...state, loading: false };

    case typesR.REFRESH_DATA:
      return { ...state, currentList: payload, loading: false };

    default:
      return state;
  }
}

const Productos = () => {
  const [state, dispatch] = useReducer(reducerProductos, {
    currentList: [],
    loading: true
  });

  useEffect(() => {
    onLoadLaptops(setCategory('1'));
  }, []);

  function setCategory(tabIndex) {
    const index = parseInt(tabIndex) - 1;
    return {
      page: 1,
      size: 30,
      categoria: storeData.categorias[index].label
    };
  }

  function onLoadLaptops(category) {
    dispatch({ type: typesR.SET_LOADING });
    getAllProducts(category)
      .then(data => {
        dispatch({
          type: typesR.REFRESH_DATA,
          payload: data.data
        });
      })
      .catch(err => {
        dispatch({ type: typesR.STOP_LOADING });
        console.log('onLoadLaptops ', err);
      });
  }

  function getTabProducts(key) {
    // console.log('callback tab: ', key);
    onLoadLaptops(setCategory(key));
  }

  function handleProduct() {
    const { currentList, loading } = state;
    if (loading) {
      return <LoadingScreen />;
    }
    if (currentList.length === 0) {
      return <p>No se encontraron productos en esa categoria</p>;
    }
    return <MapProduct currentList={currentList} />;
  }

  // ------------------------------------------ COMPONENT-----------------------------------------
  return (
    <React.Fragment>
      <CustomHelmet pageName="Productos" />
      <div className="products-cont">
        <Tabs defaultActiveKey="1" onChange={getTabProducts}>
          {tabTitles.map((unUsed, index) => (
            <TabPane tab={tabTitles[index]} key={`${index + 1}`}>
              {handleProduct()}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Productos;
