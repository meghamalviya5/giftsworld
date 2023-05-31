import { useContext } from "react";
import { WishlistContext } from "../../contexts/WishlistContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, moveToCart } = useContext(WishlistContext);

  return (
    <div className="wishlist-cont">
      <h3>My wishlist</h3>
      <div className="wishlist-list">
        {wishlist.map((wishlistItem) => (
          <div className="card-cont">
            <div className="card-img">
              <div className="card-badge">
                <i className="red-fav material-symbols-outlined">favorite</i>
              </div>
              <img src={wishlist.image} alt="" />
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
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
