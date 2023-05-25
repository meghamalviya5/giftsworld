import { addToCart, getCart } from "../utils/CartUtility";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      addToCart(action.payload);
      break;
    case "GET_CART":
      const cartItems = getCart();
      return { ...state, cart: { ...state.cart, ...cartItems } };
    case "REMOVE_FROM_CART":
      break;

    default:
      return state;
  }
};
