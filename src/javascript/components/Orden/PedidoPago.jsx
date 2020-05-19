import React from 'react';
import { Row, Col } from 'antd';
import { SafetyOutlined, DollarCircleFilled } from '@ant-design/icons';
// Components
import BackBttn from 'Comp/Orden/BackBttn';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

// Other
// import { Tabs, Icon } from 'antd';

const PedidoPago = props => {
  const { handleStep, envioTipo, setPagoType } = props;
  return (
    <React.Fragment>
      <BackBttn handleStep={handleStep} />
      <Row gutter={[10, 10]} className="pedido-selction">
        <Col md={24}>
          <div className="col-vertical-align">
            Selecciona como quieres pagar:
          </div>
        </Col>
        <Col md={24}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="yellow"
              size="normal"
              widthB="320px"
              onClick={() => setPagoType('online')}
              label="Pagar online"
              icon={<SafetyOutlined />}
            />
          </div>
        </Col>
        <Col md={24}>
          <hr />
        </Col>
        <Col md={24}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant={envioTipo === 'recoleccion' ? 'purple' : 'block'}
              size="normal"
              onClick={() => setPagoType('cash')}
              widthB="320px"
              label="Pagar a contra-entrega"
              icon={<DollarCircleFilled />}
            />
          </div>
        </Col>
        <Col md={24}>
          <p>
            <span>Nota: </span> Pago a contra-entrega sólo disponible en{' '}
            <span>recolección personal</span>
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PedidoPago;
