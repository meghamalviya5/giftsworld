import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import axios from "axios";

import { CategoryContext } from "./CategoryContext";
import { giftReducer } from "../reducer/GiftReducer";

export const GiftContext = createContext();

const GiftProvider = ({ children }) => {
  const [gifts, setGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    categories,
    arrivalAndTrending,
    setSelectedCategoryId,
    selectedCategoryId,
  } = useContext(CategoryContext);
  // const { wishlist } = useContext(CartWishlistContext);

  const getGifts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/products`);
      setGifts(response.data.products);
    } catch (error) {
      setError("Products not found!!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGifts();
  }, []);

  const getGiftsByCategory = (categoryId) => {
    let byCategory = [];
    const selectedCategory = categories.find(
      (category) => category._id === Number(categoryId)
    ).categoryName;

    if (arrivalAndTrending.includes(selectedCategory)) {
      byCategory = gifts.filter((gift) => gift[selectedCategory]);
    } else {
      byCategory = gifts.filter(
        (gift) => gift.categoryName === selectedCategory
      );
    }
    dispatch({
      type: "SET_CATEGORY",
      payload: selectedCategory,
    });
    dispatch({
      type: "UPDATE_SELECTED_FILTERS",
      payload: selectedCategory,
    });
    dispatch({
      type: "SET_GIFTS_BY_CATEGORY",
      payload: { allGiftItems: gifts, selectedCategoryGifts: byCategory },
    });
  };

  const initialValue = {
    allGifts: gifts,
    filteredGiftList: [],
    originalGiftList: [],
    giftsCategories: [],
    selectedFilters: [],
    priceFilterValue: 0,
    categoryFilterValue: "",
    ratingFilterValue: 0,
    sortByFilterValue: "",
    categoryEvent: {},
  };
  //console.log("gifts...in context - ", gifts);

  const [state, dispatch] = useReducer(giftReducer, initialValue);

  const valueProp = {
    allGifts: state.allGifts,
    getGiftsByCategory,
    filteredGiftList: state.filteredGiftList,
    selectedFilters: state.selectedFilters,
    state,
    dispatch,
    searchItems: (event) => {
      dispatch({ type: "SEARCH_ITEMS", payload: event });
    },
    clearFilters: async () => {
      await setSelectedCategoryId(0);
      console.log("cAtegory ID: ", selectedCategoryId);
      dispatch({ type: "CLEAR_FILTERS", payload: state.allGifts });
    },
    setPriceRange: (value) => {
      dispatch({ type: "PRICE_RANGE_FILTER", payload: { rangeValue: value } });
    },
    setCategory: (value, category) => {
      dispatch({
        type: "CATEGORY_FILTER",
        payload: {
          event: value,
          categoryName: category,
          gifts: state.allGifts,
          otherCategories: arrivalAndTrending,
        },
      });
    },
    setRating: (value) => {
      dispatch({ type: "RATING_FILTER", payload: { rating: value } });
    },
    sortList: (value) => {
      dispatch({ type: "SORT_ITEMS", payload: { sortOrder: value } });
    },

    combineFilters: (value, category) => {
      if (state.priceFilterValue > 100) {
        dispatch({
          type: "PRICE_RANGE_FILTER",
          payload: { rangeValue: state.priceFilterValue },
        });
      }
      if (state.categoryFilterValue !== "") {
        dispatch({
          type: "CATEGORY_FILTER",
          payload: {
            event: value,
            categoryName: category,
            gifts: state.allGifts,
            otherCategories: arrivalAndTrending,
          },
        });
      }
      if (state.ratingFilterValue !== "") {
        dispatch({
          type: "RATING_FILTER",
          payload: { rating: state.ratingFilterValue },
        });
      }
      if (state.sortByFilterValue !== "") {
        dispatch({
          type: "SORT_ITEMS",
          payload: { sortOrder: state.sortByFilterValue },
        });
      }
    },
  };

  return (
    <GiftContext.Provider value={{ ...valueProp, isLoading, error }}>
      {children}
    </GiftContext.Provider>
  );
};

export default GiftProvider;
