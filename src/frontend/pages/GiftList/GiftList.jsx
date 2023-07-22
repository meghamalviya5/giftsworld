import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MaterialIcon from "@material/react-material-icon";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";

import { GiftContext } from "../../contexts/GiftContext";
import "./GiftList.css";
import Filters from "../../components/Filters/Filters";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";

const GiftList = () => {
  const { categoryId } = useParams();
  const { getGiftsByCategory, filteredGiftList, isLoading, error } =
    useContext(GiftContext);
  // const { selectedCategoryId } = useContext(CategoryContext);
  const { addToCart, findInCart, addToWishlist, removeFromWishlist, wishlist } =
    useContext(CartWishlistContext);

  const isWishlisted = (itemId) => wishlist.find((item) => item._id === itemId);

  useEffect(() => {
    getGiftsByCategory(categoryId);
    // console.log("after context call in useffect");
  }, []);

  return isLoading ? (
    <Spinner />
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div className="filter-gifts">
      <div>
        <Filters />
      </div>
      <div className="gifts-show">
        <div className="gifts-head">
          <h3>Showing All Products</h3>{" "}
          <span>( Showing {filteredGiftList.length} Products )</span>
        </div>
        <div className="gift-list">
          {filteredGiftList?.map((gift) => (
            <div key={gift._id} className="gift-list-item">
              <div className="flex flex-column">
                <div className="card-header">
                  <div>
                    <Link to={`/giftDetails/${gift._id}`}>
                      <img className="gift-image" src={gift.image} alt="" />
                    </Link>
                    <span className="card-badge">
                      {isWishlisted(gift._id) ? (
                        <MaterialIcon
                          icon="favorite"
                          className="red-fav"
                          onClick={() => removeFromWishlist(gift._id)}
                        />
                      ) : (
                        <MaterialIcon
                          icon="favorite_border"
                          className="red-fav"
                          onClick={() => addToWishlist(gift)}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Link to={`/giftDetails/${gift._id}`}>
                    <div className="gift-details">
                      <p className="gift-name">{gift.name}</p>
                      <b>&#x20B9; {gift.price}</b>
                    </div>
                  </Link>
                </div>
              </div>
              <div>
                {findInCart(gift._id) ? (
                  <Link to="/cart">
                    <button className="card-btn">Go To Cart</button>
                  </Link>
                ) : (
                  <button className="card-btn" onClick={() => addToCart(gift)}>
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GiftList;
