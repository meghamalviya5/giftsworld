import { useContext } from "react";
import MaterialIcon from "@material/react-material-icon";
import { ToastContainer } from "react-toastify";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import CardPrice from "../../components/CardPrice/CardPrice";
import "./Wishlist.css";
import CardBadge from "../../components/CardBadge/CardBadge";

const Wishlist = () => {
  const { wishlist, moveToCart, removeFromWishlist, findInCart } =
    useContext(CartWishlistContext);

  return (
    <div className="wishlist-cont">
      <div className="wishlist-main-container flex flex-center">
        <h3>
          My wishlist{wishlist?.length > 0 ? `(${wishlist?.length})` : ""}
        </h3>
        {wishlist.length ? (
          <div className="wishlist-list">
            {wishlist.map((wishlistItem) => (
              <div className="wishlist-item">
                <div className="flex flex-column">
                  <div className="card-header">
                    {/* <div className="card-img"> */}
                    {/* <div className="card-badge">
                <MaterialIcon
                  icon="favorite"
                  className="red-fav"
                  onClick={() => removeFromWishlist(wishlistItem._id)}
                />
              </div> */}
                    <img
                      src={wishlistItem.image}
                      alt="gift-image"
                      className="gift-image"
                    />
                    <CardBadge gift={wishlistItem} />
                    {/* </div> */}
                  </div>
                  <div className="gift-details">
                    <p className="gift-name">{wishlistItem.name}</p>
                  </div>
                  <CardPrice gift={wishlistItem} />
                </div>

                <button
                  className="flex flex-col-gap-xs flex-center card-btn"
                  onClick={() => moveToCart(wishlistItem)}
                >
                  {findInCart(wishlistItem._id)
                    ? "Added To Cart! Add More +"
                    : "Move To Cart"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="wishlist-empty">
            <h3>Your Wishlist is Empty!!</h3>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Wishlist;
