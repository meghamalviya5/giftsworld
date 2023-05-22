import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Filters.css";
import { GiftContext } from "../../contexts/GiftContext";

const Filters = () => {
  const { setPriceRange } = useContext(GiftContext);
  return (
    <div className="filter-block">
      <div className="filter-header">
        <div>Filters</div>
        {/* <Link onClick={dispatch({ type: PRICE_RANGE })}>Clear</Link> */}
      </div>
      <div className="price-selector">
        <label>Price </label>
        <input
          type="range"
          id="price-filter"
          min="100"
          max="3500"
          step="200"
          width="17rem"
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <label>Category</label>
        <label htmlFor="gift-category-1">
          <input type="checkbox" id="gift-category-1" />
          Personalised
        </label>
        <label htmlFor="gift-category-2">
          <input type="checkbox" id="gift-category-2" />
          Flowers
        </label>
        <label htmlFor="gift-category-3">
          <input type="checkbox" id="gift-category-3" />
          Home Decor
        </label>
        <label htmlFor="gift-category-4">
          <input type="checkbox" id="gift-category-4" />
          Others
        </label>
        <label>Rating</label>
        <label htmlFor="four-plus">
          <input type="radio" id="four-plus" name="rating" />4 Stars & above
        </label>
        <label htmlFor="three-plus">
          <input type="radio" id="three-plus" name="rating" />3 Stars & above
        </label>
        <label htmlFor="two-plus">
          <input type="radio" id="two-plus" name="rating" />2 Stars & above
        </label>
        <label htmlFor="one-plus">
          <input type="radio" id="one-plus" name="rating" />1 Stars & above
        </label>
        <label>Sort By</label>
        <label htmlFor="low-to-high">
          <input type="radio" id="low-to-high" name="sort" />
          Price-Low to High
        </label>
        <label htmlFor="high-to-low">
          <input type="radio" id="high-to-low" name="sort" />
          Price-High to Low
        </label>
      </div>
    </div>
  );
};

export default Filters;
