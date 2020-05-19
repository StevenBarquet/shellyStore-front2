import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const ProdSpecs = props => {
  const { title, text, tooltip } = props;
  return (
    <div className="prod-specs">
      <h6>
        {title}&nbsp;
        {tooltip && (
          <Tooltip title={tooltip}>
            <QuestionCircleOutlined />
          </Tooltip>
        )}
      </h6>
      <p>{text}</p>
    </div>
  );
};

export default ProdSpecs;
