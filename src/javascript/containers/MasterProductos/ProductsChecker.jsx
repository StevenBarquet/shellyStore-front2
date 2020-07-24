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
  GET_ALL_PRODUCTS: 'GET_ALL_PRODUCTS',
  INCREASE: 'INCREASE',
  FINISH_ANALYZE: 'FINISH_ANALYZE'
};

function reducerManageProducts(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.SET_OBJECT:
      return { ...state, ...payload };

    case typesR.IS_GETTING_PROD:
      return { ...state, getingProducts: true, isLoading: true };

    case typesR.GET_ALL_PRODUCTS:
      return { ...state, currentList: payload, isLoading: false };

    case typesR.INCREASE:
      return { ...state, anlyzedElement: 1 + state.anlyzedElement };

    case typesR.FINISH_ANALYZE:
      return { ...state, getingProducts: false };

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
    isLoading: false,
    anlyzedElement: 0
  });

  useEffect(() => {
    setTimeout(() => doAnalize(), 300);
  });

  function doAnalize() {
    const { getingProducts, anlyzedElement, currentList } = state;
    console.log(
      'doAnalize\ngetingProducts ',
      getingProducts,
      ' anlyzedElement ',
      anlyzedElement,
      'currentList.length',
      currentList.length
    );
    if (getingProducts && anlyzedElement <= currentList.length - 1) {
      analyze();
    } else if (
      getingProducts &&
      anlyzedElement !== 0 &&
      anlyzedElement === currentList.length
    ) {
      dispatch({ type: typesR.FINISH_ANALYZE });
    }
  }

  async function analyze() {
    const { currentList, anlyzedElement } = state;
    const i = anlyzedElement;
    const item = currentList[i];
    if (item.idMercadoLibre) {
      const res = await superMLhandler(item.idMercadoLibre);
      console.log('product', i, ' : ', res);
    } else {
      console.log('No compatible at index; ', i);
    }
    dispatch({ type: typesR.INCREASE });
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
        anlyzedElement={state.anlyzedElement}
      />
    </div>
  );
};

export default ProductsChecker;
