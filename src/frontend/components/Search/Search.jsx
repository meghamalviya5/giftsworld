import React, { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GiftContext } from "../../contexts/GiftContext";
import "./Search.css";

const Search = () => {
  const { state, dispatch } = useContext(GiftContext);

  return (
    <label className="relative flex flex-align-center">
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="search"
        className="search-input"
        placeholder="Search by product name"
        value={state.filterState.search}
        onChange={(event) =>
          dispatch({ type: "SEARCH_ITEMS1", payload: event })
        }
      />
    </label>
  );
};

export default Search;
