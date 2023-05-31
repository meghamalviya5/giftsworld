import { createContext, useState } from "react";
import axios from "axios";

const encodedToken = localStorage.getItem("token");

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  //const  initialState = {wishlist: []};
  const [wishlist, setWishlist] = useState([]);
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

  const valueProp = {
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
      await removeWishlistItem(item._id);
    },
  };
  return (
    <WishlistContext.Provider value={valueProp}>
      {children}
    </WishlistContext.Provider>
  );
};
