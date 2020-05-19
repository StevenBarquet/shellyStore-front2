import React, { useEffect, useReducer } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
// Components
import CartSteps from 'Comp/Orden/CartSteps';
import PedidoList from 'Comp/Orden/PedidoList';
import PedidoEnvio from 'Comp/Orden/PedidoEnvio';
import PedidoDom from 'Comp/Orden/PedidoDom';
import PedidoPago from 'Comp/Orden/PedidoPago';
// Comons
import LoadingScreen from 'CommonComps/LoadingScreen';
// Otros
import { insertOrden } from 'Others/peticiones';
import {
  contactFormErrors,
  contactFormValidate,
  shipmentFormValidate,
  shipmentFormErrors
} from 'Others/data-model-forms';
// Conect from redux
import { connect } from 'react-redux';
// Actions from redux
import {
  getCart,
  deleteOneInCart,
  updateOneInCart,
  startUpdateMiniCart
} from 'Actions/Cart';

const { confirm } = Modal;

const typesR = {
  GET_ITEMS_FROM_REDUX: 'GET_ITEMS_FROM_REDUX',
  UPDATE_TOTAL: 'UPDATE_TOTAL',
  RESTORE_SAVED_FORMS: 'RESTORE_SAVED_FORMS',
  SET_LOADING: 'SET_LOADING',
  VALIDATE_FORMS: 'VALIDATE_FORMS',
  FINISH_ONLINE_ORDER: 'FINISH_ONLINE_ORDER',
  SET_ENVIO: 'SET_ENVIO',
  SET_PAGO: 'SET_PAGO',
  CHANGE_STEP: 'CHANGE_STEP',
  HANDLE_CONTACT: 'HANDLE_CONTACT',
  HANDLE_SHIPMENT: 'HANDLE_SHIPMENT'
};

function reducerOrden(state, action) {
  const { type, payload } = action;

  switch (type) {
    case typesR.GET_ITEMS_FROM_REDUX:
      return { ...state, items: payload };

    case typesR.UPDATE_TOTAL:
      return { ...state, total: payload };

    case typesR.CHANGE_STEP:
      return { ...state, step: payload };

    case typesR.SET_ENVIO:
      return { ...state, envioTipo: payload, step: state.step + 1 };

    case typesR.SET_PAGO:
      return { ...state, pagoTipo: payload, step: state.step + 1 };

    case typesR.HANDLE_CONTACT:
      return {
        ...state,
        ...payload,
        contactFormValidation: contactFormErrors,
        isValidContact: true
      };

    case typesR.HANDLE_SHIPMENT:
      return {
        ...state,
        domicilio: payload,
        shipmentFormValidation: shipmentFormErrors,
        isValidShipment: true
      };

    case typesR.RESTORE_SAVED_FORMS:
      return { ...state, domicilio: payload.domicilio, ...payload.contactF };

    case typesR.SET_LOADING:
      return { ...state, loading: payload };

    case typesR.VALIDATE_FORMS: {
      const {
        contactFormValidation,
        isValidContact,
        shipmentFormValidation,
        isValidShipment
      } = payload;
      return {
        ...state,
        contactFormValidation,
        isValidContact,
        shipmentFormValidation,
        isValidShipment
      };
    }

    case typesR.FINISH_ONLINE_ORDER:
      return { ...state, finishStep: true, idPreference: payload };

    default:
      return state;
  }
}

