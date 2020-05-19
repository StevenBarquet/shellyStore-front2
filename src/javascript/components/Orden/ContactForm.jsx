// ---Dependencys
import React from 'react';
import { Card, Row, Col, Form, Input } from 'antd';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const ContactForm = props => {
  const { handleContactForm, validation, defaultValue } = props;

  function onChangeForm(objValue) {
    // console.log('onChangeForm', values);
    handleContactForm(objValue);
  }

  const { nombre, apellido, correo } = validation;
  return (
    <Card
      className="pedido-form"
      title="Datos para notificarte de tu compra (no SPAM)"
    >
      {/* ----------------------------form------------------------- */}
      <Form
        initialValues={defaultValue}
        onValuesChange={onChangeForm}
        {...formItemLayout}
      >
        <Row>
          <Col xl={12}>
            <Form.Item
              name="nombre"
              label="Nombre"
              validateStatus={nombre.status}
              help={nombre.status === 'error' ? nombre.message : null}
              rules={[{ required: true, message: nombre.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              name="apellido"
              label="Apellido"
              validateStatus={apellido.status}
              help={apellido.status === 'error' ? apellido.message : null}
              rules={[{ required: true, message: apellido.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Form.Item
              name="correo"
              label="Correo"
              validateStatus={correo.status}
              help={correo.status === 'error' ? correo.message : null}
              rules={[{ required: true, message: correo.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item name="telefono" label="Teléfono (opcional)">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ContactForm;
