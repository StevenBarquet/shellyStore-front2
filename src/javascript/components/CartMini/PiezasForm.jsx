// ---Dependencys
import React from 'react';
import { Form, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const PiezasForm = props => {
  const { max, id, callback, defaultValue } = props;

  function onFormChange(objValue) {
    const value = Object.values(objValue)[0];
    callback(id, value);
  }

  return (
    <Form
      initialValues={{ piezas: defaultValue }}
      onValuesChange={onFormChange}
    >
      <Form.Item {...formItemLayout} name="piezas">
        <InputNumber min={1} max={max} />
      </Form.Item>
    </Form>
  );
};

export default PiezasForm;
