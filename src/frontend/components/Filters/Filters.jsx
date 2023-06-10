import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Filters.css";
import { CategoryContext } from "../../contexts/CategoryContext";
import { GiftContext } from "../../contexts/GiftContext";

console.log("Hi in FIlters");
const Filters = () => {
  const { categories, selectedCategoryId } = useContext(CategoryContext);
  const {
    allGifts,
    setPriceRange,
    sortList,
    setRating,
    setCategory,
    clearFilters,
  } = useContext(GiftContext);
  const ratings = [4, 3, 2, 1];

  return (
    <div className="filter-block">
      <div className="filter-header">
        <div>Filters</div>
        <Link onClick={() => clearFilters(allGifts)}>Clear</Link>
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
        {categories.map((category) => (
          <section key={category._id}>
            <label htmlFor={category._id}>
              <input
                type="checkbox"
                id={category._id}
                value={category.categoryName}
                onChange={(e) => setCategory(e)}
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
                value={rating}
                onChange={(e) => setRating(e.target.value)}
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
            value="low-to-high"
            onChange={(e) => sortList(e.target.value)}
          />
          Price-Low to High
        </label>
        <label htmlFor="high-to-low">
          <input
            type="radio"
            id="high-to-low"
            name="sort"
            value="high-to-low"
            onChange={(e) => sortList(e.target.value)}
          />
          Price-High to Low
        </label>
      </div>
    </div>
  );
};

export default Filters;
