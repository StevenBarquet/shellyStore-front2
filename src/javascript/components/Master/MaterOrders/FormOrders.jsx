// ---Dependencys
import React, { useState } from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Select } from 'antd';
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
import ModalNotification from 'CommonComps/ModalNotification';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const formItemLayoutLong = {
  labelCol: { span: 12 },
  wrapperCol: { span: 11 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const FormOrders = props => {
  const [disable, setDisable] = useState(false);
  const {
    onCloseForm,
    handleForm,
    uploadNewLaptop,
    refreshLaptops,
    formInitial,
    editLaptop,
    isEdit
  } = props;

  function onFinish() {
    // console.log('onFinish: ', values);
    setDisable(true);
    if (isEdit) {
      editLaptop().then(response => {
        console.log('debuging isEdit: ', response);
        ModalNotification(
          1,
          'Notificación',
          'Producto cargado exitosamente :)'
        );
        setDisable(false);
        refreshLaptops().then(() => {
          onCloseForm();
        });
      });
    } else {
      uploadNewLaptop().then(() => {
        ModalNotification(
          1,
          'Notificación',
          'Producto cargado exitosamente :)'
        );
        setDisable(false);
        refreshLaptops();
      });
    }
  }

  function onFormChange(values) {
    handleForm(values);
  }

  return (
    <div className="new-prod">
      <Card style={{ width: '90%' }} title={formInitial._id}>
        <Form
          initialValues={formInitial}
          onValuesChange={onFormChange}
          onFinish={onFinish}
        >
          <Row gutter={[5, 10]}>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="Estatus"
                name="estatus"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un estatus del producto'
                  }
                ]}
              >
                <Select placeholder="Selecciona tu tipo de laptop">
                  <Option value="pago:Cancelado">pago:Cancelado</Option>
                  <Option value="pago:Pendiente">pago:Pendiente</Option>
                  <Option value="pago:Pre-Confirmado">
                    pago:Pre-Confirmado
                  </Option>
                  <Option value="empaque:En proceso/En revisión">
                    empaque:En proceso/En revisión
                  </Option>
                  <Option value="envio:En proceso/En revisión">
                    envio:En proceso/En revisión
                  </Option>
                  <Option value="finish:En proceso/En revisión">
                    finish:En proceso/En revisión
                  </Option>
                </Select>
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

export default FormOrders;
