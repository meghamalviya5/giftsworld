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

  const initialValue = {
    allGifts: gifts,
    originalGiftList: [],
    giftsCategories: [],
    filterState: {
      search: "",
      priceRange: -1,
      category: [],
      rating: -1,
      sortBy: "",
    },
  };

  const [state, dispatch] = useReducer(giftReducer, initialValue);

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
      type: "SET_CATEGORY2",
      payload: selectedCategory,
    });
    // dispatch({
    //   type: "SET_CATEGORY",
    //   payload: selectedCategory,
    // });
    dispatch({
      type: "SET_GIFTS_BY_CATEGORY",
      payload: { allGiftItems: gifts, selectedCategoryGifts: byCategory },
    });
  };

  let filteredGiftList = state.originalGiftList;

  if (state.filterState.category.length === 0) {
    filteredGiftList = state.allGifts;
  }

  console.log(state.filterState.category, "...in category arr");
  if (state.filterState.category.length > 0) {
    const filteredGiftListBySelectedCategory = gifts.filter((gift) => {
      if (state.filterState.category.length !== 0) {
        return state.filterState.category.some((filterType) => {
          if (arrivalAndTrending.includes(filterType)) {
            return gift[filterType];
          } else {
            return gift.categoryName === filterType;
          }
        });
      }
      return true;
    });
    filteredGiftList = filteredGiftListBySelectedCategory;
  }

  if (state.filterState.search.length > 0) {
    const searchedItems = filteredGiftList.filter((giftItem) =>
      giftItem.name
        .toLowerCase()
        .includes(state.filterState.search.toLowerCase())
    );
    filteredGiftList = searchedItems;
  }

  if (state.filterState.priceRange > 100) {
    filteredGiftList = filteredGiftList.filter(
      (gift) => Number(gift.price) >= Number(state.filterState.priceRange)
    );
  }

  if (state.filterState.rating > 0) {
    filteredGiftList = filteredGiftList.filter((gift) => {
      return gift.rating >= Number(state.filterState.rating);
    });
  }

  if (state.filterState.sortBy.length > 0) {
    if (state.filterState.sortBy === "low-to-high") {
      filteredGiftList = [...filteredGiftList].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else {
      filteredGiftList = [...filteredGiftList].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }
  }

  const valueProp = {
    allGifts: state.allGifts,
    getGiftsByCategory,
    filteredGiftList,
    selectedFilters: state.selectedFilters,
    state,
    dispatch,
    clearFilters: async () => {
      await setSelectedCategoryId((prevValue) => 0);
      console.log("cAtegory ID: ", selectedCategoryId);
      dispatch({ type: "CLEAR_FILTERS1", payload: state.allGifts });
    },
  };
  return (
    <GiftContext.Provider value={{ ...valueProp, isLoading, error }}>
      {children}
    </GiftContext.Provider>
  );
};

export default GiftProvider;
