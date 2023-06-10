import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [errorOnHome, setErrorOnHome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const arrivalAndTrending = ["newArrival", "trending"];

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/categories`);
      // console.log(response.data.categories);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
      setErrorOnHome(
        "Categories cannot be fetched right now. Please try again after some time."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        errorOnHome,
        isLoading,
        selectedCategoryId,
        setSelectedCategoryId,
        arrivalAndTrending,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
