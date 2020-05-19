// ---Dependencys
import React, { useReducer, useEffect } from 'react';
// ---Components
import AuthValidate from 'Comp/Master/AuthValidate';
import AddProducts from 'Comp/Master/MasterProductos/AddProducts';
import MasterListProduct from 'Comp/Master/MasterProductos/MasterListProduct';
import FormOwnProducts from 'Comp/Master/MasterProductos/FormOwnProducts';
import FormMercadoLibre from 'Comp/Master/MasterProductos/FormMercadoLibre';
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
  updateLaptop
} from 'Others/peticiones';

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
const MasterProductos = () => {
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
    console.log('debugging...', fixedObj);
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

  function onAddMLProduct() {
    dispatch({
      type: typesR.SET_OBJECT,
      payload: {
        window: 'FormMercadoLibre',
        form: {
          origen: 'Mercado Libre',
          seller: {},
          images: {
            extra: ['', '', '']
          }
        }
      }
    });
  }

  function onCloseForm() {
    dispatch({ type: typesR.CLOSE_FORM });
  }

  const onOpenEditProduct = id => {
    getLaptop(id).then(response => {
      const {
        _id,
        costo,
        detalles,
        disponibles,
        estetica,
        categoria,
        origen,
        garantia,
        images,
        marca,
        modelo,
        os,
        ports,
        precio,
        recomendacion,
        rendimiento,
        shortMicro,
        special,
        specs,
        type
      } = response.data;
      dispatch({
        type: typesR.SET_OBJECT,
        payload: {
          form: {
            _id,
            costo,
            detalles,
            disponibles,
            estetica,
            categoria,
            origen,
            garantia,
            images,
            marca,
            modelo,
            os,
            ports,
            precio,
            recomendacion,
            rendimiento,
            shortMicro,
            special,
            specs,
            type
          },
          isEdit: true,
          window: 'FormOwnProducts'
        }
      });
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
              editLaptop={editLaptop}
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
              editLaptop={editLaptop}
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
    <AuthValidate>
      <div className="master-product-container">
        <AddProducts
          onAddOwnProduct={onAddOwnProduct}
          onAddMLProduct={onAddMLProduct}
        />
        {windowSwitch()}
        {state.loading ? (
          <LoadingScreen />
        ) : (
          <MasterListProduct
            currentList={state.currentList}
            onDeleteP={deleteLaptop}
            refreshLaptops={refreshLaptops}
            onOpenEditProduct={onOpenEditProduct}
          />
        )}
      </div>
    </AuthValidate>
  );
};

export default MasterProductos;
