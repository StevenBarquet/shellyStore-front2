import React from 'react';
import { Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
// Components
import BackBttn from 'Comp/Orden/BackBttn';
import ContactForm from 'Comp/Orden/ContactForm';
import ShipmentForm from 'Comp/Orden/ShipmentForm';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

const PedidoDom = props => {
  const {
    handleStep,
    handleContactForm,
    handleShipmentForm,
    envioTipo,
    submitPedido,
    contactFormValidation,
    isValidContact,
    shipmentFormValidation,
    isValidShipment,
    defaultContact,
    defaultShipment
  } = props;

  function messageValidated() {
    if (isValidContact && isValidShipment) {
      return null;
    }
    return (
      <Col offset={4} md={8}>
        <h3 className="error-mid-mssg">
          Hay campos inválidos, revisa la información
        </h3>
      </Col>
    );
  }

  return (
    <React.Fragment>
      <BackBttn handleStep={handleStep} />
      <ContactForm
        submit={submitPedido}
        validation={contactFormValidation}
        handleContactForm={handleContactForm}
        defaultValue={defaultContact}
      />
      {envioTipo === 'paqueteria' && (
        <ShipmentForm
          submit={submitPedido}
          validation={shipmentFormValidation}
          handleShipmentForm={handleShipmentForm}
          defaultValue={defaultShipment}
        />
      )}
      <Row>
        <Col md={4}>
          <div className="col-vertical-align">
            <ButtonMlg
              variant="green"
              size="default"
              widthB="170px"
              label="Finalizar"
              onClick={submitPedido}
              icon={<LogoutOutlined />}
            />
          </div>
        </Col>
        {messageValidated()}
      </Row>
    </React.Fragment>
  );
};

export default PedidoDom;
