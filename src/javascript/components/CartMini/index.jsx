import React from 'react';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const MiniCart = props => {
  const { handleShow, badgeNum } = props;
  return (
    <button type="button" onClick={handleShow} className="mini-cart">
      <Badge count={badgeNum}>
        <ShoppingCartOutlined />
      </Badge>
    </button>
  );
};

export default MiniCart;
