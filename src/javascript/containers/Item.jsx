/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal } from 'antd';
import { withRouter } from 'react-router-dom';

// Comp
import ProductImages from 'Comp/Item/ProductImages';
import ProdDetails from 'Comp/Item/ProdDetails';
import ProdSpecs from 'Comp/Item/ProdSpecs';

// CommonComps
import LoadingScreen from 'CommonComps/LoadingScreen';

// Others
import { copyToEnd, findIndexArrayObj } from 'Others/otherMethods';
import { contactLink } from 'Others/labels.json';

// Functions
import { getLaptopPublic } from 'Others/peticiones';
import { connect } from 'react-redux';
// Actions from redux
import { getCart, startUpdating, startUpdateMiniCart } from 'Actions/Cart';

const Item = withRouter(props => {
  const [product, setProduct] = useState(null);
  const { updateCartRedux, startUpdatingRedux } = props; // All from redux

  function countDownModal(titulo, mensaje) {
    const secondsToGo = 2;
    const modal = Modal.success({
      title: titulo,
      content: mensaje
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  const onGetData = () => {
    const current = props.location.pathname;
    const id = copyToEnd(current, 6);
    getLaptopPublic(id).then(response => {
      setProduct({ ...response.data, piezas: 1 });
    });
  };

  const getPiezas = obj => {
    setProduct({ ...product, ...obj });
  };

  const setProductCache = showModals => {
    let currentCart = localStorage.getItem('cart');
    const { images, marca, modelo, disponibles, _id, precio, piezas } = product;
    const item = {
      title: `${marca} ${modelo}`,
      piezas,
      cover: images.cover,
      disponibles,
      _id,
      precio
    };
    if (currentCart) {
      currentCart = JSON.parse(currentCart);
      const repeated = findIndexArrayObj(currentCart, { _id });

      // si no está repetido el producto
      if (repeated === -1) {
        startUpdatingRedux();
        startUpdateMiniCart(false);
        currentCart.push(item);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        setTimeout(() => {
          updateCartRedux();
        }, 300);
        if (showModals) {
          const mensaje = 'Agregaste ' + item.title + ' al carrito :D';
          countDownModal('Exito', mensaje);
        }
      } else if (showModals) {
        const mensaje = 'Éste producto ya se encuentra en el carrito :D';
        countDownModal('Repetido', mensaje);
      }
    } else {
      currentCart = [item];
      console.log('cart local storage: ', currentCart);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }
  };

  const comprar = () => {
    const { history } = props;
    setProductCache(false);
    history.push('/orden');
  };

  useEffect(() => {
    onGetData();
  }, []);

  if (!product) {
    return <LoadingScreen />;
  }
  return (
    <div className="product-container">
      <h4>
        {product.marca} <span>{product.modelo}</span>
      </h4>
      <Row>
        <Col xl={12} allign="middle">
          <ProductImages
            images={product.images}
            title={product.marca + ' ' + product.modelo}
          />
        </Col>
        <Col xl={12} allign="middle">
          <ProdDetails
            comprar={comprar}
            getPiezas={getPiezas}
            data={product}
            setProductCache={setProductCache}
          />
        </Col>
      </Row>
      <Row>
        <Card className="specs-card">
          <Row>
            <Col offset={1} xl={11}>
              <ProdSpecs
                title="Características de rendimiento "
                tooltip="La velocidad y rendimiento de tu equipo depende de éstas características"
                text={product.rendimiento}
              />
            </Col>
            <Col offset={1} xl={11}>
              <ProdSpecs
                title="Características generales"
                text={product.specs}
              />
            </Col>
            <Col offset={1} xl={11}>
              <ProdSpecs title="Puertos" text={product.ports} />
            </Col>
            <Col offset={1} xl={11}>
              {' '}
              {product.special && product.special !== '' && (
                <ProdSpecs
                  title="Características especiales"
                  tooltip="Algunas características sobresalientes acerca de éste equipo"
                  text={product.special}
                />
              )}
            </Col>
          </Row>
          <Row>
            <p>
              ¿Tienes dudas o necesitas orientación? Mensaje{' '}
              <a href={contactLink} target="_blank" rel="noopener noreferrer">
                aquí :D
              </a>
            </p>
          </Row>
        </Card>
      </Row>
    </div>
  );
});

const mapStateToProps = reducers => {
  return {
    reduxCart: reducers.cartReducer
  };
};

const mapDispatchToProps = dispatch => ({
  updateCartRedux: () => dispatch(getCart()),
  startUpdatingRedux: () => dispatch(startUpdating()),
  updatedMiniCartRedux: flag => dispatch(startUpdateMiniCart(flag))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
