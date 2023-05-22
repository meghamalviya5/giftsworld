import { createContext } from "react";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  // const {}

  return <FilterContext.Provider>{children}</FilterContext.Provider>;
};
