import { createContext, useReducer } from "react";
import { cartReducer } from "../reducer/CartReducer";
import axios from "axios";

const encodedToken = localStorage.getItem("token");

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = { cart: [], cartItems: 0 };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  console.log("hii in context: state:: ", state);

  const valueProp = {
    cart: state.cart,
    cartItems: state.cartItems,
    addToCart: async (item) => {
      try {
        const data = { product: item };
        //console.log("data json string : ", JSON.stringify(data));
        const response = await axios.post("/api/user/cart", data, {
          headers: {
            authorization: encodedToken,
          },
        });
        // console.log("token :  ", encodedToken);
        // console.log("response cart :  ", response.data.cart.length);
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
        //return { ...state, cart: response.data.cart };
        //return response.data.cart;
        dispatch({ type: "GET_CART_SUCCESS" });
      } catch (error) {
        console.log(error);
      }
    },
    //dispatch({ type: "GET_CART" }),
  };
  console.log("state.cartItems:: ", state.cartItems);
  console.log("valueprop:: ", valueProp.cartItems);
  console.log("initial.cartItems:: ", initialState.cartItems);

  return (
    <CartContext.Provider value={valueProp}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
