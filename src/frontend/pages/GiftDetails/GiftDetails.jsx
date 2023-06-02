import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { GiftContext } from "../../contexts/GiftContext";
import "./GiftDetails.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";

const GiftDetails = () => {
  const { giftId } = useParams();
  const { filteredGiftList } = useContext(GiftContext);
  const { findInCart, addToCart, findInWishlist, addToWishlist } =
    useContext(CartWishlistContext);
  console.log("in giftdetails");

  //find gift by id
  const giftByID = filteredGiftList.find((gift) => gift._id === Number(giftId));
  const { _id, image, name, reviews, rating, price } = giftByID;

  return (
    <div className="gift-detail-container">
      <div className="">
        <img src={image} className="gift-detail-image" alt="" />
      </div>
      <div className="gift-info">
        <p>{name}</p>
        <span>{rating}</span>
        <span>({reviews} Reviews)</span>
        <p>&#x20B9; {price}</p>
        <div>
          {findInCart(_id) ? (
            <Link to="/cart">
              <button>Go To Cart</button>
            </Link>
          ) : (
            <button onClick={() => addToCart(giftByID)}>Add to Cart</button>
          )}
          {findInWishlist(_id) ? (
            <Link to="/wishlist">
              <button>Go To Wishlist</button>
            </Link>
          ) : (
            <button onClick={() => addToWishlist(giftByID)}>
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
