import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Filters.css";
import { CategoryContext } from "../../contexts/CategoryContext";
import { GiftContext } from "../../contexts/GiftContext";

console.log("Hi in FIlters");
const Filters = () => {
  const { categories, selectedCategoryId, setSelectedCategoryId } =
    useContext(CategoryContext);
  const {
    allGifts,
    setPriceRange,
    sortList,
    setRating,
    setCategory,
    clearFilters,
    dispatch,
    state,
    combineFilters,
  } = useContext(GiftContext);
  const ratings = [4, 3, 2, 1];

  return (
    <div className="filter-block">
      <div className="filter-header">
        <div>Filters</div>
        <Link
          onClick={() => {
            setSelectedCategoryId(0);
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
          value={state.priceFilterValue}
          onChange={async (e) => {
            await dispatch({
              type: "SET_PRICE_RANGE",
              payload: e.target.value,
            });
            console.log(
              "after await price range, priceFIlterValue - ",
              state.priceFilterValue
            );
            //combineFilters();
            setPriceRange(e.target.value);
          }}
        />

        <label>Category</label>
        {categories.map((category) => (
          <section key={category._id}>
            <label htmlFor={category._id}>
              <input
                type="checkbox"
                id={category._id}
                value={state.categoryFilterValue}
                onChange={async (e) => {
                  await dispatch({
                    type: "SET_CATEGORY",
                    payload: category.categoryName,
                  });
                  // await dispatch({
                  //   type: "SET_CATEGORY_EVENT",
                  //   payload: e,
                  // });
                  setCategory(e, category.categoryName);
                }}
                defaultChecked={category._id === selectedCategoryId}
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
                checked={state.ratingFilterValue === rating}
                value={state.ratingFilterValue}
                onChange={async (e) => {
                  await dispatch({
                    type: "SET_RATING",
                    payload: rating,
                  });
                  setRating(rating);
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
            checked={state.sortByFilterValue === "low-to-high"}
            value={state.sortByFilterValue}
            onChange={async (e) => {
              await dispatch({
                type: "SET_SORT_BY",
                payload: "low-to-high",
              });
              //combineFilters();
              sortList("low-to-high");
            }}
          />
          Price-Low to High
        </label>
        <label htmlFor="high-to-low">
          <input
            type="radio"
            id="high-to-low"
            name="sort"
            checked={state.sortByFilterValue === "high-to-low"}
            value={state.sortByFilterValue}
            onChange={async (e) => {
              await dispatch({
                type: "SET_SORT_BY",
                payload: "high-to-low",
              });
              //combineFilters();
              sortList("high-to-low");
            }}
          />
          Price-High to Low
        </label>
      </div>
    </div>
  );
};

export default Filters;
