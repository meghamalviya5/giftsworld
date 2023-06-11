import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Filters.css";
import { CategoryContext } from "../../contexts/CategoryContext";
import { GiftContext } from "../../contexts/GiftContext";

console.log("Hi in FIlters");
const Filters = () => {
  const { categories, selectedCategoryId, setSelectedCategoryId } =
    useContext(CategoryContext);
  const { allGifts, clearFilters, dispatch, state } = useContext(GiftContext);
  const ratings = [4, 3, 2, 1];

  return (
    <div className="filter-block">
      <div className="filter-header">
        <div>Filters</div>
        <Link
          onClick={() => {
            //  setSelectedCategoryId(0);
            clearFilters(allGifts);
          }}
        >
          Clear
        </Link>
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
          value={state.filterState.priceRange}
          onChange={async (e) => {
            await dispatch({
              type: "SET_PRICE_RANGE1",
              payload: e.target.value,
            });
          }}
        />

        <label>Category</label>
        {categories.map((category) => (
          <section key={category._id}>
            <label htmlFor={category._id}>
              <input
                type="checkbox"
                id={category._id}
                value={category.categoryName}
                onChange={() => {
                  dispatch({
                    type: "SET_CATEGORY1",
                    payload: category.categoryName,
                  });
                }}
                checked={state.filterState.category.includes(
                  category.categoryName
                )}
                // defaultChecked={category._id === selectedCategoryId}
              />
              {category.displayName}
            </label>
          </section>
        ))}

        <label>Rating</label>
        {ratings.map((rating, idx) => (
          <section key={idx}>
            <label htmlFor={idx}>
              <input
                type="radio"
                id={idx}
                name="rating"
                checked={state.filterState.rating === rating}
                value={state.filterState.rating}
                onChange={async (e) => {
                  await dispatch({
                    type: "SET_RATING1",
                    payload: rating,
                  });
                }}
              />
              {rating} Stars & Up
            </label>
          </section>
        ))}

        <label>Sort By</label>
        <label htmlFor="low-to-high">
          <input
            type="radio"
            id="low-to-high"
            name="sort"
            checked={state.filterState.sortBy === "low-to-high"}
            value={state.filterState.sortBy}
            onChange={async (e) => {
              await dispatch({
                type: "SET_SORT_BY1",
                payload: "low-to-high",
              });
            }}
          />
          Price-Low to High
        </label>
        <label htmlFor="high-to-low">
          <input
            type="radio"
            id="high-to-low"
            name="sort"
            checked={state.filterState.sortBy === "high-to-low"}
            value={state.filterState.sortBy}
            onChange={async (e) => {
              await dispatch({
                type: "SET_SORT_BY1",
                payload: "high-to-low",
              });
            }}
          />
          Price-High to Low
        </label>
      </div>
    </div>
  );
};

export default Filters;
