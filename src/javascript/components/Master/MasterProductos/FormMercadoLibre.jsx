// ---Dependencys
import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Select } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
import SelectCustomizable from 'CommonComps/SelectCustomizable';
import ModalNotification from 'CommonComps/ModalNotification';
// ---Others
import { productos as otherOptions } from 'Others/store-data.json';

const { Option } = Select;

const optionsGarantia = otherOptions.garantias;

const optionsCategoria = otherOptions.categorias;

const optionsPromo = otherOptions.promos;

const optionsOrigen = otherOptions.origen;

const mapOptions = options => {
  return options.map((element, i) => {
    return (
      <Option key={i} value={element.value}>
        {element.label}
      </Option>
    );
  });
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const formItemLayoutLong = {
  labelCol: { span: 12 },
  wrapperCol: { span: 11 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const FormMercadoLibre = props => {
  const [disable, setDisable] = useState(false);
  const {
    onCloseForm,
    handleForm,
    uploadNewMercadoProduct,
    refreshLaptops,
    formInitial,
    editService,
    isEdit
  } = props;

  // ---Handle Custom Select
  const [customSelect, setCustomSelect] = useState({
    origen: optionsOrigen,
    promo: optionsPromo,
    garantias: optionsGarantia
  });
  function handleOption(newOption, type) {
    const { origen } = customSelect;
    setCustomSelect({
      ...customSelect,
      [type]: [...origen, newOption]
    });
  }
  // ---Finish Custom Select

  function onFinish() {
    // console.log('onFinish: ', values);
    setDisable(true);
    if (isEdit) {
      editService().then(() => refreshList(true));
    } else {
      uploadNewMercadoProduct().then(() => refreshList(true));
    }
  }

  function refreshList(thenClose) {
    ModalNotification(1, 'Notificación', 'Producto cargado exitosamente :)');
    setDisable(false);
    refreshLaptops();

    if (thenClose) onCloseForm();
  }

  function onFormChange(values) {
    handleForm(values);
  }

  return (
    <div className="new-prod">
      <Card style={{ width: '100%' }} title="Producto nuevo Mercado Libre">
        <Form
          initialValues={{
            ...formInitial,
            idVendedor: formInitial.seller.idMercadoLibre || '',
            nameVendedor: formInitial.seller.name || '',
            cover: formInitial.images.cover,
            mini: formInitial.images.mini,
            url1: formInitial.images.extra[0],
            url2: formInitial.images.extra[1],
            url3: formInitial.images.extra[2]
          }}
          onValuesChange={onFormChange}
          onFinish={onFinish}
        >
          <Row gutter={[5, 10]}>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayout}
                label="Titulo"
                name="marca"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un titulo'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayout}
                label="SubTitulo"
                name="modelo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un modelo del producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <Form.Item
                {...formItemLayout}
                label="costo"
                name="costo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un costo del producto'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <Form.Item
                {...formItemLayout}
                label="precio"
                name="precio"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un precio del producto'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <Form.Item
                {...formItemLayoutLong}
                label="disponibles"
                name="disponibles"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un disponibles del producto'
                  }
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="Sub-Categoría"
                name="shortMicro"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una Sub-Categoría'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="garantia"
                name="garantia"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un garantia del producto'
                  }
                ]}
              >
                <Select
                  placeholder="Selecciona una garantía"
                  dropdownRender={menu => (
                    <SelectCustomizable
                      menu={menu}
                      type="garantias"
                      handleOption={handleOption}
                    />
                  )}
                >
                  {mapOptions(customSelect.garantias)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="categoria"
                name="categoria"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un categoria del producto'
                  }
                ]}
              >
                <Select placeholder="Selecciona una categoría">
                  {mapOptions(optionsCategoria)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="origen"
                name="origen"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un origen del producto'
                  }
                ]}
              >
                <Select
                  placeholder="Selecciona el origen del producto"
                  dropdownRender={menu => (
                    <SelectCustomizable
                      menu={menu}
                      type="origen"
                      handleOption={handleOption}
                    />
                  )}
                >
                  {mapOptions(customSelect.origen)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="Promoción"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una promoción'
                  }
                ]}
              >
                <Select
                  placeholder="Selecciona promoción"
                  dropdownRender={menu => (
                    <SelectCustomizable
                      menu={menu}
                      type="promo"
                      handleOption={handleOption}
                    />
                  )}
                >
                  {mapOptions(customSelect.promo)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="Descripción"
                name="specs"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa descripción'
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayout}
                label="ID ML"
                name="idMercadoLibre"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un id de ML'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayout}
                label="url ML"
                name="mlURL"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una url de ML'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayoutLong}
                label="ID de vendedor"
                name="idVendedor"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una url de ML'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayoutLong}
                label="nombre del vendedor"
                name="nameVendedor"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un nombre de vendedor'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="url imagen portada"
                name="cover"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una imagen de producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="url imagen portda ligera"
                name="mini"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una imagen de producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="url imagen extra 1"
                name="url1"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una imagen de producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="url imagen extra 2"
                name="url2"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una imagen de producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="url imagen extra 3"
                name="url3"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una imagen de producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* ------------------- Butons ------------------ */}
          <Row>
            <Col xs={24} sm={24} lg={8}>
              <div className="center-block">
                <ButtonMlg
                  label="Cancelar"
                  onClick={onCloseForm}
                  variant={disable ? 'block' : 'red'}
                  widthB="140px"
                  icon={<CloseCircleFilled />}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} lg={{ span: 8, offset: 8 }}>
              <div className="center-block">
                <ButtonMlg
                  label={isEdit ? 'Actualizar' : 'Subir'}
                  htmlType="submit"
                  variant={disable ? 'block' : 'blue'}
                  widthB="140px"
                  icon={<CheckCircleFilled />}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default FormMercadoLibre;
