import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import IconButton from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";

import { GiftContext } from "../../contexts/GiftContext";
import "./GiftList.css";
import Filters from "../../components/Filters/Filters";
import { CartContext } from "../../contexts/CartContext";
import { WishlistContext } from "../../contexts/WishlistContext";

const GiftList = () => {
  const { categoryId } = useParams();
  const { getGiftsByCategory, filteredGiftList } = useContext(GiftContext);
  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const findInCart = (itemId) =>
    cart.find((cartItem) => cartItem._id === itemId);

  const isWishlisted = (itemId) => wishlist.find((item) => item._id === itemId);

  useEffect(() => {
    getGiftsByCategory(categoryId);
    // console.log("after context call in useffect");
  }, []);

  return (
    <div className="filter-gifts">
      <div>
        <Filters />
      </div>
      <div className="gifts-show">
        <div class="gifts-head">
          <h3>Showing All Products</h3> <span>( Showing 20 Products )</span>
        </div>
        <div className="gift-list">
          {filteredGiftList?.map((gift) => (
            <div key={gift._id} className="gift-list-item">
              <div className="card-header">
                <Link to={`/giftDetails/${gift._id}`}>
                  <img className="gift-image" src={gift.image} alt="" />
                </Link>
                <span
                  className="card-badge"
                  // onClick={() => addToWishlist(gift)}
                >
                  {/* <IconButton> */}
                  {isWishlisted(gift._id) ? (
                    <MaterialIcon
                      icon="favorite"
                      onClick={() => removeFromWishlist(gift._id)}
                    />
                  ) : (
                    <MaterialIcon
                      icon="favorite_border"
                      onClick={() => addToWishlist(gift)}
                    />
                  )}
                  {/* </IconButton> */}
                  {/* <i className="material-icons">
                      {isWishlisted(gift._id) ? favorite : favorite_border}
                    </i> */}
                </span>
              </div>
              <Link to={`/giftDetails/${gift._id}`}>
                <div className="gift-details">
                  <p>{gift.name}</p>
                  <b>&#x20B9; {gift.price}</b>
                </div>
              </Link>
              {console.log("gift in gift.jsx ::: ", gift)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;
