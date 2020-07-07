// ---Dependencys
import React from 'react';
import { Input, Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';
// ------------------------------------------ COMPONENT -----------------------------------------
const AddProducts = props => {
  const { onAddOwnProduct, onAddMLProduct, onChangeML } = props;
  function inputChange(event) {
    onChangeML(event.target.value);
  }
  return (
    <React.Fragment>
      <ButtonMlg
        label="Agregar producto"
        onClick={onAddOwnProduct}
        variant="purple"
        size="default"
        widthB="100%"
        icon={<PlusCircleOutlined />}
      />
      <Row>
        <Col xl={12}>
          <Input
            placeholder="url o ID del producto de ML"
            onChange={inputChange}
            style={{ marginTop: '15px' }}
          />
        </Col>
        <Col xl={12}>
          <ButtonMlg
            label="Agregar desde Mercado Libre"
            onClick={onAddMLProduct}
            variant="yellow"
            size="default"
            widthB="100%"
            icon={<PlusCircleOutlined />}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddProducts;
