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
  const { categories, arrivalAndTrending } = useContext(CategoryContext);

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
      (category) => category._id === categoryId
    ).categoryName;

    if (arrivalAndTrending.includes(selectedCategory)) {
      byCategory = gifts.filter((gift) => gift[selectedCategory]);
    } else {
      byCategory = gifts.filter(
        (gift) => gift.categoryName === selectedCategory
      );
    }
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
  };
  //console.log("gifts...in context - ", gifts);

  const [state, dispatch] = useReducer(giftReducer, initialValue);

  const valueProp = {
    allGifts: state.allGifts,
    getGiftsByCategory,
    filteredGiftList: state.filteredGiftList,
    selectedFilters: state.selectedFilters,
    setPriceRange: (value) => {
      dispatch({ type: "PRICE_RANGE_FILTER", payload: { rangeValue: value } });
    },
    sortList: (value) => {
      dispatch({ type: "SORT_ITEMS", payload: { sortOrder: value } });
    },
    setRating: (value) => {
      dispatch({ type: "RATING_FILTER", payload: { rating: value } });
    },
    setCategory: (value) => {
      dispatch({
        type: "CATEGORY_FILTER",
        payload: {
          event: value,
          gifts: state.allGifts,
          otherCategories: categories,
        },
      });
    },
  };

  return (
    <GiftContext.Provider value={valueProp}>{children}</GiftContext.Provider>
  );
};

export default GiftProvider;
