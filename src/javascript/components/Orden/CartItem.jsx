import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
// components
import PiezasForm from 'Comp/Orden/PiezasForm';
// CommonComps
import FitImg from 'CommonComps/FitImg';
import ButtonMlg from 'CommonComps/ButtonMlg';

// Others
import { priceFormat } from 'Others/otherMethods';

const CartItem = props => {
  const { item, confirmDelete, updatePiezas } = props;
  const { cover, piezas, disponibles, title, _id, precio } = item;
  return (
    <div className="buy-item-container">
      <Row>
        <div className="buy-item-header">
          <Link to={'/item=' + _id}>{title}</Link>
        </div>
      </Row>
      <Row>
        <Col xs={24} sm={24} lg={6}>
          <FitImg srcImg={cover} estilo="cart-images-big" alt={title} />
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <div className="col-vertical-align">
            <PiezasForm
              callback={updatePiezas}
              defaultValue={piezas}
              id={_id}
              max={disponibles}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <div className="col-vertical-align">
            {priceFormat(precio * piezas)}
          </div>
        </Col>
        <Col xs={24} sm={24} lg={6}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="yellow"
              size="mini"
              value={_id}
              onClick={() => confirmDelete(_id)}
              widthB="26px"
              icon={<CloseOutlined />}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
