import React from "react";

export const giftReducer = (state, action) => {
  console.log("in reducer");
  switch (action.type) {
    case "SET_GIFTS_BY_CATEGORY":
      return {
        ...state,
        selectedGiftList: action.payload.selectedCategoryGifts,
        giftList: action.payload.selectedCategoryGifts,
      };
    case "PRICE_RANGE_FILTER":
      const filteredGift = state.giftList.filter(
        (gift) => Number(gift.price) >= Number(action.payload.rangeValue)
      );
      return { ...state, selectedGiftList: filteredGift };
  }
};
