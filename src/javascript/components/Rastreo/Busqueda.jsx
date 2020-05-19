/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

// Other
import { isId } from 'Others/otherMethods';

const Busqueda = props => {
  const { pushURL } = props;

  // recibe el valor de un input y valida que no esté vació y que cumpla la regex isID
  function validate(rule, value) {
    if (!value || isId(value) === true) {
      return Promise.resolve();
    }
    return Promise.reject('Ingresa un ID válido');
  }

  // verifica que los campos "require" estén llenados
  function localSubmit(value) {
    pushURL('/rastreo?id:' + value.idPedido || '');
  }

  const formItemLayoutLong = {
    labelCol: { span: 12 },
    wrapperCol: { span: 11 }
  };
  return (
    <Row className="rastreo-search">
      {/* ----------------------------form------------------------- */}
      <Form style={{ width: '100%' }} onFinish={localSubmit}>
        <Row>
          <Col xl={16}>
            <Form.Item
              {...formItemLayoutLong}
              name="idPedido"
              label="ID"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa un ID de pedido'
                },
                { validator: validate }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={8}>
            {/* <Link to={'/rastreo?id:' + form.idPedido || ''}> */}
            <ButtonMlg
              variant="yellow"
              size="small"
              htmlType="submit"
              widthB="180px"
              label="Nueva búsqueda"
              icon={<LoginOutlined />}
            />
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

const RouterHandler = withRouter(props => {
  function pushURL(url) {
    props.history.push(url);
  }

  return <Busqueda pushURL={pushURL} />;
});

export default RouterHandler;
