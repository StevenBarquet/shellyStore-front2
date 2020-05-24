import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// Components
import MiniCart from 'Comp/CartMini';
import ShowCart from 'Comp/CartMini/ShowCart';
// Conect from redux
import { connect } from 'react-redux';
// Actions from redux
import {
  getCart,
  deleteOneInCart,
  updateOneInCart,
  startUpdateMiniCart,
  emptyCart
} from 'Actions/Cart';

const { confirm } = Modal;

const CartMini = withRouter(props => {
  const {
    deleteOneRedux,
    updateOneRedux,
    updateCartRedux,
    updatedMiniCartRedux,
    reduxCart
  } = props; // All from redux
  const [state, setState] = useState({
    show: false,
    items: reduxCart.items
  });

  // Update from Orden
  useEffect(() => {
    if (!reduxCart.miniCartUpdated) {
      updateCartRedux();
      updatedMiniCartRedux(true);
    } else {
      setState({ ...state, items: reduxCart.items });
    }
  }, [reduxCart.miniCartUpdated]);

  // Update from anywhere else
  useEffect(() => {
    if (!reduxCart.isUpdated) {
      updateCartRedux();
    } else {
      setState({ ...state, items: reduxCart.items });
    }
  }, [reduxCart.isUpdated]);

  function updatePiezas(idString, value) {
    const { items } = state;
    const piezas = { piezas: value };
    updateOneRedux(items, idString, piezas);
  }

  function deleteItem(idString) {
    const { items } = state;
    deleteOneRedux(items, idString);
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

  function confirmEmpty() {
    confirm({
      title: <span className="modal-title">Confirmación</span>,
      icon: <ExclamationCircleOutlined />,
      content: (
        <span className="modal-message">
          ¿Quieres limpiar tu carrito carrito?
        </span>
      ),
      onOk() {
        props.emptyCartRedux();
      }
    });
  }

  function handleShow() {
    setState({ ...state, show: !state.show });
  }

  function toOrden() {
    handleShow();
    setTimeout(() => {
      props.history.push('orden');
    }, 180);
  }

  const current = props.location.pathname;

  const isAdmin = new RegExp('^[/][m][a][s][t][e][r]');
  const isOrden = new RegExp('^[/][o][r][d][e][n]');
  const isSuccess = new RegExp('^[/][s][u][c][c][e][s][s]');

  if (
    isAdmin.test(current) ||
    isOrden.test(current) ||
    isSuccess.test(current)
  ) {
    return null;
  }

  return (
    <React.Fragment>
      {state.show ? (
        <ShowCart
          confirmDelete={confirmDelete}
          updatePiezas={updatePiezas}
          items={state.items}
          handleShow={handleShow}
          toOrden={toOrden}
          confirmEmpty={confirmEmpty}
        />
      ) : (
        <MiniCart badgeNum={state.items.length} handleShow={handleShow} />
      )}
    </React.Fragment>
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
  updatedMiniCartRedux: flag => dispatch(startUpdateMiniCart(flag)),
  emptyCartRedux: () => dispatch(emptyCart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartMini);
