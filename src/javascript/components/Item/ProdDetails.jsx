import React from 'react';
import { Row, Col } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
// Comp
import PiezasForm from 'Comp/Item/PiezasForm';
// Others
import { priceFormat } from 'Others/otherMethods';

const ProdDetails = props => {
  const { data, comprar, setProductCache, getPiezas } = props;
  const {
    detalles,
    type,
    precio,
    garantia,
    os,
    disponibles,
    estetica,
    recomendacion,
    shortMicro
  } = data;
  if (os) {
    // --------- Version para Laptops
    return (
      <Row gutter={[0, 6]} className="prod-details">
        <Col sm={24}>
          <ButtonMlg
            onClick={comprar}
            label="Comprar ahora"
            variant="blue"
            size="big"
            icon={<ShoppingOutlined />}
            widthB="280px"
          />
        </Col>
        <Col sm={24}>
          <ButtonMlg
            label="Agregar al carrito"
            variant="yellow"
            size="big"
            onClick={() => setProductCache(true)}
            icon={<ShoppingCartOutlined />}
            widthB="280px"
          />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <div className="precio-product">{priceFormat(precio)}</div>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <PiezasForm callback={getPiezas} max={disponibles} />
        </Col>
        <Col sm={8}>
          <h6>
            Garantía: <span>{garantia}</span>
          </h6>
        </Col>
        <Col sm={16}>
          <h6>
            Sistema Operativo: <span>{os}</span>
          </h6>
        </Col>
        <Col xs={24} sm={24} lg={24}>
          <h6>
            Estética: <span>{estetica}</span>
          </h6>
        </Col>
        <Col sm={24}>
          <h6>
            Defecto o problema: <span>{detalles}</span>
          </h6>
        </Col>
        <Col sm={24}>
          <h6>
            Recomendado para: <span>{recomendacion}</span>
          </h6>
        </Col>
        {type !== 'normal' && (
          <Col sm={24}>
            <h5>
              Característica especial: <span>{type}</span>
            </h5>
          </Col>
        )}
      </Row>
    );
  }
  // ---------- Version para otros Productos
  return (
    <Row gutter={[0, 6]} className="prod-details">
      <Col sm={24}>
        <ButtonMlg
          onClick={comprar}
          label="Comprar ahora"
          variant="blue"
          size="big"
          icon={<ShoppingOutlined />}
          widthB="280px"
        />
      </Col>
      <Col sm={24}>
        <ButtonMlg
          label="Agregar al carrito"
          variant="yellow"
          size="big"
          onClick={() => setProductCache(true)}
          icon={<ShoppingCartOutlined />}
          widthB="280px"
        />
      </Col>
      <Col xs={24} sm={24} lg={12}>
        <div className="precio-product">{priceFormat(precio)}</div>
      </Col>
      <Col xs={24} sm={24} lg={12}>
        <PiezasForm callback={getPiezas} max={disponibles} />
      </Col>
      <Col span={24}>
        <h6>
          Garantía: <span>{garantia}</span>
        </h6>
      </Col>
      <Col xs={24} sm={24} lg={24}>
        <h6>
          Tipo de Artículo: <span>{shortMicro}</span>
        </h6>
      </Col>
      {type !== 'normal' && (
        <Col sm={24}>
          <h5>
            Característica especial: <span>{type}</span>
          </h5>
        </Col>
      )}
    </Row>
  );
};

export default ProdDetails;
