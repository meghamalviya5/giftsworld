import { createContext, useContext, useReducer, useState } from "react";
import { cartReducer } from "../reducer/CartReducer";
import axios from "axios";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GiftContext } from "./GiftContext";

const encodedToken = localStorage.getItem("token");

export const CartWishlistContext = createContext();

const CartWishlistProvider = ({ children }) => {
  const { allGifts } = useContext(GiftContext);
  const [wishlist, setWishlist] = useState([]);
  //const [totalDiscount, setTotalDiscount] = useState(0);

  const initialState = {
    cart: [],
    addressModalStatus: false,
  };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const numberOfCartItems = state.cart.reduce(
    (count, { qty }) => count + qty,
    0
  );

  const totalPrice = state.cart.reduce(
    (totalPrice, { price, qty }) => totalPrice + price * qty,
    0
  );

  const totalDiscount = state.cart.reduce(
    (total, { price, discount, qty }) =>
      total + Math.floor((price * discount) / 100) * qty,
    0
  );

  console.log("totalDiscount = ", totalDiscount);
  const removeWishlistItem = async (productId) => {
    const url = `/api/user/wishlist/${productId}`;
    const response = await axios.delete(url, {
      headers: {
        authorization: encodedToken,
      },
    });
    setWishlist(response.data.wishlist);
    toast.success("Removed Item to Wishlist");
  };

  const addWishlistItem = async (item) => {
    try {
      const url = "/api/user/wishlist";
      const data = { product: item };
      const response = await axios.post(url, data, {
        headers: {
          authorization: encodedToken,
        },
      });
      setWishlist(response.data.wishlist);
      toast.success("Added Item to Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  const findInWishlist = (itemId) =>
    wishlist.find((item) => item._id === itemId);

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
      toast.success("Removed Item to Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const addCartItem = async (item) => {
    try {
      const data = { product: item };
      console.log("json string : ", JSON.stringify(item));
      const response = await axios.post("/api/user/cart", data, {
        headers: {
          authorization: encodedToken,
        },
      });
      dispatch({ type: "ADD_TO_CART_SUCCESS", payload: response.data.cart });
      toast.success("Added Item to Cart");
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCartItemQuantity = async (productId) => {
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
      toast.success("Item quantity increased successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const findInCart = (itemId) =>
    state.cart.find((cartItem) => cartItem._id === itemId);

  const valueProp = {
    state,
    dispatch,
    findInWishlist,
    wishlist,
    findInCart,
    numberOfCartItems,
    totalPrice,
    totalDiscount,
    cart: state.cart,
    cartItems: state.cartItems,
    addToWishlist: async (item) => await addWishlistItem(item),
    removeFromWishlist: async (productId) =>
      await removeWishlistItem(productId),
    moveToCart: async (item) => {
      const checkInCart = state.cart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (!checkInCart) {
        const selectedItem = allGifts.find(
          (giftItem) => giftItem._id === item._id
        );
        await addCartItem(selectedItem);
        // await removeWishlistItem(item._id);
      } else {
        increaseCartItemQuantity(item._id);
      }
    },

    addToCart: async (item) => await addCartItem(item),
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
    itemQuantityIncrement: async (productId) =>
      await increaseCartItemQuantity(productId),
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
          toast.success("Item quantity decreased successfully!");
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
      await addWishlistItem(itemToAdd);
      await removeCartItem(cartItem._id);
    },
  };

  return (
    <CartWishlistContext.Provider value={valueProp}>
      {children}
    </CartWishlistContext.Provider>
  );
};

export default CartWishlistProvider;
