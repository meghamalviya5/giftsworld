import { useContext } from "react";
import MaterialIcon from "@material/react-material-icon";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, moveToCart, removeFromWishlist, findInCart } =
    useContext(CartWishlistContext);

  return wishlist.length ? (
    <div className="wishlist-cont">
      <h3>My wishlist</h3>
      <div className="wishlist-list">
        {wishlist.map((wishlistItem) => (
          <div className="card-cont">
            <div className="card-img">
              <div className="card-badge">
                <MaterialIcon
                  icon="favorite"
                  onClick={() => removeFromWishlist(wishlistItem._id)}
                />
              </div>
              <img src={wishlistItem.image} alt="" />
            </div>
            <div className="card-details">
              <div>{wishlistItem.name}</div>
              <div className="cart-card-price">
                <h2>
                  &#x20B9;
                  {Math.floor(
                    wishlistItem.price -
                      (wishlistItem.price * wishlistItem.discount) / 100
                  )}
                </h2>
                <h4>
                  <s>{wishlistItem.price}</s>
                </h4>
              </div>
              <div className="cart-card-price">
                <h4>{wishlistItem.discount}% OFF</h4>
              </div>
            </div>

            <button
              className="card-button"
              onClick={() => moveToCart(wishlistItem)}
            >
              {findInCart(wishlistItem._id)
                ? "Added To Cart! Click to Add More"
                : "Move To Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="wishlist-empty">
      <h3>Your Wishlist is Empty!!</h3>
    </div>
  );
};

export default Wishlist;
