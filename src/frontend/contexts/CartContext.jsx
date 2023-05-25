import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/CartReducer";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = { cart: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);
  console.log("hii in context");
  const valueProp = {
    cart: state.cart,
    addToCart: (giftItem) =>
      dispatch({ type: "ADD_TO_CART", payload: giftItem }),
    getCart: () => dispatch({ type: "GET_CART" }),
  };
  return (
    <CartContext.Provider value={valueProp}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
