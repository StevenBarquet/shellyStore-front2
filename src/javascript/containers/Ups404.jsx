// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
// ---Components
import RigthPanel from 'Comp/Ups404/RigthPanel';
import LeftPanel from 'Comp/Ups404/LeftPanel';
// ------------------------------------------ COMPONENT-----------------------------------------

const Ups404 = () => {
  return (
    <div className="page404-container">
      <Row>
        <Col xs={24} sm={24} lg={16}>
          <LeftPanel />
        </Col>
        <Col xs={24} sm={24} lg={8}>
          <RigthPanel />
        </Col>
      </Row>
    </div>
  );
};

export default Ups404;
