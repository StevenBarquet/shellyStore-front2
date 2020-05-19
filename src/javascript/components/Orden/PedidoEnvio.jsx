import React from 'react';
import { Row, Col } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
// Components
import BackBttn from 'Comp/Orden/BackBttn';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

// Other
// import { Tabs, Icon } from 'antd';

const PedidoEnvio = props => {
  const { handleStep, setEnvio } = props;
  return (
    <React.Fragment>
      <BackBttn handleStep={handleStep} />
      <Row gutter={[10, 10]} className="pedido-selction">
        <Col md={24}>
          <div className="col-vertical-align">
            Selecciona como recibes tu compra
          </div>
        </Col>
        <Col md={24}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="purple"
              size="normal"
              widthB="320px"
              onClick={() => setEnvio('paqueteria')}
              label="Recibir en mi domicilio"
              icon={<HomeOutlined />}
            />
          </div>
        </Col>
        <Col md={24}>
          <hr />
        </Col>
        <Col md={24}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="blue"
              size="normal"
              onClick={() => setEnvio('recoleccion')}
              widthB="320px"
              label="Recolectar personalmente"
              icon={<UserOutlined />}
            />
          </div>
        </Col>
        <Col md={24}>
          <p>
            <span>¿Donde es la recolección personal?</span>
            <br />
            <br />
            De lunes a domingo en el horario de 9:00 a 18:00 en:
            <br />
            Estacion Metrobus Colegio De Bachilleres 1
            <br />
            Av. de las Culturas, El Rosario, 02100 Ciudad de México, CDMX
            <br />
            <br />
            <a
              href="https://goo.gl/maps/RhSqm8p6zfUXtEHf8"
              rel="noopener noreferrer"
              target="_blank"
            >
              <EnvironmentOutlined />
              <span>Ver en Google</span>
            </a>
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PedidoEnvio;
