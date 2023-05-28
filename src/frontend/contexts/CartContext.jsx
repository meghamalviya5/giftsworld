import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/CartReducer";
import axios from "axios";

const encodedToken = localStorage.getItem("token");

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = { cart: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  console.log("hii in context: state:: ", state);

  const valueProp = {
    cart: state.cart,
    cartItems: state.cartItems,
    addToCart: async (item) => {
      try {
        const data = { product: item };
        const response = await axios.post("/api/user/cart", data, {
          headers: {
            authorization: encodedToken,
          },
        });
        dispatch({ type: "ADD_TO_CART_SUCCESS", payload: response.data.cart });
      } catch (error) {
        console.log(error);
      }
    },
    getCart: async () => {
      try {
        const response = await axios.get(
          "/api/user/cart",
          {},
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        dispatch({ type: "GET_CART_SUCCESS", payload: response.data.cart });
      } catch (error) {
        console.log(error);
      }
    },
    itemQuantityIncrement: (itemName) => {
      dispatch({ type: "CART_ITEM_QUANTITY_INCREMENT", payload: itemName });
      // const itemInCart = state.cart.find(
      //   (cartItem) => cartItem.name === itemName
      // );
    },
    itemQuantityDecrement: (itemName) => {
      dispatch({ type: "CART_ITEM_QUANTITY_DECREMENT", payload: itemName });
    },
    updateCartItems: (e, itemName) => {
      console.log(e, " ee  == updatecartitems :: ", itemName);
      dispatch({
        type: "UPDATE_CART_ITEMS",
        payload: { event: e, name: itemName },
      });
    },
    removeFromCart: async (productId) => {
      console.log("removeFromCart cartcontext id, ", productId);
      try {
        const response = await axios.delete(
          `/api/user/cart/${productId}`,
          {},
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );
        dispatch({ type: "REMOVE_FROM_CART", payload: response.data.cart });
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <CartContext.Provider value={valueProp}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
