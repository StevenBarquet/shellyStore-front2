// ---Dependencys
import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';
// ------------------------------------------ COMPONENT -----------------------------------------
const AddProducts = props => {
  const { onAddOwnProduct, onAddMLProduct } = props;
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
      <ButtonMlg
        label="Agregar desde Mercado Libre"
        onClick={onAddMLProduct}
        variant="yellow"
        size="default"
        widthB="100%"
        icon={<PlusCircleOutlined />}
      />
    </React.Fragment>
  );
};

export default AddProducts;
