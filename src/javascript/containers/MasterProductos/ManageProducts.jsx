// ---Dependencys
import React, { useReducer, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ---Components
import AddProducts from 'Comp/Master/MasterProductos/ManageProducts/AddProducts';
import MasterListProduct from 'Comp/Master/MasterProductos/ManageProducts/MasterListProduct';
import FormOwnProducts from 'Comp/Master/MasterProductos/ManageProducts/FormOwnProducts';
import FormMercadoLibre from 'Comp/Master/MasterProductos/ManageProducts/FormMercadoLibre';
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
  IS_LOADING: 'IS_LOADING'
};

function reducerMaterOrders(state, action) {
  const { type, payload } = action;
  switch (type) {
    case typesR.SET_OBJECT:
      return { ...state, ...payload };

    case typesR.IS_LOADING:
      return { ...state, loading: true };

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
const ManageProducts = () => {
  const [state, dispatch] = useReducer(reducerMaterOrders, {
    window: 'none',
    currentList: [],
    isEdit: false,
    loading: false,
    form: {
      detalles: 'Ninguno, se encuentra en perfecto estado',
      estetica: '8.5/10',
      origen: 'local',
      images: {
        extra: ['', '', '']
      }
    }
  });

  function handleForm(obj, isML) {
    const { form } = state;
    const fixedObj = fixForm(obj, isML);
    dispatch({
      type: typesR.SET_OBJECT,
      payload: { form: { ...form, ...fixedObj } }
    });
  }

  function fixForm(obj, isML) {
    const { form } = state;
    const fieldName = Object.keys(obj)[0];
    const value = Object.values(obj)[0];

    const isImage = new RegExp('^[u][r][l]');

    if (isImage.test(fieldName)) {
      // si es una url de images.extra
      const index = parseInt(fieldName[3]) - 1; // obtener el subindice basado en el nombre
      form.images.extra[index] = value;
      return {};
    }
    switch (fieldName) {
      case 'cover':
        // si es la url de images.cover
        form.images.cover = value;
        if (!isML) {
          return { images: { ...form.images, mini: value } };
        }
        return {};

      case 'mini':
        // si es la url de images.mini
        form.images.mini = value;
        return {};

      case 'idVendedor':
        // si es la url de images.mini
        form.seller.idMercadoLibre = value;
        return {};

      case 'nameVendedor':
        // si es la url de images.mini
        form.seller.name = value;
        return {};

      default:
        return obj;
    }
  }

  function uploadNewLaptop() {
    return insertLaptop(state.form);
  }

  function uploadNewMercadoProduct() {
    return insertMLproduct(state.form);
  }

  function editLaptop() {
    return updateLaptop(state.form);
  }

  function editMLproduct() {
    return updateMLproduct(state.form);
  }

  function handleDelete(idString) {
    deleteLaptop(idString).then(() => refreshLaptops());
  }

  function confirmDelete(idString) {
    confirm({
      title: <span className="modal-title">Confirmación</span>,
      icon: <ExclamationCircleOutlined />,
      content: (
        <span className="modal-message">¿Quieres borrar el producto?</span>
      ),
      onOk() {
        handleDelete(idString);
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function refreshLaptops() {
    dispatch({ type: typesR.IS_LOADING });
    getALLLaptops().then(response => {
      dispatch({
        type: typesR.SET_OBJECT,
        payload: { currentList: response.data, loading: false }
      });
    });
  }

  function onAddOwnProduct() {
    dispatch({
      type: typesR.SET_OBJECT,
      payload: { window: 'FormOwnProducts' }
    });
  }

  function onChangeML(value) {
    dispatch({
      type: typesR.SET_OBJECT,
      payload: {
        searchML: value
      }
    });
  }

  function onAddMLProduct() {
    const initialForm = {
      origen: 'Mercado Libre',
      seller: {},
      images: {
        extra: ['', '', '']
      }
    };

    const { searchML } = state;
    if (searchML && searchML.length > 0) {
      superMLhandler(searchML).then(response => {
        dispatch({
          type: typesR.SET_OBJECT,
          payload: {
            window: 'FormMercadoLibre',
            form: response
          }
        });
      });
    } else {
      dispatch({
        type: typesR.SET_OBJECT,
        payload: {
          window: 'FormMercadoLibre',
          form: initialForm
        }
      });
    }
  }

  function onCloseForm() {
    dispatch({ type: typesR.CLOSE_FORM });
  }

  const onOpenEditProduct = id => {
    // Get the product data, clean de response and select de right form
    getLaptop(id).then(response => {
      const { data } = response;

      const windowType = data.idMercadoLibre
        ? 'FormMercadoLibre'
        : 'FormOwnProducts';

      const newResponse = data;
      delete newResponse.date;
      delete newResponse.__v;

      dispatch({
        type: typesR.SET_OBJECT,
        payload: {
          form: {
            ...newResponse
          },
          isEdit: true,
          window: windowType
        }
      });
      window.scrollTo(0, -100000);
    });
  };

  useEffect(() => {
    refreshLaptops();
  }, []);

  function windowSwitch() {
    const { window, isEdit, form } = state;
    switch (window) {
      case 'FormOwnProducts':
        return (
          <React.Fragment>
            <FormOwnProducts
              uploadNewLaptop={uploadNewLaptop}
              formInitial={form}
              isEdit={isEdit}
              refreshLaptops={refreshLaptops}
              handleForm={handleForm}
              onCloseForm={onCloseForm}
              editService={editLaptop}
            />
            <InvisibleButton callback={onCloseForm} />
          </React.Fragment>
        );
      case 'FormMercadoLibre':
        return (
          <React.Fragment>
            <FormMercadoLibre
              uploadNewMercadoProduct={uploadNewMercadoProduct}
              formInitial={form}
              isEdit={isEdit}
              refreshLaptops={refreshLaptops}
              handleForm={handleForm}
              onCloseForm={onCloseForm}
              editService={editMLproduct}
            />
            <InvisibleButton callback={onCloseForm} />
          </React.Fragment>
        );
      case 'none':
        return null;
      default:
        break;
    }
  }
  return (
    <div className="master-product-container">
      <AddProducts
        onAddOwnProduct={onAddOwnProduct}
        onAddMLProduct={onAddMLProduct}
        onChangeML={onChangeML}
      />
      {windowSwitch()}
      {state.loading ? (
        <LoadingScreen />
      ) : (
        <MasterListProduct
          currentList={state.currentList}
          onDeleteP={confirmDelete}
          refreshLaptops={refreshLaptops}
          onOpenEditProduct={onOpenEditProduct}
        />
      )}
    </div>
  );
};

export default ManageProducts;
