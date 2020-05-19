import {
  GET_ITEMS,
  DELETE_ONE,
  UPDATE_ONE,
  NEED_UPDATE,
  MINI_UPDATE,
  EMPTY_CART
} from 'Types/Cart';

const INITIAL_STATE = {
  items: [],
  isUpdated: false,
  miniCartUpdated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isUpdated: true
      };

    case DELETE_ONE:
      return {
        ...state,
        items: action.payload,
        isUpdated: false
      };

    case UPDATE_ONE:
      return {
        ...state,
        items: action.payload,
        isUpdated: false
      };

    case NEED_UPDATE:
      return {
        ...state,
        isUpdated: false
      };

    case EMPTY_CART:
      return {
        ...state,
        items: [],
        miniCartUpdated: false
      };

    case MINI_UPDATE:
      return {
        ...state,
        miniCartUpdated: action.payload
      };

    default:
      return state;
  }
};
