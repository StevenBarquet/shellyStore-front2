import React from 'react';
import { Row } from 'antd';

// Components
import ProductsItem from 'Comp/Productos/ProductsItem';

const MapProduct = props => {
  const { currentList } = props;
  return (
    <Row className="items-comtainer" gutter={[30, 20]}>
      {currentList &&
        currentList.length > 0 &&
        currentList.map(element => {
          const {
            _id,
            marca,
            modelo,
            type,
            precio,
            images,
            shortMicro,
            disponibles
          } = element;
          return (
            <ProductsItem
              _id={_id}
              marca={marca}
              modelo={modelo}
              type={type}
              precio={precio}
              cover={images.cover}
              shortMicro={shortMicro}
              disponibles={disponibles}
            />
          );
        })}
    </Row>
  );
};

export default MapProduct;
