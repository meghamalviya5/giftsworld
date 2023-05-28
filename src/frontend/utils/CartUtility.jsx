import axios from "axios";

const encodedToken = localStorage.getItem("token");

export const addToCart1 = async (state, item) => {
  try {
    const data = { product: item };
    console.log("data json string : ", JSON.stringify(data));
    const response = await axios.post("/api/user/cart", data, {
      headers: {
        authorization: encodedToken,
      },
    });
    console.log("token :  ", encodedToken);
    console.log("response cart :  ", response.data.cart.length);
    return {
      ...state,
      cart: response.data.cart,
      cartItems: response.data.cart.length,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (state) => {
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
    return response.data.cart;
  } catch (error) {
    console.log(error);
  }
};
