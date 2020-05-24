import React, { useState, useEffect } from 'react';

import { Row, Col } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
// Components
import CartItem from 'Comp/Orden/CartItem';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

// Others
import { priceFormat } from 'Others/otherMethods';

const PedidoList = props => {
  const { handleStep, items, confirmDelete, updatePiezas, total } = props;
  const [state, setState] = useState({
    freeShip: true,
    envio: 0,
    subtotal: total,
    totalFinal: total,
    restante: 0
  });

  useEffect(() => {
    setPrices();
  }, [total]);

  function setPrices() {
    const restante = 1998 - total;
    if (total < 1998) {
      setState({
        ...state,
        freeShip: false,
        envio: 198,
        subtotal: total,
        totalFinal: total + 198,
        restante
      });
    } else {
      setState({
        ...state,
        freeShip: true,
        envio: 0,
        subtotal: total,
        totalFinal: total,
        restante: 0
      });
    }
  }

  if (!items || items.length === 0) {
    return <h4>No tienes productos en tu carrito</h4>;
  }
  return (
    <React.Fragment>
      <Row>
        {items.map((item, i) => (
          <CartItem
            updatePiezas={updatePiezas}
            confirmDelete={confirmDelete}
            key={i}
            item={item}
          />
        ))}
      </Row>
      <Row>
        <div className="cart-total-container">
          <Row className="cart-total-sub">
            <Col md={6}>
              <div className="col-vertical-align">envio: </div>
            </Col>
            <Col offset={6} md={6}>
              <div className="col-vertical-align">
                <p>{priceFormat(state.envio)}</p>
              </div>
            </Col>
          </Row>
          <Row className="cart-total-sub">
            <Col md={6}>
              <div className="col-vertical-align">subtotal: </div>
            </Col>
            <Col offset={6} md={6}>
              <div className="col-vertical-align">
                <p>{priceFormat(state.subtotal)}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="col-vertical-align">Total: </div>
            </Col>
            <Col offset={6} md={6}>
              <div className="col-vertical-align">
                <p>{priceFormat(state.totalFinal)}</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="col-vertical-align">
                <ButtonMlg
                  variant={items && items.length > 0 ? 'green' : 'block'}
                  size="small"
                  widthB="130px"
                  label="Confirmar"
                  onClick={() => handleStep('next')}
                  icon={<CheckOutlined />}
                />
              </div>
            </Col>
          </Row>
          {!state.freeShip && (
            <Row className="cart-total-nota">
              <div>
                Pssst... solo te faltan{' '}
                <span>{priceFormat(state.restante)}</span> en tu carrito para
                que tu envío sea <span>gratis</span> :D
              </div>
            </Row>
          )}
        </div>
      </Row>
    </React.Fragment>
  );
};
export default PedidoList;
