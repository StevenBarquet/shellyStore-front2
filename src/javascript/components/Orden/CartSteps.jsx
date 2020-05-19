import React from 'react';
import { Row, Steps } from 'antd';

const { Step } = Steps;

const CartSteps = props => {
  const { step } = props;
  return (
    <Row>
      <Steps current={step}>
        <Step title="Confirma pedido" description="Verfica tus productos" />
        <Step
          title="Entrega"
          description="Elige recoger tu pedido o esperarlo en tu domicilio"
        />
        <Step title="Pago" description="Selecciona tu forma de pago" />
        <Step
          title="Completar"
          description="Algunos datos para mantenerte al tanto de tu compra y listo"
        />
      </Steps>
    </Row>
  );
};

export default CartSteps;
