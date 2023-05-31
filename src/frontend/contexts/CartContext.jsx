import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/CartReducer";
import axios from "axios";
import { WishlistContext } from "./WishlistContext";
import { GiftContext } from "./GiftContext";

const encodedToken = localStorage.getItem("token");

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { addToWishlist } = useContext(WishlistContext);
  const { allGifts } = useContext(GiftContext);
  const initialState = { cart: [] };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  console.log("hii in context: state:: ", state);
  const removeCartItem = async (productId) => {
    console.log("removeFromCart cartcontext id, ", productId);
    try {
      const url = `/api/user/cart/${productId}`;
      const response = await axios.delete(url, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({ type: "REMOVE_FROM_CART", payload: response.data.cart });
    } catch (error) {
      console.log(error);
    }
  };

  const valueProp = {
    cart: state.cart,
    cartItems: state.cartItems,
    addToCart: async (item) => {
      try {
        const data = { product: item };
        console.log("json string : ", JSON.stringify(item));
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
    itemQuantityIncrement: async (productId) => {
      try {
        const url = `/api/user/cart/${productId}`;
        const data = { action: { type: "increment" } };
        const response = await axios.post(url, data, {
          headers: {
            authorization: encodedToken,
          },
        });
        dispatch({
          type: "CART_ITEM_QUANTITY_INCREMENT",
          payload: response.data.cart,
        });
      } catch (error) {
        console.log(error);
      }
    },
    itemQuantityDecrement: async (cartItem) => {
      if (cartItem.qty > 1) {
        try {
          const url = `/api/user/cart/${cartItem._id}`;
          const data = { action: { type: "decrement" } };

          const response = await axios.post(url, data, {
            headers: {
              authorization: encodedToken,
            },
          });
          dispatch({
            type: "CART_ITEM_QUANTITY_DECREMENT",
            payload: response.data.cart,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        await removeCartItem(cartItem._id);
      }
    },
    removeFromCart: async (productId) => await removeCartItem(productId),
    moveToWishlist: async (cartItem) => {
      const itemToAdd = allGifts.find((item) => item._id === cartItem._id);
      await addToWishlist(itemToAdd);
      await removeCartItem(cartItem._id);
    },
  };

  return (
    <CartContext.Provider value={valueProp}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
