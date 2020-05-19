// ---Dependencys
import React from 'react';
import { Carousel } from 'antd';
// ---Media
import c1 from 'Images/c1.png';
import c2 from 'Images/c2.png';
import c3 from 'Images/c3.png';

// ------------------------------------------ COMPONENT-----------------------------------------
const RoundCarousel = () => {
  return (
    <React.Fragment>
      <div className="border-round">
        <div className="carousel-cont">
          <Carousel autoplay effect="fade" dotPosition="left">
            <div>
              <img src={c1} width="236px" alt="vmo" />
            </div>
            <div>
              <img src={c2} width="236px" alt="vmo" />
            </div>
            <div>
              <img src={c3} width="236px" alt="vmo" />
            </div>
          </Carousel>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RoundCarousel;
