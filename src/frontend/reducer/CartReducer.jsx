console.log("in cart reducer");

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART_SUCCESS":
      return { ...state, cart: action.payload };
    case "GET_CART_SUCCESS":
      return { ...state, cart: action.payload };

    case "REMOVE_FROM_CART":
      return { ...state, cart: action.payload };
    case "CART_ITEM_QUANTITY_INCREMENT":
      return { ...state, cart: action.payload };

    case "CART_ITEM_QUANTITY_DECREMENT":
      return { ...state, cart: action.payload };

    case "ADDRESS_MODAL_STATUS_UPDATE":
      return { ...state, addressModalStatus: action.payload };

    default:
      return state;
  }
};
