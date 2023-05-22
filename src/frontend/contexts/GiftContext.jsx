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
  // const [giftsByCategory, setGiftsByCategory] = useState([]);
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
      payload: { selectedCategoryGifts: byCategory },
    });
    //setGiftsByCategory(byCategory);
  };

  const initialValue = {
    allGifts: gifts,
    selectedGiftList: [],
    giftList: [],
  };

  const [state, dispatch] = useReducer(giftReducer, initialValue);

  const valueProp = {
    getGiftsByCategory,
    selectedGiftList: state.selectedGiftList,
    setPriceRange: (value) => {
      console.log("set price range");
      dispatch({ type: "PRICE_RANGE_FILTER", payload: { rangeValue: value } });
    },
  };

  return (
    <GiftContext.Provider value={valueProp}>{children}</GiftContext.Provider>
  );
};

export default GiftProvider;
