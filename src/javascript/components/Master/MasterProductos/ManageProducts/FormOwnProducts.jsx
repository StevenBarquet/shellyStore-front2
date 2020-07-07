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

const optionsShortMicro = [
  {
    label: 'Intel Core 2 duo',
    value: 'Intel Core 2 duo'
  },
  {
    label: 'Intel Core 2 quad',
    value: 'Intel Core 2 quad'
  },
  {
    label: 'Intel Core i3',
    value: 'Intel Core i3'
  },
  {
    label: 'Intel Core i5',
    value: 'Intel Core i5'
  },
  {
    label: 'Intel Core i7',
    value: 'Intel Core i7'
  },
  {
    label: 'Intel Core i9',
    value: 'Intel Core i9'
  },
  {
    label: 'AMD A4',
    value: 'AMD A4'
  },
  {
    label: 'AMD A6',
    value: 'AMD A6'
  },
  {
    label: 'AMD A8',
    value: 'AMD A8'
  },
  {
    label: 'AMD A10',
    value: 'AMD A10'
  },
  {
    label: 'AMD A12',
    value: 'AMD A12'
  },
  {
    label: 'AMD Ryzen 3',
    value: 'AMD Ryzen 3'
  },
  {
    label: 'AMD Ryzen 5',
    value: 'AMD Ryzen 5'
  },
  {
    label: 'AMD Ryzen 7',
    value: 'AMD Ryzen 7'
  },
  {
    label: 'AMD Ryzen 9',
    value: 'AMD Ryzen 9'
  }
];

const optionsCategoria = otherOptions.categorias;

const optionsType = otherOptions.tipos;

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
const FormOwnProducts = props => {
  const [disable, setDisable] = useState(false);
  const {
    onCloseForm,
    handleForm,
    uploadNewLaptop,
    refreshLaptops,
    formInitial,
    editService,
    isEdit
  } = props;

  // ---Handle Custom Select
  const [customSelect, setCustomSelect] = useState({
    shortMicro: optionsShortMicro,
    origen: optionsOrigen,
    laptopTypes: optionsType,
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
      uploadNewLaptop().then(() => refreshList(false));
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
      <Card style={{ width: '100%' }} title="Producto nuevo propio">
        <Form
          initialValues={{
            ...formInitial,
            cover: formInitial.images.cover,
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
                label="marca"
                name="marca"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un marca del producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                {...formItemLayout}
                label="modelo"
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
                label="Procesador (nombre corto)"
                name="shortMicro"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un shortMicro del producto'
                  }
                ]}
              >
                <Select
                  placeholder="Selecciona Procesador"
                  dropdownRender={menu => (
                    <SelectCustomizable
                      menu={menu}
                      type="shortMicro"
                      handleOption={handleOption}
                    />
                  )}
                >
                  {mapOptions(customSelect.shortMicro)}
                </Select>
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
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="estetica"
                name="estetica"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un estetica del producto'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="Tipo"
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un type del producto'
                  }
                ]}
              >
                <Select
                  placeholder="Selecciona tu tipo de laptop"
                  dropdownRender={menu => (
                    <SelectCustomizable
                      menu={menu}
                      type="laptopTypes"
                      handleOption={handleOption}
                    />
                  )}
                >
                  {mapOptions(customSelect.laptopTypes)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="OS"
                name="os"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un os del producto'
                  }
                ]}
              >
                <Select placeholder="Selecciona tu Sistema operativo">
                  <Option value="Windows 10 PRO">Windows 10 PRO</Option>
                  <Option value="Windows 10 Home">Windows 10 Home</Option>
                  <Option value="Windows 7 Ultimate">Windows 7 Ultimate</Option>
                  <Option value="Mac OS 10.14">Mac OS 10.14</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="recomendacion"
                name="recomendacion"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un recomendacion del producto'
                  }
                ]}
              >
                <Select placeholder="Selecciona tu recomendacion">
                  <Option value="Uso básico (office, pdf y navegación sin problema)">
                    Uso básico (office, pdf y navegación sin problema)
                  </Option>
                  <Option value="Uso moderado (2 o 3 programas simultaneos con buen rendimiento)">
                    Uso moderado (2 o 3 programas simultaneos con buen
                    rendimiento)
                  </Option>
                  <Option value="Uso avanzado (rendimiento excelente en casi cualquier programa)">
                    Uso avanzado (rendimiento excelente en casi cualquier
                    programa)
                  </Option>
                  <Option value="Uso rudo (excelente incluso en software pesado)">
                    Uso rudo (excelente incluso en software pesado)
                  </Option>
                  <Option value="Uso extremo (Rendimiento insuperable, te costará trabajo que se trabe)">
                    Uso extremo (Rendimiento insuperable, te costará trabajo que
                    se trabe)
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="Detalle o defecto"
                name="detalles"
                rules={[
                  {
                    required: true,
                    message:
                      'Por favor ingresa un Detalle o defecto del producto'
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="specs"
                name="specs"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un specs del producto'
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="ports"
                name="ports"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un ports del producto'
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="Características de rendimiento"
                name="rendimiento"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un rendimiento del producto'
                  }
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                {...formItemLayout}
                label="Características especiales"
                name="special"
              >
                <Input.TextArea />
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

export default FormOwnProducts;
