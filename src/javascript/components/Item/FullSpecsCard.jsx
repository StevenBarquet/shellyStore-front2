import React from 'react';
import { Row, Col, Card } from 'antd';
// Comp
import ProdSpecs from 'Comp/Item/ProdSpecs';
// Others
import { contactLink } from 'Others/labels.json';

const FullSpecsCard = props => {
  const { product } = props;
  if (product.os) {
    return (
      <Card className="specs-card">
        <Row>
          <Col offset={1} xl={11}>
            <ProdSpecs
              title="Características de rendimiento "
              tooltip="La velocidad y rendimiento de tu equipo depende de éstas características"
              text={product.rendimiento}
            />
          </Col>
          <Col offset={1} xl={11}>
            <ProdSpecs title="Características generales" text={product.specs} />
          </Col>
          <Col offset={1} xl={11}>
            <ProdSpecs title="Puertos" text={product.ports} />
          </Col>
          <Col offset={1} xl={11}>
            {' '}
            {product.special && product.special !== '' && (
              <ProdSpecs
                title="Características especiales"
                tooltip="Algunas características sobresalientes acerca de éste equipo"
                text={product.special}
              />
            )}
          </Col>
        </Row>
        <Row>
          <p>
            ¿Tienes dudas o necesitas orientación? Mensaje{' '}
            <a href={contactLink} target="_blank" rel="noopener noreferrer">
              aquí :D
            </a>
          </p>
        </Row>
      </Card>
    );
  }
  return (
    <Card className="specs-card">
      <Row>
        <Col xl={24}>
          <ProdSpecs title="Características generales" text={product.specs} />
        </Col>
      </Row>
      <Row>
        <p>
          ¿Tienes dudas o necesitas orientación? Mensaje{' '}
          <a href={contactLink} target="_blank" rel="noopener noreferrer">
            aquí :D
          </a>
        </p>
      </Row>
    </Card>
  );
};

export default FullSpecsCard;
