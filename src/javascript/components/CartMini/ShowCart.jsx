import React from 'react';
import {
  ShoppingOutlined,
  ShrinkOutlined,
  WarningOutlined
} from '@ant-design/icons';

// Components
import MiniCartList from 'Comp/CartMini/MiniCartList';

// CommonComps
import ButtonMlg from 'CommonComps/ButtonMlg';
import InvisibleButton from 'CommonComps/InvisibleButton';

const ShowCart = props => {
  const {
    handleShow,
    items,
    confirmDelete,
    updatePiezas,
    toOrden,
    confirmEmpty
  } = props;
  return (
    <React.Fragment>
      <div className="show-mini-cart">
        <div className="nav-btn">
          <ButtonMlg
            onClick={handleShow}
            label="Ocultar"
            variant="transparent-white"
            size="big"
            icon={<ShrinkOutlined />}
            widthB="96%"
          />
        </div>
        <div className="mini-cart-list-container">
          {items.length === 0 && <h4>No tienes productos en tu carrito</h4>}
          {items.map(item => {
            // console.log(`ReMap, Item: ${item.title}`, item);
            return (
              <MiniCartList
                key={item._id}
                updatePiezas={updatePiezas}
                confirmDelete={confirmDelete}
                item={item}
              />
            );
          })}
        </div>
        <div className="clear-button ">
          <ButtonMlg
            onClick={confirmEmpty}
            label="vaciar"
            variant="red"
            size="small"
            widthB="60%"
            icon={<WarningOutlined />}
          />
        </div>
        <div className="nav-btn">
          <ButtonMlg
            onClick={toOrden}
            label="Comprar ahora"
            variant="transparent-white"
            size="default"
            widthB="96%"
            icon={<ShoppingOutlined />}
          />
        </div>
      </div>
      <InvisibleButton callback={handleShow} />
    </React.Fragment>
  );
};

export default ShowCart;
