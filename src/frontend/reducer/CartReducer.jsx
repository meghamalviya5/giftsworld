console.log("in cart reducer");

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        cart: action.payload,
      };
    case "GET_CART_SUCCESS":
      return { ...state, cart: action.payload };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "CART_ITEM_QUANTITY_INCREMENT":
      // const updatedCart = [...state.cart].map((cartItem) => {
      //   if (cartItem.name === action.payload) {
      //     console.log(cartItem.name, "  ===cartItem.name");
      //     console.log(action.payload, "  ===action.payload");
      //     console.log(cartItem.qty, "  ===cartItem.qty");
      //     cartItem.qty = cartItem.qty + 1;
      //     console.log(cartItem.qty, "  ===cartItem.qty");
      //   }
      //    return cartItem;
      // });
      // return { ...state, cart: updatedCart };

      //worked
      // const updatedCart = state.cart.map((cartItem) => {
      //   if (cartItem.name === action.payload) {
      //     return { ...cartItem, qty: Number(cartItem.qty) + 1 };
      //   } else return cartItem;
      // });
      // return { ...state, cart: updatedCart };

      return { ...state, cart: action.payload };
    case "CART_ITEM_QUANTITY_DECREMENT":
      // const updatedItem = state.cart.map((cartItem) => {
      //   if (cartItem.name === action.payload && cartItem.qty > 1)
      //     --cartItem.qty;
      //   return cartItem;
      // });
      // return { ...state, cart: updatedItem };
      return { ...state, cart: action.payload };
    case "UPDATE_CART_ITEMS":
      const updatedCartItem = state.cart.map((cartItem) => {
        console.log("action:: ", action.payload.event.target.value);
        if (cartItem.name === action.payload && cartItem.qty >= 1)
          cartItem.qty = Number(action.payload.event.target.value);
        return cartItem;
      });
      return { ...state, cart: updatedCartItem };
    default:
      return state;
  }
};
