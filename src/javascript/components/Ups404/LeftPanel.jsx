// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// ---Others
import { title } from 'Others/labels.json';

const { main, sub } = title;

const LeftPanel = () => {
  return (
    <Row>
      <Col span={24}>
        <h1>!Oh No! ¿TE PERDISTE?</h1>
      </Col>
      <Col span={24}>
        <p>Lo sentimos, no logramos encontrar ésta página</p>
      </Col>
      <Col span={24}>
        <Link to="/productos">
          <div className="page404-button">
            <h2>
              {main} <span>{sub}</span>
              <DoubleRightOutlined />
            </h2>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default LeftPanel;
