import axios from "axios";

export const addToCart = async (item) => {
  try {
    const response = await axios.post("/api/user/cart", item, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: process.REACT_APP_JWT_SECRET,
      },
    });
    return response.data.cart;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async () => {
  try {
    const response = await axios.get(
      "/api/user/cart",
      {},
      {
        headers: {
          Accept: "application/json",
          authorization: process.REACT_APP_JWT_SECRET,
        },
      }
    );
    return response.data.cart;
  } catch (error) {
    console.log(error);
  }
};
