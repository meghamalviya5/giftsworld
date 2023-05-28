import { addToCart, getCart } from "../utils/CartUtility";

console.log("in cart reducer");

// const addToCart = async (state, item) => {
//   try {
//     const data = { product: item };
//     console.log("data json string : ", JSON.stringify(data));
//     const response = await axios.post("/api/user/cart", data, {
//       headers: {
//         authorization: encodedToken,
//       },
//     });
//     console.log("token :  ", encodedToken);
//     console.log("response cart :  ", response.data.cart.length);
//     dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data.cart });
//     // return {
//     //   ...state,
//     //   cart: response.data.cart,
//     //   cartItems: response.data.cart.length,
//     // };
//   } catch (error) {
//     console.log(error);
//   }
// };

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        cart: action.payload,
        cartItems: action.payload.length,
      };
    //return addToCart1(state, action.payload);
    case "GET_CART_SUCCESS":
      return { ...state, cart: action.payload };
    //const cartItems = getCart(state);
    //return { ...state, cart: { ...state.cart, ...cartItems } };
    //return getCart(state);
    case "REMOVE_FROM_CART":
      break;

    default:
      return state;
  }
};
