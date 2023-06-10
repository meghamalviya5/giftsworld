export const giftReducer = (state, action) => {
  console.log("in reducer");
  switch (action.type) {
    case "SET_GIFTS_BY_CATEGORY":
      return {
        ...state,
        allGifts: action.payload.allGiftItems,
        filteredGiftList: action.payload.selectedCategoryGifts,
        originalGiftList: action.payload.selectedCategoryGifts,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filteredGiftList: action.payload,
        priceFilterValue: 100,
        categoryFilterValue: "",
        ratingFilterValue: "",
        sortByFilterValue: "",
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

    case "CATEGORY_FILTER":
      const category = action.payload.categoryName;
      const isChecked = action.payload.event.target.checked;
      let updatedSelectedFilters = [...state.selectedFilters];

      if (isChecked) {
        updatedSelectedFilters = [...state.selectedFilters, category];
      } else {
        updatedSelectedFilters = updatedSelectedFilters.filter(
          (categoryFilter) => categoryFilter !== category
        );
      }

      const filteredGiftListBySelectedCategory = action.payload.gifts.filter(
        (gift) => {
          if (updatedSelectedFilters.length !== 0) {
            return updatedSelectedFilters.some((filterType) => {
              if (action.payload.otherCategories.includes(filterType)) {
                return gift[filterType];
              } else {
                return gift.categoryName === filterType;
              }
            });
          }
          return true;
        }
      );
      return {
        ...state,
        filteredGiftList: filteredGiftListBySelectedCategory,
        originalGiftList: filteredGiftListBySelectedCategory,
        selectedFilters: updatedSelectedFilters,
      };

    case "SEARCH_ITEMS":
      const searchedItems = state.filteredGiftList.filter((giftItem) =>
        giftItem.name
          .toLowerCase()
          .includes(action.payload.target.value.toLowerCase())
      );
      return { ...state, filteredGiftList: searchedItems };

    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceFilterValue: action.payload,
      };

    case "SET_CATEGORY":
      console.log("category -- ", action.payload);
      return {
        ...state,
        categoryFilterValue: action.payload,
      };

    case "SET_RATING":
      return {
        ...state,
        ratingFilterValue: action.payload,
      };

    case "SET_SORT_BY":
      return {
        ...state,
        sortByFilterValue: action.payload,
      };

    case "UPDATE_SELECTED_FILTERS":
      return {
        ...state,
        selectedFilters: [action.payload],
      };

    case "SET_CATEGORY_EVENT":
      console.log("categoryEvent -- ", action.payload);
      return {
        ...state,
        categoryEvent: action.payload,
      };

    default:
      return { state };
  }
};
