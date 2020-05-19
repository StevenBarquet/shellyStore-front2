import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
// Others
import { priceFormat } from 'Others/otherMethods';

// CommonComps
import FitImg from 'CommonComps/FitImg';

const ProductsItem = props => {
  const {
    _id,
    marca,
    modelo,
    type,
    precio,
    cover,
    shortMicro,
    disponibles
  } = props;
  return (
    <Col align="middle" xs={24} sm={24} lg={8}>
      <Link to={'/item=' + _id}>
        <div className="search-item-container">
          <div className="search-item-header">
            {marca + ' '}
            <span>{modelo}</span>
          </div>
          <Row>
            <Col className="search-item-special" span={10}>
              {type !== 'normal' && <React.Fragment>{type}</React.Fragment>}
            </Col>
            <Col className="search-item-price" span={10}>
              {priceFormat(precio)}
            </Col>
          </Row>
          <FitImg
            srcImg={cover}
            estilo="search-item-img-container"
            alt={marca + ' ' + modelo}
          />
          <div className="search-item-belt">{shortMicro}</div>
          <div className="search-item-left">
            Disponibles: <span>{disponibles}</span>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default ProductsItem;
