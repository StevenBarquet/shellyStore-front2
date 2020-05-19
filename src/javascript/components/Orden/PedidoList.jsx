import React from 'react';

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

  const suma = total;

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
          <Row>
            <Col md={6}>
              <div className="col-vertical-align">Total: </div>
            </Col>
            <Col offset={6} md={6}>
              <div className="col-vertical-align">
                <p>{priceFormat(suma)}</p>
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
        </div>
      </Row>
    </React.Fragment>
  );
};
export default PedidoList;
