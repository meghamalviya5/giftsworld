import { createContext, useContext, useState } from "react";
import axios from "axios";
import { GiftContext } from "./GiftContext";
import { CartContext } from "./CartContext";

const encodedToken = localStorage.getItem("token");

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  //const  initialState = {wishlist: []};
  const [wishlist, setWishlist] = useState([]);
  const { allGifts } = useContext(GiftContext);
  // const { addToCart } = useContext(CartContext);
  console.log("in wishlistContext");

  const removeWishlistItem = async (productId) => {
    const url = `/api/user/wishlist/${productId}`;
    const response = await axios.delete(url, {
      headers: {
        authorization: encodedToken,
      },
    });
    setWishlist(response.data.wishlist);
  };

  const findInWishlist = (itemId) =>
    wishlist.find((item) => item._id === itemId);

  const valueProp = {
    findInWishlist,
    wishlist,
    addToWishlist: async (item) => {
      try {
        const url = "/api/user/wishlist";
        const data = { product: item };
        const response = await axios.post(url, data, {
          headers: {
            authorization: encodedToken,
          },
        });
        setWishlist(response.data.wishlist);
      } catch (error) {
        console.log(error);
      }
    },
    removeFromWishlist: async (productId) => {
      await removeWishlistItem(productId);
    },
    moveToCart: async (item) => {
      const selectedItem = allGifts.find(
        (giftItem) => giftItem._id === item._id
      );
      //  await addToCart(selectedItem);
      await removeWishlistItem(item._id);
    },
  };
  return (
    <WishlistContext.Provider value={valueProp}>
      {children}
    </WishlistContext.Provider>
  );
};
