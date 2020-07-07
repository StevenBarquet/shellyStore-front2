import {
  GET_ITEMS,
  DELETE_ONE,
  UPDATE_ONE,
  NEED_UPDATE,
  MINI_UPDATE,
  EMPTY_CART
} from 'Types/Cart';
// Others
import { findIndexArrayObj } from 'Others/otherMethods';

export const getCart = () => dispatch => {
  let currentCart = localStorage.getItem('cart');
  if (currentCart) {
    currentCart = JSON.parse(currentCart);
  } else {
    currentCart = [];
  }

  dispatch({
    type: GET_ITEMS,
    payload: currentCart
  });
};

export const emptyCart = () => dispatch => {
  console.log('entró emptyCart');
  localStorage.setItem('cart', JSON.stringify([]));

  dispatch({
    type: EMPTY_CART
  });
};

export const updateOneInCart = (items, idString, updatedObj) => dispatch => {
  const idIndex = findIndexArrayObj(items, { id: idString });
  const currentCart = items;
  currentCart[idIndex] = { ...currentCart[idIndex], ...updatedObj };
  console.log('entró updateOneInCart', currentCart[idIndex]);
  localStorage.setItem('cart', JSON.stringify(currentCart));

  dispatch({
    type: UPDATE_ONE,
    payload: currentCart
  });
  return currentCart[idIndex];
};

export const deleteOneInCart = (items, idString) => dispatch => {
  console.log('entró deleteOneInCart');
  const idIndex = findIndexArrayObj(items, { id: idString });
  const currentCart = items;
  const deletedItem = currentCart[idIndex];
  currentCart.splice(idIndex, 1); // Elimina 1 elemento del array en el index seleccionado
  localStorage.setItem('cart', JSON.stringify(currentCart));

  dispatch({
    type: DELETE_ONE,
    payload: currentCart
  });
  return deletedItem;
};

export const startUpdateMiniCart = flag => dispatch => {
  dispatch({
    type: MINI_UPDATE,
    payload: flag
  });
};

export const startUpdating = () => dispatch => {
  dispatch({
    type: NEED_UPDATE
  });
};
