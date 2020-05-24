import React, { useState, useEffect } from 'react';
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

  useEffect(setPromoCols, []);

  const [state, setState] = useState({
    promo: 0,
    specialSpan: 10,
    priceSpan: 10
  });

  function setPromoCols() {
    if (type.length > 3 && type[3] === '%') {
      const promo = parseInt(type[1] + type[2]);
      const oldPrice = precio * (1 + promo / 100);
      setState({
        promo,
        oldPrice,
        specialSpan: 3,
        priceSpan: 8
      });
    }
  }

  return (
    <Col align="middle" xs={24} sm={24} lg={8}>
      <Link to={'/item=' + _id}>
        <div className="search-item-container">
          <div className="search-item-header">
            {marca + ' '}
            <span>{modelo}</span>
          </div>
          <Row>
            <Col className="search-item-special" span={state.specialSpan}>
              {type !== 'normal' && <React.Fragment>{type}</React.Fragment>}
            </Col>
            {state.promo !== 0 && (
              <Col className="search-item-price-promo" span={8}>
                {priceFormat(state.oldPrice)}
              </Col>
            )}
            <Col className="search-item-price" span={state.priceSpan}>
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
