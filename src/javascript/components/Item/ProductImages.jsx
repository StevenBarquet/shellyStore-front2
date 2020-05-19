import React, { useState } from 'react';
import { Row, Col } from 'antd';

// CommonComps
import FitImg from 'CommonComps/FitImg';

const ProductImages = props => {
  const { images, title } = props;
  const [main, setMain] = useState(images.cover);
  const array = [images.cover].concat(images.extra);
  const mapExtraImages = () => {
    if (array.length !== 0) {
      return array.map(element => {
        return (
          <Row>
            <FitImg
              srcImg={element}
              estilo="cover-cont cover-cont-small"
              onClick={() => {
                setMain(element);
              }}
              alt={title}
            />
          </Row>
        );
      });
    }
    return null;
  };
  return (
    <Row>
      <Col sm={6}>{mapExtraImages()}</Col>
      <Col sm={18}>
        <FitImg srcImg={main} estilo="cover-cont cover-cont-big" alt={title} />
      </Col>
    </Row>
  );
};

export default ProductImages;
