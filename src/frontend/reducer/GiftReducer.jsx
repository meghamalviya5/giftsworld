export const giftReducer = (state, action) => {
  console.log("in reducer");
  switch (action.type) {
    case "SET_GIFTS_BY_CATEGORY":
      return {
        ...state,
        filteredGiftList: action.payload.selectedCategoryGifts,
        originalGiftList: action.payload.selectedCategoryGifts,
      };

    case "PRICE_RANGE_FILTER":
      const filteredGift = state.originalGiftList.filter(
        (gift) => Number(gift.price) >= Number(action.payload.rangeValue)
      );
      return { ...state, filteredGiftList: filteredGift };

    case "RATING_FILTER":
      const filteredByRating = state.filteredGiftList.filter((gift) => {
        // console.log(gift.rating, "..gift.rating");
        // console.log(action.payload.rating, "..action.payload.rating");
        return gift.rating >= Number(action.payload.rating);
      });
      return { ...state, filteredGiftList: filteredByRating };

    case "SORT_ITEMS":
      let sortedList = [];
      if (action.payload.sortOrder === "low-to-high") {
        sortedList = [...state.filteredGiftList].sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
      } else {
        sortedList = [...state.filteredGiftList].sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
      }
      return { ...state, filteredGiftList: sortedList };
      break;

    case "CATEGORY_FILTER":
      const category = action.payload.event.target.values;
      const isChecked = action.payload.event.target.isChecked;

      if(isChecked){
        
      }
      break;

    default:
      return { state };
  }
};
