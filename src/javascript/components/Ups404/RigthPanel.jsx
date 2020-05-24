// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Media
import upsLogo from 'Images/shelly-logo-ups.png';

const RigthPanel = () => {
  return (
    <Row>
      <Col className="center-block" span={24}>
        <img src={upsLogo} width="380px" alt="shelly-store.com/" />
      </Col>
      <Col span={24}>
        <h3>
          Código de error <span>404</span>
        </h3>
      </Col>
    </Row>
  );
};

export default RigthPanel;
