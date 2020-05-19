// ---Dependencys
import React from 'react';
import { Form, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};
const formItemLayoutLong = {
  labelCol: { span: 12 },
  wrapperCol: { span: 11 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const PiezasForm = props => {
  const { max, longName, callback } = props;

  function onFormChange(value) {
    // console.log('PiezasForm\n', value);
    callback(value);
  }

  return (
    <Form initialValues={{ piezas: 1 }} onValuesChange={onFormChange}>
      <Form.Item
        labelCol={
          longName ? formItemLayoutLong.labelCol : formItemLayout.labelCol
        }
        wrapperCol={
          longName ? formItemLayoutLong.wrapperCol : formItemLayout.wrapperCol
        }
        name="piezas"
        label="Piezas"
        validateStatus="erro"
        help={`Máximas piezas disponibles: ${max}`}
      >
        <InputNumber min={1} max={max} />
      </Form.Item>
    </Form>
  );
};

export default PiezasForm;
