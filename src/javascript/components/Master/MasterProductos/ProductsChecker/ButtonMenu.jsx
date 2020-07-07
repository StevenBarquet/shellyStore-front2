// ---Dependencys
import React from 'react';
import { Row, Col } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// ---ComonComponents
import ButtonMlg from 'CommonComps/ButtonMlg';
// ---Components
// import AuthValidate from 'Comp/Master/AuthValidate';

// ------------------------------------------ COMPONENT -----------------------------------------
const ButtonMenu = props => {
  const { getAll } = props;
  return (
    <Row gutter={[10, 10]}>
      <Col xl={12}>
        <ButtonMlg
          label="Buscar cambios"
          onClick={getAll}
          variant="yellow"
          size="default"
          widthB="100%"
          icon={<PlusCircleOutlined />}
        />
      </Col>
      <Col xl={12}>
        <ButtonMlg
          label="Generar reporte"
          onClick={getAll}
          variant="blue"
          size="default"
          widthB="100%"
          icon={<PlusCircleOutlined />}
        />
      </Col>
      <Col xl={12}>
        <ButtonMlg
          label="Borrar de la base"
          onClick={getAll}
          variant="red"
          size="default"
          widthB="100%"
          icon={<PlusCircleOutlined />}
        />
      </Col>
      <Col xl={12}>
        <ButtonMlg
          label="Borrar de ésta lista"
          onClick={getAll}
          variant="purple"
          size="default"
          widthB="100%"
          icon={<PlusCircleOutlined />}
        />
      </Col>
    </Row>
  );
};

export default ButtonMenu;
