import React from 'react';
import { Row, Col } from 'antd';

const Step = props => {
  const { current, data, icon, subTitle, enlace } = props;
  return (
    <Row className={current ? 'rastreo-step' : 'rastreo-step-block'}>
      <Col className="rastreo-icon" sm={6}>
        {icon}
      </Col>
      <Col sm={18}>
        <Row>
          <h4>
            {data.title}
            <span
              className={
                subTitle && subTitle === 'Confirmado'
                  ? 'text-green'
                  : 'text-yellow'
              }
            >
              {subTitle || null}
            </span>
          </h4>
        </Row>
        <Row>
          {data.detail + ' '}
          {enlace && (
            <a rel="noopener noreferrer" target="_blank" href={enlace}>
              {' ' + enlace}
            </a>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default Step;
