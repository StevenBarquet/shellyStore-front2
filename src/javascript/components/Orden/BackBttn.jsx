import React from 'react';
import { Row, Col } from 'antd';
import { BackwardOutlined } from '@ant-design/icons';
// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';

const BackBttn = props => {
  const { handleStep } = props;
  return (
    <Row>
      <Col md={4}>
        <div className="col-vertical-align">
          <ButtonMlg
            variant="yellow"
            size="small"
            onClick={handleStep}
            widthB="130px"
            label="Atrás"
            icon={<BackwardOutlined />}
          />
        </div>
      </Col>
    </Row>
  );
};

export default BackBttn;
