import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import MaterialIcon from "@material/react-material-icon";
import { GiftContext } from "../../contexts/GiftContext";
import "./GiftDetails.css";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";

const GiftDetails = () => {
  const { giftId } = useParams();
  const { wishlist } = useContext(CartWishlistContext);
  const { filteredGiftList } = useContext(GiftContext);
  const {
    findInCart,
    addToCart,
    findInWishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartWishlistContext);
  console.log("in giftdetails");

  const isWishlisted = (itemId) => wishlist.find((item) => item._id === itemId);

  //find gift by id
  const giftByID = filteredGiftList.find((gift) => gift._id === Number(giftId));
  const { _id, image, name, reviews, rating, price } = giftByID;

  return (
    <div className="gift-list-item">
      <div className="card-header">
        <div className="">
          <img src={image} className="gift-detail-image" alt="" />
        </div>
        <span className="card-badge">
          {isWishlisted(_id) ? (
            <MaterialIcon
              icon="favorite"
              onClick={() => removeFromWishlist(_id)}
            />
          ) : (
            <MaterialIcon
              icon="favorite_border"
              onClick={() => addToWishlist(giftByID)}
            />
          )}
        </span>
      </div>
      <div className="gift-info">
        <p>{name}</p>
        <span>{rating}</span>
        <span>({reviews} Reviews)</span>
        <p>&#x20B9; {price}</p>
        <div>
          {findInCart(_id) ? (
            <Link to="/cart">
              <button className="card-btn">Go To Cart</button>
            </Link>
          ) : (
            <button onClick={() => addToCart(giftByID)}>Add to Cart</button>
          )}
          {findInWishlist(_id) ? (
            <Link to="/wishlist">
              <button className="card-btn">Go To Wishlist</button>
            </Link>
          ) : (
            <button
              className="card-btn"
              onClick={() => addToWishlist(giftByID)}
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
