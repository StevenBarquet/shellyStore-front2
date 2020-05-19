import React from 'react';
import { Row, Col } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// Components
import PiezasForm from 'Comp/CartMini/PiezasForm';
// CommonComps
import FitImg from 'CommonComps/FitImg';
import ButtonMlg from 'CommonComps/ButtonMlg';

const MiniCartList = props => {
  const { item, confirmDelete, updatePiezas } = props;
  const { title, cover, piezas, _id, disponibles } = item;
  return (
    <Row className="mini-cart-item-container">
      <Row style={{ width: '100%' }}>
        <div className="mini-cart-item-header">{title}</div>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col xs={24} sm={24} lg={8}>
          <FitImg srcImg={cover} estilo="cart-images" alt={title} />
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="col-vertical-align">
            <PiezasForm
              id={_id}
              callback={updatePiezas}
              defaultValue={piezas}
              max={disponibles}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="yellow"
              onClick={() => confirmDelete(_id)}
              size="mini"
              value={_id}
              widthB="26px"
              icon={<CloseOutlined />}
            />
          </div>
        </Col>
      </Row>
    </Row>
  );
};

export default MiniCartList;