const Orden = withRouter(props => {
  const {
    deleteOneRedux,
    updateOneRedux,
    updateCartRedux,
    updatedMiniCartRedux,
    reduxCart,
    history
  } = props; // All from redux

  const [state, dispatch] = useReducer(reducerOrden, {
    step: 0,
    loading: false,
    items: reduxCart.items,
    envioTipo: '',
    correo: '',
    telefono: '',
    nombre: '',
    total: 0,
    estatus: 'pago:Pendiente',
    apellido: '',
    domicilio: {},
    pagoTipo: '',
    idPreference: '',
    defaultContact: checkInitialContact(),
    defaultShipment: checkInitialShipment(),
    finishStep: false,
    updateTotal: false,
    contactFormValidation: contactFormErrors,
    isValidContact: true,
    shipmentFormValidation: shipmentFormErrors,
    isValidShipment: true
  });

  useEffect(() => {
    updateCartCheck();
  }, [reduxCart.isUpdated]);

  useEffect(() => {
    updateTotal();
  }, [state.items, state.updateTotal]);

  useEffect(() => {
    getSavedforms();
  }, []);

  useEffect(() => {
    const { finishStep, pagoTipo } = state;
    if (finishStep && pagoTipo === 'online') {
      goToUrl();
    }
  }, [state.finishStep]);

  function updateCartCheck() {
    if (!reduxCart.isUpdated) {
      updateCartRedux();
    } else {
      console.log('updated!');
      dispatch({ type: typesR.GET_ITEMS_FROM_REDUX, payload: reduxCart.items });
    }
  }

  function updateTotal() {
    let total = 0;
    state.items.forEach(element => {
      total += element.precio * element.piezas;
    });
    dispatch({ type: typesR.UPDATE_TOTAL, payload: total });
  }

  function getSavedforms() {
    let shipmentF = localStorage.getItem('sF');
    let contactF = localStorage.getItem('cF');
    if (shipmentF) {
      shipmentF = JSON.parse(shipmentF);
    } else {
      shipmentF = {};
    }
    if (contactF) {
      contactF = JSON.parse(contactF);
    } else {
      contactF = {};
    }
    dispatch({
      type: typesR.RESTORE_SAVED_FORMS,
      payload: { domicilio: shipmentF, contactF }
    });
  }

  function checkInitialShipment() {
    const shipmentF = localStorage.getItem('sF');
    if (shipmentF) {
      return JSON.parse(shipmentF);
    }
    return {};
  }

  function checkInitialContact() {
    const contactF = localStorage.getItem('cF');
    if (contactF) {
      return JSON.parse(contactF);
    }
    return {};
  }

  function goToUrl() {
    window.open(state.idPreference, '_top');
  }

  function testContact() {
    const { nombre, apellido, correo, telefono } = state;
    const validateContact = contactFormValidate({
      nombre,
      apellido,
      correo,
      telefono
    });

    localStorage.setItem(
      'cF',
      JSON.stringify({ nombre, apellido, correo, telefono })
    );

    return validateContact;
  }

  function testShipment() {
    const { domicilio } = state;
    const {
      nombre,
      cp,
      estado,
      municipio,
      colonia,
      calle,
      exterior,
      interior,
      entreC1,
      entreC2,
      referencia,
      domType,
      num
    } = domicilio;

    const validateShipment = shipmentFormValidate({
      nombre,
      cp,
      estado,
      municipio,
      colonia,
      calle,
      exterior,
      interior,
      entreC1,
      entreC2,
      referencia,
      domType,
      num
    });

    localStorage.setItem(
      'sF',
      JSON.stringify({
        nombre,
        cp,
        estado,
        municipio,
        colonia,
        calle,
        exterior,
        interior,
        entreC1,
        entreC2,
        referencia,
        domType,
        num
      })
    );

    return validateShipment;
  }

  function onNewOrder() {
    const validateContact = testContact();
    const validateShipment = testShipment();

    // si los forms pasan la validación se hace el request
    if (validateContact.isValid && validateShipment.isValid) {
      dispatch({ type: typesR.SET_LOADING, payload: true });
      const newItems = state.items.map(item => ({
        _id: item._id,
        piezas: item.piezas
      }));

      insertOrden({
        items: newItems,
        envioTipo: state.envioTipo,
        correo: state.correo,
        telefono: state.telefono,
        nombre: state.nombre,
        estatus: state.estatus,
        apellido: state.apellido,
        domicilio: state.domicilio,
        pagoTipo: state.pagoTipo
      })
        .then(response => {
          const { data } = response;
          const { VALIDATE_FORMS, FINISH_ONLINE_ORDER, SET_LOADING } = typesR;
          dispatch({ type: SET_LOADING, payload: false });
          if (data.status === 'success' && state.pagoTipo === 'online') {
            dispatch({
              type: VALIDATE_FORMS,
              payload: {
                contactFormValidation: validateContact.errorStructure,
                isValidContact: validateContact.isValid,
                shipmentFormValidation: validateShipment.errorStructure,
                isValidShipment: validateShipment.isValid
              }
            });
            dispatch({ type: FINISH_ONLINE_ORDER, payload: data.idPreference });
          } else {
            history.push('/success=pending=' + data.orderID);
          }
        })
        .catch(err => {
          console.log('error at insertOrden: ', err);
        });
    } else {
      dispatch({
        type: typesR.VALIDATE_FORMS,
        payload: {
          contactFormValidation: validateContact.errorStructure,
          isValidContact: validateContact.isValid,
          shipmentFormValidation: validateShipment.errorStructure,
          isValidShipment: validateShipment.isValid
        }
      });
    }
  }

  function setEnvio(envioTipo) {
    dispatch({ type: typesR.SET_ENVIO, payload: envioTipo });
  }

  function setPagoType(pagoTipo) {
    dispatch({ type: typesR.SET_PAGO, payload: pagoTipo });
    // checando si jala el servicio verificador de productos
    // const newItems = reduxCart.items.map(item => ({
    //   _id: item._id,
    //   piezas: item.piezas
    // }));
    // checkItems({ items: newItems }).then(res => console.log('checkItems: ', res));
  }

  function deleteItem(idString) {
    const { items } = state;
    updatedMiniCartRedux(false);
    deleteOneRedux(items, idString);
  }

  function updatePiezas(idString, value) {
    const { items } = state;
    updatedMiniCartRedux(false);
    updateOneRedux(items, idString, value);
  }

  function confirmDelete(idString) {
    confirm({
      title: <span className="modal-title">Confirmación</span>,
      icon: <ExclamationCircleOutlined />,
      content: (
        <span className="modal-message">
          ¿Quieres borrar el producto de tu carrito?
        </span>
      ),
      onOk() {
        deleteItem(idString);
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function handleStep(type) {
    if (type === 'next') {
      dispatch({ type: typesR.CHANGE_STEP, payload: state.step + 1 });
    } else {
      dispatch({ type: typesR.CHANGE_STEP, payload: state.step - 1 });
    }
  }

  function handleContactForm(obj) {
    dispatch({ type: typesR.HANDLE_CONTACT, payload: obj });
  }

  function handleShipmentForm(obj) {
    const { domicilio } = state;
    const newDomicilio = { ...domicilio, ...obj };
    dispatch({ type: typesR.HANDLE_SHIPMENT, payload: newDomicilio });
  }

  const mapSteps = () => {
    switch (state.step) {
      case 0:
        return (
          <PedidoList
            updatePiezas={updatePiezas}
            confirmDelete={confirmDelete}
            handleStep={handleStep}
            items={state.items}
            total={state.total}
          />
        );
      case 1:
        return <PedidoEnvio setEnvio={setEnvio} handleStep={handleStep} />;
      case 2:
        return (
          <PedidoPago
            envioTipo={state.envioTipo}
            setPagoType={setPagoType}
            handleStep={handleStep}
          />
        );
      case 3:
        return (
          <PedidoDom
            envioTipo={state.envioTipo}
            handleContactForm={handleContactForm}
            contactFormValidation={state.contactFormValidation}
            isValidContact={state.isValidContact}
            handleShipmentForm={handleShipmentForm}
            shipmentFormValidation={state.shipmentFormValidation}
            isValidShipment={state.isValidShipment}
            defaultContact={state.defaultContact}
            defaultShipment={state.defaultShipment}
            handleStep={handleStep}
            submitPedido={onNewOrder}
            loading={state.loading}
          />
        );
      default:
        break;
    }
  };
  return (
    <div className="orden-container">
      <CartSteps step={state.step} />
      {state.loading || state.finishStep ? <LoadingScreen /> : mapSteps()}
    </div>
  );
});

const mapStateToProps = reducers => {
  return {
    reduxCart: reducers.cartReducer
  };
};

const mapDispatchToProps = dispatch => ({
  updateCartRedux: () => dispatch(getCart()),
  deleteOneRedux: (items, idString) =>
    dispatch(deleteOneInCart(items, idString)),
  updateOneRedux: (items, idString, value) =>
    dispatch(updateOneInCart(items, idString, value)),
  updatedMiniCartRedux: flag => dispatch(startUpdateMiniCart(flag))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orden);
