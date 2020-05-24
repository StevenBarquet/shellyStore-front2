// ---Dependencys
import React from 'react';
import { Card, Row, Col, Form, Input, Tooltip, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// ---Others
import { estadosMex } from 'Others/store-data.json';

const { Option } = Select;

const opciones = [
  {
    label: 'Domicilio particular',
    value: 'casa'
  },
  {
    label: 'Domicilio laboral',
    value: 'trabajo'
  }
];

const estados = estadosMex;

const mapOptions = options => {
  return options.map((element, i) => {
    return (
      <Option key={i} value={element.value}>
        {element.label}
      </Option>
    );
  });
};

const shortLabelItem = {
  labelCol: {
    sm: { span: 24 },
    md: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 19 }
  }
};
const singleRowItem = {
  labelCol: { span: 24 },
  wrapperCol: { span: 23 }
};

const longLabelItem = {
  labelCol: {
    sm: { span: 24 },
    md: { span: 9 }
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 14 }
  }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const ShipmentForm = props => {
  const { handleShipmentForm, validation, defaultValue } = props;

  function onChangeForm(objValue) {
    // console.log('onChangeForm', values);
    handleShipmentForm(objValue);
  }

  const {
    nombre,
    cp,
    estado,
    municipio,
    colonia,
    calle,
    exterior,
    entreC1,
    entreC2,
    referencia,
    domType,
    num
  } = validation;
  return (
    <Card className="pedido-form" title="Datos para el envío">
      <Form initialValues={defaultValue} onValuesChange={onChangeForm}>
        <Row gutter={[0, 10]} className="cart-form">
          <Col xs={24} sm={24} lg={24}>
            <Form.Item
              {...shortLabelItem}
              label={
                <span>
                  País&nbsp;
                  <Tooltip title="Sólo disponible en México de momento">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Input disabled value="México" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <Form.Item
              {...shortLabelItem}
              label={
                <span>
                  Nombre&nbsp;
                  <Tooltip title="Persona que va a recibir">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="nombre"
              validateStatus={nombre.status}
              help={nombre.status === 'error' ? nombre.message : null}
              rules={[{ required: true, message: nombre.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              {...longLabelItem}
              label="Código postal"
              name="cp"
              validateStatus={cp.status}
              help={cp.status === 'error' ? cp.message : null}
              rules={[{ required: true, message: cp.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              {...shortLabelItem}
              label="Estado"
              name="estado"
              validateStatus={estado.status}
              help={estado.status === 'error' ? estado.message : null}
              rules={[{ required: true, message: estado.message }]}
            >
              <Select>{mapOptions(estados)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="municipio"
              {...longLabelItem}
              label="Municipio / Alcaldía"
              validateStatus={municipio.status}
              help={municipio.status === 'error' ? municipio.message : null}
              rules={[{ required: true, message: municipio.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="colonia"
              {...longLabelItem}
              label="Colonia / Asentamiento"
              validateStatus={colonia.status}
              help={colonia.status === 'error' ? colonia.message : null}
              rules={[{ required: true, message: colonia.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={10}>
            <Form.Item
              name="calle"
              {...shortLabelItem}
              label="Calle"
              validateStatus={calle.status}
              help={calle.status === 'error' ? calle.message : null}
              rules={[{ required: true, message: calle.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={7}>
            <Form.Item
              name="exterior"
              {...longLabelItem}
              label="Exterior"
              validateStatus={exterior.status}
              help={exterior.status === 'error' ? exterior.message : null}
              rules={[{ required: true, message: exterior.message }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} lg={7}>
            <Form.Item name="interior" {...longLabelItem} label="Interior">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <h3>¿Entre qué calles está?:</h3>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="entreC1"
              {...shortLabelItem}
              label="Calle 1"
              validateStatus={entreC1.status}
              help={entreC1.status === 'error' ? entreC1.message : null}
              rules={[{ required: true, message: entreC1.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="entreC2"
              {...shortLabelItem}
              label="Calle 2"
              validateStatus={entreC2.status}
              help={entreC2.status === 'error' ? entreC2.message : null}
              rules={[{ required: true, message: entreC2.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={24}>
            <Form.Item
              name="referencia"
              {...singleRowItem}
              label={
                <span>
                  Referencia&nbsp;
                  <Tooltip title="Alguna indicación adicional para ubicar el domicilio">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              validateStatus={referencia.status}
              help={referencia.status === 'error' ? referencia.message : null}
              rules={[{ required: true, message: referencia.message }]}
            >
              <Input.TextArea placeholder="Ejemplo: Casa color gris, hay un oxxo a un lado" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="domType"
              {...longLabelItem}
              label="Tipo de domicilio"
              validateStatus={domType.status}
              help={domType.status === 'error' ? domType.message : null}
              rules={[{ required: true, message: domType.message }]}
            >
              <Select>{mapOptions(opciones)}</Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} lg={12}>
            <Form.Item
              name="num"
              {...longLabelItem}
              label={
                <span>
                  Número de contacto&nbsp;
                  <Tooltip title="LLamarán a éste número en caso de que hubiera un problema con el envío">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              validateStatus={num.status}
              help={num.status === 'error' ? num.message : null}
              rules={[{ required: true, message: num.message }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ShipmentForm;
