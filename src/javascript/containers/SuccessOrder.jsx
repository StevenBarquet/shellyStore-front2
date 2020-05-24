import React, { useEffect, useReducer } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Spin } from 'antd';
// ---Handle html headers
import CustomHelmet from 'Comp/CustomHelmet';
// others
import { payOrden } from 'Others/peticiones';
import { copyToEnd, copyFromOneIndexToOther } from 'Others/otherMethods';
// Conect from redux
import { connect } from 'react-redux';
// Actions from redux
import { emptyCart } from 'Actions/Cart';

const typesR = {
  SET_LOADING: 'SET_LOADING',
  SET_ORDER: 'SET_ORDER'
};

function reducerSuccessOrder(state, action) {
  switch (action.type) {
    case typesR.SET_ORDER:
      return { ...state, id: action.payload.id, status: action.payload.flag };
    case typesR.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const SuccessOrder = withRouter(props => {
  const [state, dispatch] = useReducer(reducerSuccessOrder, {
    id: '',
    status: '',
    loading: false
  });
  useEffect(() => {
    setOrderId();
  }, []);

  useEffect(() => {
    confirmBuy();
  }, [state.id]);

  function confirmBuy() {
    const { status } = state;
    dispatch({ type: typesR.SET_LOADING, payload: true });
    props.emptyCartRedux();
    if (status === 'aproved') {
      payOrden(state.id).then(response => {
        dispatch({ type: typesR.SET_LOADING, payload: false });
      });
    } else {
      dispatch({ type: typesR.SET_LOADING, payload: false });
    }
  }

  function setOrderId() {
    const { location, history } = props;
    const validParams = validaciones(location.pathname);
    if (validParams) {
      dispatch({ type: typesR.SET_ORDER, payload: validParams });
    } else {
      history.push('/error404');
    }
  }

  function validaciones(cadena) {
    if (cadena.length < 20) return false;

    const flag = copyFromOneIndexToOther(cadena, 9, 15);
    const id = copyToEnd(cadena, 17);

    if (flag !== 'aproved' && flag !== 'pending') return false;
    if (id < 12) return false;

    return { id, flag };
  }
  return (
    <React.Fragment>
      <CustomHelmet pageName="SuccessOrder" />
      <div className="success">
        <h1>¡Gracias por tu compra!</h1>
        <h2>
          Orden: <span>{state.id}</span>
        </h2>
        <p>
          En unos minutos te enviaremos a tu correo (revisar{' '}
          <span>correos no deseados</span>) tu número de orden para que no lo
          pierdas, con él le puedes dar seguimiento a tu pedido en el siguiente
          enlace:
          <br />
          {state.loading ? (
            <Spin />
          ) : (
            <Link to={`/rastreo?id:${state.id}`}>Rastrea tu pedido aquí</Link>
          )}
        </p>
      </div>
    </React.Fragment>
  );
});

const mapStateToProps = reducers => {
  return {
    reduxCart: reducers.cartReducer
  };
};

const mapDispatchToProps = dispatch => ({
  emptyCartRedux: () => dispatch(emptyCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessOrder);
