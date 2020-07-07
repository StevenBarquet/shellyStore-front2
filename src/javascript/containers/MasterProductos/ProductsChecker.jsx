// ---Dependencys
import React, { useReducer, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ---Components
import ButtonMenu from 'Comp/Master/MasterProductos/ProductsChecker/ButtonMenu';
import UpdaterLoader from 'Comp/Master/MasterProductos/ProductsChecker/UpdaterLoader';
// ---Special
import superMLhandler from 'Comp/Master/MasterProductos/superMLhandler';
// Comons
import LoadingScreen from 'CommonComps/LoadingScreen';
import InvisibleButton from 'CommonComps/InvisibleButton';
// ---Others
import {
  insertLaptop,
  insertMLproduct,
  getALLLaptops,
  getLaptop,
  deleteLaptop,
  updateLaptop,
  updateMLproduct
} from 'Others/peticiones';

const { confirm } = Modal;

const typesR = {
  SET_OBJECT: 'SET_OBJECT',
  CLOSE_FORM: 'CLOSE_FORM',
  IS_GETTING_PROD: 'IS_GETTING_PROD',
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS'
};

function reducerManageProducts(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.SET_OBJECT:
      return { ...state, ...payload };

    case typesR.IS_GETTING_PROD:
      return { ...state, getingProducts: true };

    case typesR.GET_ALL_PRODUCTS:
      return { ...state, currentList: payload, getingProducts: false };

    case typesR.CLOSE_FORM:
      return {
        ...state,
        window: 'none',
        isEdit: false,
        form: {
          images: {
            extra: ['', '', '']
          }
        }
      };

    default:
      return state;
  }
}

// ------------------------------------------ COMPONENT-----------------------------------------
const ProductsChecker = () => {
  const [state, dispatch] = useReducer(reducerManageProducts, {
    window: 'none',
    currentList: [],
    updateList: [],
    isEdit: false,
    getingProducts: false,
    anlyzedElement: 0
  });


  function doAnalize (flagValue) {
    console.log('No entra flagValue', flagValue);
    dispatch({
      type: typesR.SET_OBJECT,
      payload: { startAnalyze: flagValue }
    });
  }

  function analyze() {
    const {currentList}= state
    const {length} = currentList
    for (let i = 0; i < length; i++) {
      const item = currentList[i];
      printCurrentAn(i);
      if(item.idMercadoLibre){
        setTimeout(()=> console.log('Search diferences at index; ', i), 800);
      } else {
        setTimeout(()=> console.log('No compatible at index; ', i), 300);
      }
    }
  }

  function printCurrentAn(index) {
    console.log('anlyzedElement : ', index+1);
    dispatch({
      type: typesR.SET_OBJECT,
      payload: { anlyzedElement: index+1 }
    });
  }

  function getAll() {
    dispatch({ type: typesR.IS_GETTING_PROD });
    getALLLaptops().then(response => {
      dispatch({
        type: typesR.GET_ALL_PRODUCTS,
        payload: response.data
      });
    });
  }

  return (
    <div className="master-product-container">
      <ButtonMenu getAll={getAll} />
      <UpdaterLoader
        currentList={state.currentList}
        getingProducts={state.getingProducts}
        startAnalyze={state.startAnalyze}
        analyze={analyze}
        anlyzedElement={state.anlyzedElement}
      />
    </div>
  );
};

export default ProductsChecker;
