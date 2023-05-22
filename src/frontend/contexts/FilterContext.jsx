import { createContext, useContext, useReducer } from "react";
import { GiftContext } from "./GiftContext";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  return <FilterContext.Provider>{children}</FilterContext.Provider>;
};
