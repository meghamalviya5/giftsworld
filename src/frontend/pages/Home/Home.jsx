import React, { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { Link } from "react-router-dom";
import "./Home.css";
import Carousel from "../../components/Carousel/Carousel";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const {
    categories,
    errorOnHome,
    isLoading,
    setSelectedCategoryId,
    arrivalAndTrending,
  } = useContext(CategoryContext);
  //const topCategories = getTopCategories()

  return isLoading ? (
    <Spinner />
  ) : errorOnHome ? (
    <h2>{errorOnHome}</h2>
  ) : (
    <div>
      <div className="category">
        {categories
          .filter(
            (category) => !arrivalAndTrending.includes(category.categoryName)
          )
          .map((filteredCaterory) => (
            <Link
              to={`/api/category/${filteredCaterory._id}`}
              key={filteredCaterory._id}
              onClick={() => setSelectedCategoryId(filteredCaterory._id)}
            >
              <div className="category-card">
                <img
                  className="category-img"
                  src={filteredCaterory.image}
                  alt=""
                />
                {filteredCaterory.displayName}
              </div>
            </Link>
          ))}
      </div>

      <div className="category">
        <Carousel />
      </div>

      <div className="category">
        {categories
          .filter((category) =>
            arrivalAndTrending.includes(category.categoryName)
          )
          .map((filteredCaterory) => (
            <Link
              to={`/api/category/${filteredCaterory._id}`}
              key={filteredCaterory._id}
              onClick={() => setSelectedCategoryId(filteredCaterory._id)}
            >
              <div className="category-card">
                <img
                  className="category-img"
                  src={filteredCaterory.image}
                  alt=""
                />
                {filteredCaterory.displayName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
